var gulp = require('gulp');
var buildStyles = require('./builder');

module.exports = function() {
    return buildStyles(true);
};
