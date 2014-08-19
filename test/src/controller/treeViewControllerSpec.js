/*global define,describe,it,beforeEach,expect,inject,jasmine,waitsFor,runs,spyOn*/

(function() {
    'use strict';

    describe('Controller: treeViewController', function () {

        var treeViewController,
            $rootScope,
            $scope,
            $q;

        beforeEach(module('ngTree'));

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $q = $injector.get('$q');

            treeViewController = $injector.get('$controller')('treeViewController', {
                '$scope': $scope
            });
        }));

        it('should call parentController.emitClick when emitClick is called and parentController is setted', function() {
            var parentController = {
                emitClick: jasmine.createSpy('emitClick')
            };

            var deferred = {};

            var context = {
                $event: ''
            };

            treeViewController.setParentController(parentController);

            treeViewController.emitClick(deferred, context, '/titi');

            expect(parentController.emitClick).toHaveBeenCalledWith(deferred, context, '/titi');
        });

        it('should call treeClick when emitClick is called and parentController is not setted and the tree exists', function() {
            var deferred = $q.defer();
            var deferredClick = $q.defer();

            spyOn(deferred, 'resolve').andCallThrough();
            spyOn(deferred, 'reject').andCallThrough();
            spyOn(deferredClick.promise, 'then').andCallThrough();

            var context = {
                $event: ''
            };

            var tree = {
                find: jasmine.createSpy('find').andReturn('test')
            };

            var treeClick = jasmine.createSpy('treeClick').andReturn(deferredClick.promise);

            treeViewController.setTree(tree);
            treeViewController.setTreeClick(treeClick);

            treeViewController.emitClick(deferred, context, '/titi');

            expect(context.tree).toBe('test');
            expect(tree.find).toHaveBeenCalledWith('/titi');
            expect(treeClick).toHaveBeenCalledWith($scope, context);

            // Test when treeClick return a promise which is resolved
            deferredClick.resolve();
            $rootScope.$digest();
            expect(deferredClick.promise.then).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
            expect(deferred.resolve).toHaveBeenCalledWith(context.tree);

            // Test when treeClick return a promise which is rejected
            deferredClick = $q.defer();
            treeClick = jasmine.createSpy('treeClick').andReturn(deferredClick.promise);
            treeViewController.setTreeClick(treeClick);

            spyOn(deferredClick.promise, 'then').andCallThrough();

            treeViewController.emitClick(deferred, context, '/titi');

            deferredClick.reject();
            $rootScope.$digest();
            expect(deferredClick.promise.then).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
            expect(deferred.reject).toHaveBeenCalled();

            // Test when treeClick does not return a promise
            treeClick = jasmine.createSpy('treeClick').andReturn(true);
            treeViewController.setTreeClick(treeClick);
            treeViewController.emitClick(deferred, context, '/titi');
            expect(deferred.resolve).toHaveBeenCalledWith(context.tree);
        });

        it('should not call treeClick when emitClick is called and parentController is not setted and the tree does not exist', function() {
            var deferred = $q.defer();

            spyOn(deferred, 'reject').andCallThrough();

            var context = {
                $event: ''
            };

            var tree = {
                find: jasmine.createSpy('find').andReturn(undefined)
            };

            var treeClick = jasmine.createSpy('treeClick').andReturn(true);

            treeViewController.setTree(tree);
            treeViewController.setTreeClick(treeClick);

            treeViewController.emitClick(deferred, context, '/titi');
            expect(deferred.reject).toHaveBeenCalled();
            expect(treeClick).not.toHaveBeenCalled();
        });

        it('should call data() if tree is not raw data', function() {
            var tree = {
                data: jasmine.createSpy('data').andReturn('test')
            };

            treeViewController.setTree(tree);

            expect(treeViewController.getRawTree()).toBe('test');
            expect(tree.data).toHaveBeenCalled();
        });

        it('should return if tree is raw data', function() {
            var tree = {};

            treeViewController.setTree(tree);

            expect(treeViewController.getRawTree()).toBe(tree);
        });

        it('should call destroy when $destroy event occured', function() {
            spyOn(treeViewController, 'destroy').andCallThrough();
            $scope.$broadcast('$destroy');
            expect(treeViewController.destroy).toHaveBeenCalled();
            expect(treeViewController.$scope).toBeUndefined();
            expect(treeViewController.parentController).toBeUndefined();
            expect(treeViewController.tree).toBeUndefined();
            expect(treeViewController.treeClick).toBeUndefined();
        });
    });
}());
