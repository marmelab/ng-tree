/*global define,describe,it,beforeEach,expect,inject,jasmine,waitsFor,runs*/

(function() {
    'use strict';

    describe('Service: $treeProxyFactory', function () {

        var $treeFactory,
            $treeDecoratorFactory,
            $rootScope,
            data,
            q;

        beforeEach(module('angular-tree'));

        beforeEach(function() {
            $treeDecoratorFactory = jasmine.createSpy('$treeDecoratorFactory').andCallFake(function(tree) {
                return tree;
            });
            module(function ($provide) {
                $provide.value('$treeDecoratorFactory', $treeDecoratorFactory);
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


        it('should add dependency injection to registerListener method', function() {
            var tree = $treeFactory(data),
                injectedQ,
                i = 0,
                result;

            tree.registerListener(tree.HOOK_PRE_APPEND, ['$q', function($q) {
                injectedQ = $q;
                return function(next, newNode) {
                    i += 2;
                    next();
                };
            }]);

            tree.registerListener(tree.HOOK_POST_APPEND, function(next, newNode) {
                i *= 3;
                next();
            });

            expect(injectedQ).toBe(q);

            // Also test that proxies support promise
            runs(function() {
                tree.append($treeFactory({ name: 'titi' })).then(function() {
                    result = 'resolved';
                }, function() {
                    result = 'rejected';
                });
                $rootScope.$digest();
            });

            waitsFor(function() {
                return !!result;
            });

            runs(function() {
                expect(result).toEqual('resolved');
                expect(i).toBe(6);
            });

            injectedQ = undefined;
            tree.find('/test').registerListener(tree.HOOK_PRE_APPEND, ['$q', function($q) {
                injectedQ = $q;
                return function(next, newNode) {
                    next();
                };
            }]);

            // Proxy recursively all trees
            expect(injectedQ).toBe(q);
        });

        it('should add a proxy only on method', function() {
            var tree = $treeFactory(data);

            expect(tree.HOOK_PRE_APPEND).toEqual(jasmine.any(Number));
            expect(tree.HOOK_POST_APPEND).toEqual(jasmine.any(Number));
            expect(tree.HOOK_ERROR_APPEND).toEqual(jasmine.any(Number));
            expect(tree.HOOK_PRE_REMOVE).toEqual(jasmine.any(Number));
            expect(tree.HOOK_POST_REMOVE).toEqual(jasmine.any(Number));
            expect(tree.HOOK_ERROR_REMOVE).toEqual(jasmine.any(Number));
            expect(tree.HOOK_PRE_MOVE).toEqual(jasmine.any(Number));
            expect(tree.HOOK_POST_MOVE).toEqual(jasmine.any(Number));
            expect(tree.HOOK_ERROR_MOVE).toEqual(jasmine.any(Number));
            expect(tree.HOOK_PRE_CLONE).toEqual(jasmine.any(Number));
            expect(tree.HOOK_POST_CLONE).toEqual(jasmine.any(Number));
            expect(tree.HOOK_ERROR_CLONE).toEqual(jasmine.any(Number));

            expect(tree.find('/unknownnode')).toBeUndefined();
        });

        it('should add a toggle method', function() {
            var tree = $treeFactory(data);

            tree.attr('toto', true);
            expect(tree.attr('toto')).toBe(true);

            tree.toggle('toto');
            expect(tree.attr('toto')).toBe(false);

        });

        it('should call the decorator', function() {
            var tree = $treeFactory(data);

            expect($treeDecoratorFactory).toHaveBeenCalledWith(tree);
        });
    });
}());
