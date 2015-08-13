/*jslint node: true */
/*global describe, it*/

import {readFileSync} from 'fs';
import expect from 'expect.js';
import oAssets from '../main';

describe('o-assets', () => {
	it('should pass CSS tests', () => {
		const css = readFileSync(require('path').join(process.cwd(), 'build/test.css'), 'utf8');
		expect(css).to.contain('Failed: 0');
	});

	it('#resolve', () => {
		expect(oAssets.resolve('/img/logo.png', 'module1')).to.be('/bower_components/module1/img/logo.png');
		expect(oAssets.resolve('img/logo.png', 'module1')).to.be('/bower_components/module1/img/logo.png');
	});

	it('#setGlobalPathPrefix', () => {
		const chainedoAssets = oAssets.setGlobalPathPrefix();
		expect(chainedoAssets).to.be(oAssets);
		expect(oAssets.resolve('/img/logo.png', 'module1')).to.be('/bower_components/module1/img/logo.png');

		oAssets.setGlobalPathPrefix('foo/');
		expect(oAssets.resolve('/img/logo.png', 'module1')).to.be('foo/module1/img/logo.png');
	});

	it('#setModulePaths', () => {
		const chainedoAssets = oAssets.setModulePaths({
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
