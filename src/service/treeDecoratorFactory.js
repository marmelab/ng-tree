define(function(require) {
    'use strict';

    var treeDecoratorFactory = function() {
        var model = function(tree) {
            tree.visitor()(function(node) {
                if (node.collapsed === undefined) {
                    node.collapsed = true;
                }
            });
            return tree;
        };

        return model;
    };

    treeDecoratorFactory.$inject = [];

    return treeDecoratorFactory;
});
