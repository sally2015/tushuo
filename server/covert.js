const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
// console.log(ffmpegInstaller.path, ffmpegInstaller.version);

var track = './test.mp3';//your path to source file
ffmpeg(track)
.format('wav')
.on('error', function (err) {
    console.log('An error occurred: ' + err.message);
})
.on('progress', function (progress) {
    // console.log(JSON.stringify(progress));
    console.log('Processing: ' + progress.targetSize + ' KB converted');
})
.on('end', function () {
    console.log('Processing finished !');
})
.save('./hello.wav');//path where you want to save your file

