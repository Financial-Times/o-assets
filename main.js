
var globalPrefix = '/bower_components';
var moduleVersions = {}, modulePaths = {};

module.exports = {
	setGlobalPathPrefix: function(newprefix) {
		globalPrefix = newprefix;
	},
	setModuleVersions: function (map) {
		for (var i in map) moduleVersions[i] = map[i];
	},
	setModulePaths: function (map) {
		for (var i in map) modulePaths[i] = map[i];
	},
	resolve: function(path, modulename) {
		var fullpath = path;
		if (moduleVersions[modulename]) fullpath = moduleVersions[modulename] + '/' + fullpath;
		if (modulePaths[modulename]) fullpath = modulePaths[modulename] + '/' + fullpath;
		return globalPrefix+fullpath;
	}
};
