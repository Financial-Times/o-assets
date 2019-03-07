let globalPrefix = '/bower_components/';
const moduleVersions = {};
const modulePaths = {};

function trim(s) {
	return s.replace(/^\/+/, '').replace(/\/+$/, '');
}

function setGlobalPathPrefix(newprefix) {
	if (typeof newprefix !== 'undefined') {
		globalPrefix = newprefix;
	}
	return this;
}

// left in for backwards compatibility but shouldn't be needed hereonin
function setModuleVersions(map) {
	for (const i in map) {
		if (i) {
			moduleVersions[i] = trim(map[i]);
		}
	}
	return this;
}
function setModulePaths(map) {
	for (const i in map) {
		if (i) {
			modulePaths[i] = trim(map[i]);
		}
	}
	return this;
}
function resolve(path, modulename) {
	let fullpath = trim(path);

	if (typeof modulePaths[modulename] !== 'undefined') {
		fullpath = modulePaths[modulename] + '/' + fullpath;
	} else {
		fullpath = modulename +	'/' + fullpath;

		if (globalPrefix) {
			fullpath = globalPrefix + fullpath;
		}
	}

	return fullpath;
}

export default {
	setGlobalPathPrefix,
	setModuleVersions,
	setModulePaths,
	resolve
};

export {
	setGlobalPathPrefix,
	setModuleVersions,
	setModulePaths,
	resolve
};
