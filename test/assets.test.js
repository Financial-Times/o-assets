/*global describe, it*/
'use strict';

var expect = require('expect.js');

var oAssets = require('../main.js');

describe('o-assets', function() {

	it('#resolve', function() {
		expect(oAssets.resolve('/img/logo.png', 'module1')).to.be('/bower_components/module1/img/logo.png');
		expect(oAssets.resolve('img/logo.png', 'module1')).to.be('/bower_components/module1/img/logo.png');
	});

	it('#setGlobalPathPrefix', function() {
		var chainedoAssets = oAssets.setGlobalPathPrefix();
		expect(chainedoAssets).to.be(oAssets);
		expect(oAssets.resolve('/img/logo.png', 'module1')).to.be('/bower_components/module1/img/logo.png');

		oAssets.setGlobalPathPrefix('foo/');
		expect(oAssets.resolve('/img/logo.png', 'module1')).to.be('foo/module1/img/logo.png');
	});

	it('#setModulePaths', function() {
		var chainedoAssets = oAssets.setModulePaths({
			module1: 'module1modified',
			module2: '/module2modified/',
			module4: 'module4modified@~1.0.0'
		});
		expect(chainedoAssets).to.be(oAssets);

		expect(oAssets.resolve('/img/logo.png', 'module1')).to.be('module1modified/img/logo.png');
		expect(oAssets.resolve('/img/logo.png', 'module2')).to.be('module2modified/img/logo.png');
		expect(oAssets.resolve('/img/logo.png', 'module3')).to.be('foo/module3/img/logo.png');
		expect(oAssets.resolve('/img/logo.png', 'module4')).to.be('module4modified@~1.0.0/img/logo.png');
		expect(oAssets.resolve('img/logo.png', 'module1')).to.be('module1modified/img/logo.png');
		expect(oAssets.resolve('img/logo.png', 'module2')).to.be('module2modified/img/logo.png');
		expect(oAssets.resolve('img/logo.png', 'module3')).to.be('foo/module3/img/logo.png');
		expect(oAssets.resolve('img/logo.png', 'module4')).to.be('module4modified@~1.0.0/img/logo.png');

		oAssets.setGlobalPathPrefix('/');

		expect(oAssets.resolve('/img/logo.png', 'module3')).to.be('/module3/img/logo.png');
		expect(oAssets.resolve('img/logo.png', 'module4')).to.be('module4modified@~1.0.0/img/logo.png');

		oAssets.setModulePaths({
			module1: '.',
			module2: '.'
		});

		expect(oAssets.resolve('/img/logo.png', 'module1')).to.be('./img/logo.png');
		expect(oAssets.resolve('/img/logo.png', 'module2')).to.be('./img/logo.png');
	});
});
