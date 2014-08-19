/*global define,describe,it,beforeEach,expect,inject,jasmine,waitsFor,runs*/

(function() {
    'use strict';

    describe('Service: $treeTemplateFactory', function () {

        var $treeTemplateFactory;

        beforeEach(module('angular-tree'));

        beforeEach(inject(function($injector) {
            $treeTemplateFactory = $injector.get('$treeTemplateFactory');
        }));

        it('should expose a tree and treeChild method to configure itself', function() {
            expect($treeTemplateFactory.tree).toEqual(jasmine.any(Function));
            expect($treeTemplateFactory.treeChild).toEqual(jasmine.any(Function));

            $treeTemplateFactory.tree('<div></div>');
            expect($treeTemplateFactory.tree()).toBe('<div></div>');

            $treeTemplateFactory.treeChild('<p></p>');
            expect($treeTemplateFactory.treeChild()).toBe('<p></p>');
        });
    });
}());
