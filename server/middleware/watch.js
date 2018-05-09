const path = require('path');
const uuid = require('uuid');
const { serverDir } = require('../config/dir');
const Result = require('../config/result');
const {promisify} = require('util');
const client = require('../helper/client');
const getAsync = promisify(client.get).bind(client);
/*
      场景四围观界面:/watch
    Request Params：tempid、shareTicket、user、avatar
    Response Params： 
    {
        success：True or False,
        errmsg:......
        pubName：发布用户名,
        pubAvatar：发布用户头像地址,
        mPicture：蒙照地址,
        password:口令,
        shareUser: [
            [name, avatar, voice],
            [name, avatar, voice],
            [name, avatar, voice]
        ],
        status: 0可看1不可看
    }
   */
module.exports = async function(req, res) {
    let { tempId, shareTicket, user, avatar } = req.body;
    let { publisher, password, blurPicture, picture, watcher } = JSON.parse(await getAsync(tempId));
    let resData = {},
        status;
    status = publisher.name === user ? 1 : 0;
    resData = {
        pubName: publisher.name,
        pubAvatar: publisher.avatar,
        password,
        blurPicture,
        picture,
        shareUser: watcher,
        status
    }
    let result = new Result(0, resData);
    res.send(result);
}