const ffmpeg = require('fluent-ffmpeg');
const source = 'test.mp3';
const target = 'output.mp3';
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