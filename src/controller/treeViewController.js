define(function(require) {
    'use strict';

    function TreeViewController($scope) {
        this.$scope = $scope;

        var self = this;
        this.$scope.$on('$destroy', function() {
            self.destroy();
        });
    }

    TreeViewController.prototype.setParentController = function(parentController) {
        this.parentController = parentController;
    };

    TreeViewController.prototype.setTree = function(tree) {
        this.tree = tree;
    };

    TreeViewController.prototype.getRawTree = function() {
        return this.tree.data ? this.tree.data() : this.tree;
    };

    TreeViewController.prototype.setTreeClick = function(fn) {
        this.treeClick = fn;
    };

    TreeViewController.prototype.emitClick = function(deferred, context, path) {
        if (this.parentController) {
            return this.parentController.emitClick(deferred, context, path);
        }

        // We reach the top of the tree
        // context.tree is the tree on which the click occured
        context.tree = this.tree.find(path);

        if (context.tree) {
            var result = this.treeClick(this.$scope, context);

            if (result && result.then) {
                return result.then(function() {
                    deferred.resolve(context.tree);
                }, deferred.reject);
            }

            deferred.resolve(context.tree);
        } else {
            deferred.reject();
        }
    };

    TreeViewController.prototype.destroy = function() {
        this.$scope = undefined;
        this.parentController = undefined;
        this.tree = undefined;
        this.treeClick = undefined;
    };

    TreeViewController.$inject = ['$scope'];

    return TreeViewController;
});
