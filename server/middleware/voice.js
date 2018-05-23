const path = require('path');
const uuid = require('uuid');
const { serverDir } = require('../config/dir');
const Result = require('../config/result');
const mp3ToWav = require('../helper/mp3ToWav');
const baiduApi = require('../helper/baiduApi');
/*
    场景四围观界面提交录音:/voice
    Request Params：tempid、shareTicket、name、avatar、time、voice
    Response Params：
    {
        success：True or False，
        errmsg：。。。。。。
    }
   */
module.exports = function(req, res) {
    try {
        let voice = req.files.voice,
            voiceExt = 'mp3',
            voiceName = uuid() + '.' + voiceExt;
        voice.mv(path.resolve(serverDir, './upload', voiceName), (err) => {
            if (err) {
                console.log('move error' + err)
                return res.status(500).send(err);
            }
            let source = path.resolve(serverDir, './upload', voiceName);
            let target = path.resolve(serverDir, './temp', voiceName);
            let result = null;
            mp3ToWav(source, target)
                .then((target) => {
                    baiduApi(target)
                        .then((recoText) => {
                            result = new Result(0, {
                                success: 1,
                                recoText
                            })
                        })
                        .catch((err) => {
                            console.log('baiduAPI error' + err)
                            result = new Result(0, {
                                success: -1,
                                err
                            })
                        })
                }).catch((err) => {
                    console.log('convert error' + err)
                    result = new Result(0, {
                        success: -1,
                        err
                    })
                    console.log(result, 'line 51')
                })
            console.log(result, 'line 53')
            res.send(result);
        });
    } catch (e) {
        res.status(500).send(e);
    }

}