define(function(require) {
    'use strict';

    var configurable = require('../util/configurable');

    var treeTemplateFactory = function() {
        var config = {
            tree: '<ul class="tree">' +
                '<tree-child-view ng-repeat="child in tree.children" tree="child"></tree-child-view>' +
            '</ul>',
            treeChild: '<li ng-class="{ collapsed: tree.collapsed }">' +
                '<a href ng-click="treeChildViewController.toggleCollapsed($event, tree)" class="name">{{ tree.name }}</a>' +
                '<tree-view ng-if="!tree.collapsed && tree.children.length > 0" tree="tree"></tree-view>' +
            '</li>'
        };

        var model = function() {
        };

        configurable(model, config);

        return model;
    };

    treeTemplateFactory.$inject = [];

    return treeTemplateFactory;
});
