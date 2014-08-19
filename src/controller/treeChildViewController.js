define(function(require) {
    'use strict';

    function TreeChildViewController($scope, $q) {
        this.$scope = $scope;
        this.$q = $q;

        var self = this;
        this.$scope.$on('$destroy', function() {
            self.destroy();
        });
    }

    TreeChildViewController.prototype.toggleCollapsed = function(event, tree) {
        event.stopPropagation();

        var deferred = this.$q.defer();
        deferred.promise.then(function() {
            tree.collapsed = !tree.collapsed;
        });
        this.emitClick(deferred, {
            $event: event
        });
    };

    TreeChildViewController.prototype.setParentController = function(parentController) {
        this.parentController = parentController;
    };

    TreeChildViewController.prototype.emitClick = function(deferred, context, path) {
        return this.parentController.emitClick(
            deferred,
            context,
            '/' + this.$scope.tree.name + (path || '')
        );
    };

    TreeChildViewController.prototype.destroy = function() {
        this.$scope = undefined;
        this.$q = undefined;
        this.parentController = undefined;
    };

    TreeChildViewController.$inject = ['$scope', '$q'];

    return TreeChildViewController;
});
