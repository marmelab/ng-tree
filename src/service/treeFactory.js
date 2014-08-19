define(function(require) {
    'use strict';

    var configurable = require('../util/configurable');

    var treeFactory = function($treeProxyFactory) {
        var config = {
            factory: window.Tree
        };

        var model = function(data) {
            var tree = config.factory.hookable(
                config.factory.tree(data)
            );

            return $treeProxyFactory(tree);
        };

        configurable(model, config);

        return model;
    };

    treeFactory.$inject = ['$treeProxyFactory'];

    return treeFactory;
});
