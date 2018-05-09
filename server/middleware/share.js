const path = require('path');
const uuid = require('uuid');
const {promisify} = require('util');
const { serverDir } = require('../config/dir');
const Result = require('../config/result');
const client = require('../helper/client');
const getAsync = promisify(client.get).bind(client);

/*
      场景二分享请求：/share
       Request Params：tempId、shareTicket
       Response Params：
       {
           success：True or False,
           errmsg: ......
       }
   */
module.exports = async function(req, res) {
    let { tempId} = req.body;
    let data = await getAsync(tempId);
    let json = JSON.parse(data);
    let result = new Result(0, json);
    res.send(result);   
}