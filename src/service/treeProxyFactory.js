define(function(require) {
    'use strict';

    function patch(object, method, callback) {
        object[method] = (function(original) {
            return callback(original);
        }(object[method]));
    }

    var treeProxyFactory = function($treeDecoratorFactory, $q, $injector) {
        return function proxy(tree) {
            tree = $treeDecoratorFactory(tree);

            // We synchronize tree with angular digest cycle
            tree.promiseFactory($q);

            patch(tree, 'registerListener', function(registerListener) {
                return function(hook, listener) {
                    if (Object.prototype.toString.call(listener) === '[object Array]') {
                        // We add dependency injection.
                        // We can now write this:
                        // tree.registerListener(tree.HOOK_PRE_APPEND, ['myService', function(myService) {
                        //      return function(next, newNode) {
                        //
                        //      };
                        // }])
                        //
                        // And still regular one:
                        // tree.registerListener(tree.HOOK_PRE_APPEND, function(next, newNode) {
                        //
                        // });
                        listener = $injector.invoke(listener);
                    }
                    registerListener(hook, listener);
                };
            });

            for (var method in tree) {
                if (tree.hasOwnProperty(method) &&
                    typeof(tree[method]) === 'function' &&
                    method !== 'registerListener') {
                    (function (method) {
                        patch(tree, method, function(original) {
                            return function() {
                                var result = original.apply(original, [].slice.apply(arguments));

                                if (result && result.then) {
                                    return result.then(function(result) {
                                        return result !== undefined && typeof(result.registerListener) === 'function' ? proxy(result) : result;
                                    });
                                }

                                return result !== undefined && typeof(result.registerListener) === 'function' ? proxy(result) : result;
                            };
                        });
                    }(method));
                }
            }

            patch(tree, 'toggle', function() {
                return function(name) {
                    tree.attr(name, !tree.attr(name));
                };
            });

            return tree;
        };
    };

    treeProxyFactory.$inject = ['$treeDecoratorFactory', '$q', '$injector'];

    return treeProxyFactory;
});
