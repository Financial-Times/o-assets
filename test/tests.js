/*

Rudimentary tests for o-asset path resolver

To run, browserify this JS file and then run it using node

  browserify tests.js -o testrunner.js; node testrunner.js

*/

var assets = require('../main.js');

function assertEquals(test, expect, message) {
    if (test !== expect) {
        console.trace();
        throw message || "Failed: Expected '" + expect + "', got '" + test + "'";
    } else {
        console.log("Passed: Expected '" + expect + "', got '" + test + "'")
    }
}

assertEquals(assets.resolve('/img/logo.png', 'module1'), '/bower_components/module1/img/logo.png');
assertEquals(assets.resolve('img/logo.png', 'module1'), '/bower_components/module1/img/logo.png');

var chainedAssets = assets.setGlobalPathPrefix();
assertEquals(assets, chainedAssets);
assertEquals(assets.resolve('/img/logo.png', 'module1'), '/bower_components/module1/img/logo.png');

assets.setGlobalPathPrefix('foo/');
assertEquals(assets.resolve('/img/logo.png', 'module1'), 'foo/module1/img/logo.png');



chainedAssets = assets.setModulePaths({
    module1: 'module1modified',
    module2: '/module2modified/'
});

assertEquals(assets, chainedAssets);

assertEquals(assets.resolve('/img/logo.png', 'module1'), 'foo/module1modified/img/logo.png');
assertEquals(assets.resolve('/img/logo.png', 'module2'), 'foo/module2modified/img/logo.png');
assertEquals(assets.resolve('/img/logo.png', 'module3'), 'foo/module3/img/logo.png');
assertEquals(assets.resolve('img/logo.png', 'module1'), 'foo/module1modified/img/logo.png');
assertEquals(assets.resolve('img/logo.png', 'module2'), 'foo/module2modified/img/logo.png');
assertEquals(assets.resolve('img/logo.png', 'module3'), 'foo/module3/img/logo.png');

chainedAssets = assets.setModuleVersions({
    module1: '3.4.2',
    module3: '~1.0.0'
});

assertEquals(assets, chainedAssets);

assertEquals(assets.resolve('/img/logo.png', 'module1'), 'foo/module1modified@3.4.2/img/logo.png');
assertEquals(assets.resolve('/img/logo.png', 'module2'), 'foo/module2modified/img/logo.png');
assertEquals(assets.resolve('/img/logo.png', 'module3'), 'foo/module3@~1.0.0/img/logo.png');

assets.setGlobalPathPrefix('/');
assertEquals(assets.resolve('/img/logo.png', 'module1'), '/module1modified@3.4.2/img/logo.png');
assertEquals(assets.resolve('/img/logo.png', 'module2'), '/module2modified/img/logo.png');
assertEquals(assets.resolve('/img/logo.png', 'module3'), '/module3@~1.0.0/img/logo.png');

assets.setModulePaths({
    module1: '',
    module2: ''
});
assertEquals(assets.resolve('/img/logo.png', 'module1'), '/img/logo.png');
assertEquals(assets.resolve('/img/logo.png', 'module2'), '/img/logo.png');
assertEquals(assets.resolve('/img/logo.png', 'module3'), '/module3@~1.0.0/img/logo.png');

