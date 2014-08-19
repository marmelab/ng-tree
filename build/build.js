({
    baseUrl: "../src",
    name: "../bower_components/almond/almond.js",
    include: ['ng-tree'],
    insertRequire: ['ng-tree'],
    wrap: {
        startFile: '../build/start.frag',
        endFile: '../build/end.frag'
    },
    out: '../ng-tree.min.js'
})
