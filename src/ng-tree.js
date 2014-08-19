/*global angular */
define(function(require) {
    'use strict';

    var module = angular.module('ngTree', []);

    module.factory('$treeDecoratorFactory', require('service/treeDecoratorFactory'));
    module.factory('$treeProxyFactory', require('service/treeProxyFactory'));
    module.factory('$treeFactory', require('service/treeFactory'));
    module.factory('$treeTemplateFactory', require('service/treeTemplateFactory'));

    module.directive('treeView', require('directive/treeView'));
    module.directive('treeChildView', require('directive/treeChildView'));

    module.controller('treeViewController', require('controller/treeViewController'));
    module.controller('treeChildViewController', require('controller/treeChildViewController'));

    return module;
});
