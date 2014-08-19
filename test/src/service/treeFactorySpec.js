/*global define,describe,it,beforeEach,expect,inject,jasmine,waitsFor,runs*/

(function() {
    'use strict';

    describe('Service: $treeFactory', function () {

        var $treeFactory,
            $treeProxyFactory,
            $rootScope,
            data,
            q;

        beforeEach(module('ngTree'));

        beforeEach(function() {
            $treeProxyFactory = jasmine.createSpy('$treeProxyFactory').andCallFake(function(tree) {
                return tree;
            });
            module(function ($provide) {
                $provide.value('$treeProxyFactory', $treeProxyFactory);
            });
        });

        beforeEach(inject(function($injector) {
            $treeFactory = $injector.get('$treeFactory');

            $rootScope = $injector.get('$rootScope');
            q = $injector.get('$q');

            data = {
                children: [
                    { name: 'test' },
                    { name: 'test2'}
                ]
            };
        }));

        it('should expose a factory method to configure itself', function() {
            expect($treeFactory.factory).toEqual(jasmine.any(Function));

            expect($treeFactory.factory()).toBe(window.Tree);

            var newFactory = {
                tree: function() {}
            };

            $treeFactory.factory(newFactory);
            expect($treeFactory.factory()).toBe(newFactory);
        });

        it('should expose a build method to build a hookable tree', function() {
            expect($treeFactory).toEqual(jasmine.any(Function));

            var tree = $treeFactory(data);
            expect($treeProxyFactory).toHaveBeenCalledWith(tree);
            expect(tree.data()).toBe(data);
            expect(tree.registerListener).toEqual(jasmine.any(Function));
        });
    });
}());
