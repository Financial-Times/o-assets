/*jslint node: true */
/*global describe, it, expect*/
'use strict';

import {readFileSync} from 'fs';
import {expect} from 'chai';
import oAssets from '../main';

describe('o-assets', () => {
	it('should pass CSS tests', () => {
		var css = readFileSync(require('path').join(process.cwd(), 'build/test.css'), 'utf8');
		expect(css).to.contain('Failed: 0');
	});

	it('#resolve', () => {
		expect(oAssets.resolve('/img/logo.png', 'module1')).to.equal('/bower_components/module1/img/logo.png');
		expect(oAssets.resolve('img/logo.png', 'module1')).to.equal('/bower_components/module1/img/logo.png');
	});

	it('#setGlobalPathPrefix', () => {
		var chainedoAssets = oAssets.setGlobalPathPrefix();
		expect(chainedoAssets).to.equal(oAssets);
		expect(oAssets.resolve('/img/logo.png', 'module1')).to.equal('/bower_components/module1/img/logo.png');

		oAssets.setGlobalPathPrefix('foo/');
		expect(oAssets.resolve('/img/logo.png', 'module1')).to.equal('foo/module1/img/logo.png');
	});

	it('#setModulePaths', () => {
		var chainedoAssets = oAssets.setModulePaths({
			module1: 'module1modified',
			module2: '/module2modified/',
			module4: 'module4modified@~1.0.0'
		});
		expect(chainedoAssets).to.equal(oAssets);

		expect(oAssets.resolve('/img/logo.png', 'module1')).to.equal('module1modified/img/logo.png');
		expect(oAssets.resolve('/img/logo.png', 'module2')).to.equal('module2modified/img/logo.png');
		expect(oAssets.resolve('/img/logo.png', 'module3')).to.equal('foo/module3/img/logo.png');
		expect(oAssets.resolve('/img/logo.png', 'module4')).to.equal('module4modified@~1.0.0/img/logo.png');
		expect(oAssets.resolve('img/logo.png', 'module1')).to.equal('module1modified/img/logo.png');
		expect(oAssets.resolve('img/logo.png', 'module2')).to.equal('module2modified/img/logo.png');
		expect(oAssets.resolve('img/logo.png', 'module3')).to.equal('foo/module3/img/logo.png');
		expect(oAssets.resolve('img/logo.png', 'module4')).to.equal('module4modified@~1.0.0/img/logo.png');

		oAssets.setGlobalPathPrefix('/');

		expect(oAssets.resolve('/img/logo.png', 'module3')).to.equal('/module3/img/logo.png');
		expect(oAssets.resolve('img/logo.png', 'module4')).to.equal('module4modified@~1.0.0/img/logo.png');

		oAssets.setModulePaths({
			module1: '.',
			module2: '.'
		});

		expect(oAssets.resolve('/img/logo.png', 'module1')).to.equal('./img/logo.png');
		expect(oAssets.resolve('/img/logo.png', 'module2')).to.equal('./img/logo.png');
	});
});
