({
    baseUrl: "../src",
    name: "../bower_components/almond/almond.js",
    include: ['angular-tree'],
    insertRequire: ['angular-tree'],
    wrap: {
        startFile: '../build/start.frag',
        endFile: '../build/end.frag'
    },
    out: '../angular-tree.min.js'
})
