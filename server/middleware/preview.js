const path = require('path');
const uuid = require('uuid');
let { serverDir } = require('../config/dir');
let Result = require('../config/result');
let client = require('../helper/client');
/*
      场景二分享界面：/preview
       Request Params：（tempid）
       Response Params：
       {
           success：True or False,
           errmsg: ......,
           password: xxx,
           number: xxx,
           pictrue: xxx,
           share_doc: xxx, //先放着
       }
   */
module.exports = function(req, res) {
    let { tempId } = req.body;
    client.get(tempId, (err, data) => {
        let result = new Result(0, data)
        res.send(result);
    })
}