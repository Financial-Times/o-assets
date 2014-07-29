(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var globalPrefix = '/bower_components/';
var moduleVersions = {}, modulePaths = {};

function trim(s) { return s.replace(/^\/+/, '').replace(/\/+$/, ''); }

module.exports = {
    setGlobalPathPrefix: function (newprefix) {
        if (typeof newprefix != 'undefined') globalPrefix = newprefix;
        return this;
    },
    // left in for backwards compatibility but shouldn't be needed hereonin
    setModuleVersions: function (map) {
        for (var i in map) moduleVersions[i] = trim(map[i]);
        return this;
    },
    setModulePaths: function (map) {
        for (var i in map) modulePaths[i] = trim(map[i]);
        return this;
    },
    resolve: function (path, modulename) {
        var fullpath = trim(path);
        if (typeof modulePaths[modulename] == 'undefined') modulePaths[modulename] = modulename;

        if (modulePaths[modulename]) {
            fullpath = modulePaths[modulename] +

            // left in for backwards compatibility but shouldn't be needed hereonin
            (moduleVersions[modulename] ? ('@' +  moduleVersions[modulename]) : '') +

            '/' + fullpath;
        }
        if (globalPrefix) fullpath = globalPrefix + fullpath;
        return fullpath;
    }
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9vcmlnYW1pLWJ1aWxkLXRvb2xzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcmh5cy5ldmFucy9TaXRlcy9vLW1vZHVsZXMvby1hc3NldHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxudmFyIGdsb2JhbFByZWZpeCA9ICcvYm93ZXJfY29tcG9uZW50cy8nO1xudmFyIG1vZHVsZVZlcnNpb25zID0ge30sIG1vZHVsZVBhdGhzID0ge307XG5cbmZ1bmN0aW9uIHRyaW0ocykgeyByZXR1cm4gcy5yZXBsYWNlKC9eXFwvKy8sICcnKS5yZXBsYWNlKC9cXC8rJC8sICcnKTsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzZXRHbG9iYWxQYXRoUHJlZml4OiBmdW5jdGlvbiAobmV3cHJlZml4KSB7XG4gICAgICAgIGlmICh0eXBlb2YgbmV3cHJlZml4ICE9ICd1bmRlZmluZWQnKSBnbG9iYWxQcmVmaXggPSBuZXdwcmVmaXg7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgLy8gbGVmdCBpbiBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgYnV0IHNob3VsZG4ndCBiZSBuZWVkZWQgaGVyZW9uaW5cbiAgICBzZXRNb2R1bGVWZXJzaW9uczogZnVuY3Rpb24gKG1hcCkge1xuICAgICAgICBmb3IgKHZhciBpIGluIG1hcCkgbW9kdWxlVmVyc2lvbnNbaV0gPSB0cmltKG1hcFtpXSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgc2V0TW9kdWxlUGF0aHM6IGZ1bmN0aW9uIChtYXApIHtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBtYXApIG1vZHVsZVBhdGhzW2ldID0gdHJpbShtYXBbaV0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIHJlc29sdmU6IGZ1bmN0aW9uIChwYXRoLCBtb2R1bGVuYW1lKSB7XG4gICAgICAgIHZhciBmdWxscGF0aCA9IHRyaW0ocGF0aCk7XG4gICAgICAgIGlmICh0eXBlb2YgbW9kdWxlUGF0aHNbbW9kdWxlbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIG1vZHVsZVBhdGhzW21vZHVsZW5hbWVdID0gbW9kdWxlbmFtZTtcblxuICAgICAgICBpZiAobW9kdWxlUGF0aHNbbW9kdWxlbmFtZV0pIHtcbiAgICAgICAgICAgIGZ1bGxwYXRoID0gbW9kdWxlUGF0aHNbbW9kdWxlbmFtZV0gK1xuXG4gICAgICAgICAgICAvLyBsZWZ0IGluIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSBidXQgc2hvdWxkbid0IGJlIG5lZWRlZCBoZXJlb25pblxuICAgICAgICAgICAgKG1vZHVsZVZlcnNpb25zW21vZHVsZW5hbWVdID8gKCdAJyArICBtb2R1bGVWZXJzaW9uc1ttb2R1bGVuYW1lXSkgOiAnJykgK1xuXG4gICAgICAgICAgICAnLycgKyBmdWxscGF0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2xvYmFsUHJlZml4KSBmdWxscGF0aCA9IGdsb2JhbFByZWZpeCArIGZ1bGxwYXRoO1xuICAgICAgICByZXR1cm4gZnVsbHBhdGg7XG4gICAgfVxufTtcbiJdfQ==
