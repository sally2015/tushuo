const path = require('path');
const uuid = require('uuid');
let { serverDir } = require('../config/dir');
let Result = require('../config/result');
module.exports = function(req, res) {
    /*
        图片上传：/upload
        Request Params: 图像（picture）
        Response Params:
        {
            success： True or False,
            errmsg: ......,
            picture:
        }
    */
    try {
        let picData = req.files.picture,
            ext = path.extname(picData.name) || '.jpg',
            picName = uuid() + ext;
        picData.mv(path.resolve(serverDir, './upload', picName), (err) => {
            if (err) {
                console.log(err)
                return res.status(500).send('upload err' + err);
            }
            let result = new Result(0, {
                picture: picName
            })
            res.send(result);
        });
    } catch (error) {
        console.error(error)
    }


}