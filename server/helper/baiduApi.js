const http = require('http');
const md5 = require('md5');
const fs = require('fs');
const AipSpeechClient = require("baidu-aip-sdk").speech;
const APPID = '10006500';
const APIKEY = 'Ud3OHbsTf3lae8cQK3HmZvTN';
const SECRETKEY = 'c0c64040ad6c7cb4af150bf4a3dbb0b4';
let client = new AipSpeechClient(APPID, APIKEY, SECRETKEY);

async function recognize(voiceBuffer) {
    return await client.recognize(voiceBuffer, 'wav', 16000)
}
module.exports = function(target) {
    return new Promise((resolve, reject) => {
        fs.stat(target, (err, stat) => {
            if (stat && stat.isFile) {
                let voice = fs.readFileSync(target);
                let voiceBuffer = new Buffer(voice);
                recognize(voiceBuffer)
                    .then((result) => {
                        resolve(JSON.stringify(result))
                    })
                    .catch((err) => {
                        reject(`recognize err${err}`);
                    })
            } else {
                reject(`${target} is not exsist`)
            }
        })
    })
}