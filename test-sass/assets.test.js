/* eslint-env mocha */

const readFileSync = require('fs').readFileSync;
const proclaim = require('proclaim');
const oAssets = require('../main');

describe('o-assets', () => {
	it('should pass CSS tests', () => {
		const css = readFileSync(require('path').join(process.cwd(), 'build/test.css'), 'utf8');
		proclaim.include(css, 'Failed: 0');
	});

	it('#resolve', () => {
		proclaim.deepEqual(oAssets.resolve('/img/logo.png', 'module1'), '/bower_components/module1/img/logo.png');
		proclaim.deepEqual(oAssets.resolve('img/logo.png', 'module1'), '/bower_components/module1/img/logo.png');
	});

	it('#setGlobalPathPrefix', () => {
		const chainedoAssets = oAssets.setGlobalPathPrefix();
		proclaim.deepEqual(chainedoAssets, oAssets);
		proclaim.deepEqual(oAssets.resolve('/img/logo.png', 'module1'), '/bower_components/module1/img/logo.png');

		oAssets.setGlobalPathPrefix('foo/');
		proclaim.deepEqual(oAssets.resolve('/img/logo.png', 'module1'), 'foo/module1/img/logo.png');
	});

	it('#setModulePaths', () => {
		const chainedoAssets = oAssets.setModulePaths({
			module1: 'module1modified',
			module2: '/module2modified/',
			module4: 'module4modified@~1.0.0'
		});
		proclaim.deepEqual(chainedoAssets, oAssets);

		proclaim.deepEqual(oAssets.resolve('/img/logo.png', 'module1'), 'module1modified/img/logo.png');
		proclaim.deepEqual(oAssets.resolve('/img/logo.png', 'module2'), 'module2modified/img/logo.png');
		proclaim.deepEqual(oAssets.resolve('/img/logo.png', 'module3'), 'foo/module3/img/logo.png');
		proclaim.deepEqual(oAssets.resolve('/img/logo.png', 'module4'), 'module4modified@~1.0.0/img/logo.png');
		proclaim.deepEqual(oAssets.resolve('img/logo.png', 'module1'), 'module1modified/img/logo.png');
		proclaim.deepEqual(oAssets.resolve('img/logo.png', 'module2'), 'module2modified/img/logo.png');
		proclaim.deepEqual(oAssets.resolve('img/logo.png', 'module3'), 'foo/module3/img/logo.png');
		proclaim.deepEqual(oAssets.resolve('img/logo.png', 'module4'), 'module4modified@~1.0.0/img/logo.png');

		oAssets.setGlobalPathPrefix('/');

		proclaim.deepEqual(oAssets.resolve('/img/logo.png', 'module3'), '/module3/img/logo.png');
		proclaim.deepEqual(oAssets.resolve('img/logo.png', 'module4'), 'module4modified@~1.0.0/img/logo.png');

		oAssets.setModulePaths({
			module1: '.',
			module2: '.'
		});

		proclaim.deepEqual(oAssets.resolve('/img/logo.png', 'module1'), './img/logo.png');
		proclaim.deepEqual(oAssets.resolve('/img/logo.png', 'module2'), './img/logo.png');
	});
});
