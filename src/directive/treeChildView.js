define(function(require) {
    'use strict';

    var treeChildView = function ($compile, $treeTemplateFactory) {
        return {
            restrict: 'E',
            require: ['^treeView', 'treeChildView'],
            scope: {
                tree: '='
            },
            compile: function (element) {
                return {
                    pre: function(scope, element) {
                        element.html($treeTemplateFactory.treeChild());
                        $compile(element.contents())(scope);
                    },
                    post: function (scope, element, attrs, controllers) {
                        var treeViewController = controllers[0];
                        var treeChildViewController = controllers[1];

                        treeChildViewController.setParentController(treeViewController);
                    }
                };
            },
            controller: 'treeChildViewController',
            controllerAs: 'treeChildViewController'
        };
    };

    treeChildView.$inject = ['$compile', '$treeTemplateFactory'];

    return treeChildView;
});
