var del = require('del');

module.exports = function(cb) {
    return del([
        './../css/dist/*'
    ], {
        force: true
    }, cb);
};
