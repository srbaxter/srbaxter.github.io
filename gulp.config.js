module.exports = function() {
    var config = {
        build: './build/',
        alljs: [
            './js/**/*.js'
        ],
        allcss: './styles/**/*.css',
        index: 'index.html',
        images: './images/**/*.*'
    }

    return config;
};