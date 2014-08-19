angular-tree.js
===============

Module to use [tree.js](https://github.com/marmelab/tree.js) into your AngularJS applications.

# Installation

It is available with bower:

```
bower install angular-tree.js
```

Then add the retrieved files to your HTML layout:

```html
<script type="text/javascript" src="/path/to/bower_components/tree.js/tree.min.js"></script>
<script type="text/javascript" src="/path/to/bower_components/angular-tree.js/angular-tree.min.js"></script>
```

You can also use it with [RequireJS](http://requirejs.org/) as an AMD module.

Then add `angular-tree` as dependency for your AngularJS application:

```javascript
var app = angular.module('YOUR_APP', ['angular-tree']);
```

# Configuration

To build a tree the module provides a service `$treeFactory`. Just call it to build a tree from raw data:

```javascript
var tree = $treeFactory({
    children: [
        {
            name: 'dupuis',
            children: [
                {
                    name: 'prunelle',
                    children: [
                        {
                            name: 'lebrac',
                            job: 'designer'
                        },
                        {
                            name: 'lagaffe',
                            firstname: 'gaston',
                            job: 'sleeper'
                        },
                    ]
                }
            ]
        }
    ]
});
```

The tree is a hookable tree already configured to use `$q` as promises library.

`$treeFactory` get [tree.js](https://github.com/marmelab/tree.js) from `window.Tree` if you include it in others ways (with RequireJS for example), you can use **anywhere** `$treeFactory.factory(YOUR TREE.JS)` to configure it.

# Usage

See [tree.js](https://github.com/marmelab/tree.js) for detailed documentation. The generated trees by `$treeFactory` work the same way with some improvements:

* When you register a hook listener you can use dependency injection like below:

```javascript

tree.registerListener(tree.HOOK_PRE_APPEND, function(next, newNode) {
    // This is the classic way, it still works!
});

// You can also do:

tree.registerListener(tree.HOOK_PRE_APPEND, ['myService', function(myService) {
    return function(next, newNode) {
        // This is still our listener but you can now deal with `myService`
    };
}]);
```

* Each tree and its children are decorated with a `collapsed` attribute and a `toggle` method which inverts attributes:

```
tree.attr('collapsed'); // true
tree.toggle('collapsed');
tree.attr('collapsed'); // false
```
---

#### Display the tree

To display the tree you have to use the `tree-view` directive:

```html
<tree-view tree="YOUR_TREE"></tree-view>
```

#### Handle a click on a tree/sub-tree

When a click is triggered on a tree or a sub-tree, the default behaviour is to toggle the `collapsed` attribute on it. You can add your own click handler by adding the attribute `tree-click`:

```html
<tree-view tree="YOUR_TREE" tree-click="yourHandler(tree)"></tree-view>
```

You can pass to your handler two existing arguments:

* `$event`: the click event
* `tree`: the tree on which the click was triggered

The handler can return both a classic value (or nothing) and a promise. If it returns a promise, the toggle action will occur only if the promise is resolved.

#### Customize templates

You can have a full access to the templates used by `tree-view` and `tree-child-view` in order to edit them with the service `$treeTemplateFactory`:

```javascript
$treeTemplateFactory.tree() // returns tree-view template
$treeTemplateFactory.tree(NEW_TEMPLATE) // edit tree-view template

$treeTemplateFactory.treeChild() // returns tree-child-view template
$treeTemplateFactory.treeChild(NEW_TEMPLATE) // edit tree-child-view template
```

`tree-view` will represent the `ul` element and `tree-child-view` the `li` element.

Build
------

To rebuild the minified JavaScript you must run: `make build`.

Tests
-----
Install dependencies and run the unit tests:

```
make install
make test-spec
```

Contributing
------------

All contributions are welcome and must pass the tests. If you add a new feature, please write tests for it.

License
-------

This application is available under the MIT License, courtesy of [marmelab](http://marmelab.com).
