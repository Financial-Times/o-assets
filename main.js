
var globalPrefix = '/bower_components/';
var moduleVersions = {}, modulePaths = {};

function trim(s) { return s.replace(/^\/+/, '').replace(/\/+$/, ''); }

module.exports = {
	setGlobalPathPrefix: function(newprefix) {
		globalPrefix = newprefix;
	},
	setModuleVersions: function (map) {
		for (var i in map) moduleVersions[i] = trim(map[i]);
	},
	setModulePaths: function (map) {
		for (var i in map) modulePaths[i] = trim(map[i]);
	},
	resolve: function(path, modulename) {
		var fullpath = trim(path);
		if (typeof modulePaths[modulename] == 'undefined') modulePaths[modulename] = modulename;

		if (modulePaths[modulename] && moduleVersions[modulename]) fullpath = moduleVersions[modulename] + '/' + fullpath;
		if (modulePaths[modulename]) fullpath = modulePaths[modulename] + '/' + fullpath;
		if (globalPrefix) fullpath = globalPrefix + fullpath;
		return fullpath;
	}
};
