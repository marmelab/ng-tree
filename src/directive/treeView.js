define(function(require) {
    'use strict';

    var treeView = function ($parse, $compile, $treeTemplateFactory) {
        return {
            restrict: 'E',
            require: ['?^treeChildView', 'treeView'],
            scope: true,
            compile: function($element, attr) {
                var tree = $parse(attr.tree);
                var treeClick = $parse(attr.treeClick);

                return {
                    pre: function(scope, element, attrs) {
                        element.html($treeTemplateFactory.tree());
                        $compile(element.contents())(scope);
                    },
                    post: function (scope, element, attrs, controllers) {
                        var treeChildViewController = controllers[0];
                        var treeViewController = controllers[1];

                        treeViewController.setTree(tree(scope));
                        treeViewController.setParentController(treeChildViewController);
                        treeViewController.setTreeClick(treeClick);

                        scope.tree = treeViewController.getRawTree();
                    }
                };
            },
            controller: 'treeViewController',
            controllerAs: 'treeViewController'
        };
    };

    treeView.$inject = ['$parse', '$compile', '$treeTemplateFactory'];

    return treeView;
});
