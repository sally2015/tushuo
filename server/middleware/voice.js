const path = require('path');
const uuid = require('uuid');
let { serverDir } = require('../config/dir');
let Result = require('../config/result');
let client = require('../helper/client');
/*
    场景四围观界面提交录音:/voice
    Request Params：tempid、shareTicket、name、avatar、time、voice
    Response Params：
    {
        success：True or False，
        errmsg：。。。。。。
    }
   */
async function getData(tempId) {
    return await client.get(tempId);
}
async function setData(tempId, data) {
    return await client.set(tempId, data);
}
module.exports = function(req, res) {
    // let { tempId, shareTicket, name, avatar, time } = req.body;
    try{
        // console.log(req)
    let voice = req.files.voice,
        voiceExt = 'mp3',
        voiceName = uuid() + '.' + voiceExt;
    voice.mv(path.resolve(serverDir, './upload', voiceName), (err) => {
        if (err)
            return res.status(500).send('voice mv err' + err);
        let result = new Result(0, {
            voiceName
        })
        res.send(result);
    });
} catch(e) {
    console.log(e)
}
    
}