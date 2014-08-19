/*global define,describe,it,beforeEach,expect,inject,jasmine,waitsFor,runs,spyOn*/

(function() {
    'use strict';

    describe('Controller: treeChildViewController', function () {

        var treeChildViewController,
            $rootScope,
            $scope,
            $q;

        beforeEach(module('ngTree'));

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $q = $injector.get('$q');

            treeChildViewController = $injector.get('$controller')('treeChildViewController', {
                '$scope': $scope,
                '$q': $q
            });
        }));

        it('should call emitClick when toggleCollapsed is called', function() {
            var $event = {
                stopPropagation: jasmine.createSpy('stopPropagation')
            };

            var tree = {
                collapsed: false
            };

            var deferred,
                context;

            spyOn(treeChildViewController, 'emitClick').andCallFake(function(d, c) {
                deferred = d;
                context = c;
            });

            treeChildViewController.toggleCollapsed($event, tree);
            expect($event.stopPropagation).toHaveBeenCalled();
            expect(treeChildViewController.emitClick).toHaveBeenCalledWith(jasmine.any(Object), {
                $event: $event
            });

            expect(context).toEqual({
                $event: $event
            });

            deferred.resolve();
            $rootScope.$digest();
            expect(tree.collapsed).toBe(true);
        });

        it('should call parentController.emitClick when emitClick is called', function() {
            var parentController = {
                emitClick: jasmine.createSpy('emitClick')
            };

            var deferred = {};

            var context = {
                $event: ''
            };

            $scope.tree = {
                name: 'toto'
            };

            treeChildViewController.setParentController(parentController);

            treeChildViewController.emitClick(deferred, context, '/titi');

            expect(parentController.emitClick).toHaveBeenCalledWith(deferred, context, '/toto/titi');
        });

        it('should call destroy when $destroy event occured', function() {
            spyOn(treeChildViewController, 'destroy').andCallThrough();
            $scope.$broadcast('$destroy');
            expect(treeChildViewController.destroy).toHaveBeenCalled();
            expect(treeChildViewController.$scope).toBeUndefined();
            expect(treeChildViewController.parentController).toBeUndefined();
            expect(treeChildViewController.$q).toBeUndefined();
        });
    });
}());
