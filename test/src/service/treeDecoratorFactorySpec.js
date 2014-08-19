/*global define,describe,it,beforeEach,expect,inject,jasmine,waitsFor,runs*/

(function() {
    'use strict';

    describe('Service: $treeDecoratorFactory', function () {

        var $treeFactory,
            $treeDecoratorFactory,
            data;

        beforeEach(module('angular-tree'));

        beforeEach(inject(function($injector) {
            $treeFactory = $injector.get('$treeFactory');
            $treeDecoratorFactory = $injector.get('$treeDecoratorFactory');

            data = {
                children: [
                    { name: 'test' },
                    { name: 'test2'}
                ]
            };
        }));

        it('should add collapsed attribute on each node and set it to true if it does not exist', function() {
            var tree = $treeFactory(data);

            expect(tree.find('/test').attr('collapsed')).toBe(true);
            expect(tree.find('/test2').attr('collapsed')).toBe(true);

            tree.find('/test').attr('collapsed', false);
            expect(tree.find('/test').attr('collapsed')).toBe(false);
            $treeDecoratorFactory(tree.find('/test'));
            expect(tree.find('/test').attr('collapsed')).toBe(false);
        });
    });
}());
