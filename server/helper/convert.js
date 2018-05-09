const http = require('http');
const md5 = require('md5');
const fs = require('fs');
const AipSpeechClient = require("baidu-aip-sdk").speech;
const APPID = '10006500';
const APIKEY = 'Ud3OHbsTf3lae8cQK3HmZvTN';
const SECRETKEY = 'c0c64040ad6c7cb4af150bf4a3dbb0b4';
let client = new AipSpeechClient(APPID, APIKEY, SECRETKEY);

let voice = fs.readFileSync('./test.wav');
let voiceBuffer = new Buffer(voice);
client.recognize(voiceBuffer, 'wav', 16000).then(function(result) {
    console.log('<recognize>: ' + JSON.stringify(result));
}, function(err) {
    console.error(err);
    console.error('-------------------------------');
}).catch(e => {
    console.error(e)
})