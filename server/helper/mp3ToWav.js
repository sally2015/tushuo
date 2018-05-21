const ffmpeg = require('fluent-ffmpeg');
module.exports = function(source, target) {
    return new Promise((resolve, reject) => {
        ffmpeg(source)
            .format('wav')
            .on('error', function(err) {
                reject(err.message);
            })
            .on('progress', function(progress) {
                console.log('Processing: ' + progress.targetSize + ' KB converted');
            })
            .on('end', function() {
                resolve(target);
            })
            .save(target);
    })
}