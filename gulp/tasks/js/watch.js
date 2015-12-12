var gulp = require('gulp');
var buildScripts = require('./builder');

module.exports = function() {
    return buildScripts(true)
};
