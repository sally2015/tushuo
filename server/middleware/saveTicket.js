const path = require('path');
const uuid = require('uuid');
const {promisify} = require('util');
const { serverDir } = require('../config/dir');
const Result = require('../config/result');
const client = require('../helper/client');
const getAsync = promisify(client.get).bind(client);

/*
      场景二转发获取shareTicket：/saveTicket
       Request Params：tempId、shareTicket
       Response Params：
       {
           success：True or False,
           errmsg: ......
       }
   */
module.exports = async function(req, res) {
    let { tempId, shareTicket} = req.body;
    let data = await getAsync(tempId);
    let json = JSON.parse(data);
    json.shareTicket = shareTicket;
    client.set(tempId, JSON.stringify(json));
    let result = new Result(0, json);
    res.send(result);   
}