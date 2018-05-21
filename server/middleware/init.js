let
    path = require('path'),
    fs = require('fs'),
    redis = require('redis'),
    uuid = require('uuid'),
    Jimp = require('jimp'),
    client = require('../helper/client'),
    Result = require('../config/result'),
    { serverDir } = require('../config/dir');
/*
    场景一初始界面：/init
    Request Params： 
    {
		name: 用户名,
		avatar: 用户头像,
		password: 口令,
		number: 数量,
		picture: 图像
    }
    Response Params：
    {
        success： True or False,
        errmsg: ......,
        tempid: xxxxxx,
    }
*/

class Image {
    constructor(picName, dir) {
        this.baseDir = path.resolve(dir || serverDir, 'upload');
        this.picDir = path.resolve(this.baseDir, picName);
        this.extname = path.extname(picName);
    }
    getImage(url) {
        return Jimp.read(url);
    }
    copyImage(target) {
        let id = uuid(),
            read = fs.createReadStream(this.picDir),
            write = fs.createWriteStream(path.resolve(this.baseDir, target));
        return new Promise((resolve) => {
            read.pipe(write)
                .on('finish', () => {
                    resolve(new Image(target));
                });
        })
    }
    async blur(r) {
        try {
            let image = await this.getImage(this.picDir);
            let blurIm = await image.blur(r);
            blurIm.write(this.picDir);
            return this.picDir;
        } catch (e) {
            console.error(e);
        }
    }
}

async function handlePic(picName) {
    try {
        let image = new Image(picName);
        let blurPic = uuid() + image.extname;
        let target = await image.copyImage(blurPic);
        await target.blur(3);
        return {
            blurPic
        }
    } catch (e) {
        console.error(e);
    }
}
module.exports = function(req, res) {
    let tempId = uuid(),
        { name, avatar, password, number, picture } = req.body,
        data = {};
    handlePic(picture)
        .then(({ blurPic }) => {
            Object.assign(data, {
                tempId,
                blurPic,
                picture,
                password,
                number,
                publisher: {
                    name,
                    avatar
                },
                watcher: []
            })
            client.set(tempId, JSON.stringify(data), redis.print);
            let result = new Result(0, {
                tempId
            })
            res.send(result);
        }).catch((err) => {
            console.error('init error:' + err);
            return res.status(500).send('init error:' + err);
        })
}