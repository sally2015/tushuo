const voiceList = [
'宝宝要抱抱',
'人家超想哭的',
'人家就是这么萌',
'不要说话吻我',
'我长的很有骨气',
'关心一点多人家嘛',
'感觉自己萌萌哒',
'这个蛋糕很贵的',
'诚信共赢创新',
'让金融普惠大众',
'科技普惠连接'
]
const Result = require('../config/result');
function getRandomList(num) {
	let set = new Set();
	for(let i = 0; i < num; i++) {
		let item = voiceList[Math.floor(Math.random() * 3)];
		if(set.has(item)) {
			i--;
			continue;
		}
		set.add(item);
	}
	return Array.from(set);
}
module.exports = function(req, res) {
    let resData = {
        list: getRandomList(3)
    }
    let result = new Result(0, resData);
    res.send(result);
}