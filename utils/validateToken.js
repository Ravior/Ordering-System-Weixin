//token验证
var crypto = require('crypto');
var config = require('../config');  

//SHA1加密
function sha1(str) {  
    var md5sum = crypto.createHash('sha1');  
    md5sum.update(str);  
    str = md5sum.digest('hex');  
    return str;  
}  


//检测token是否通过验证
function checkToken(req){
    var result=false;
    //读取微信服务器传过来的参数
    var query = req.query;  
    var signature = query.signature;  
    var echostr = query.echostr;  
    var timestamp = query['timestamp'];  
    var nonce = query.nonce;  
    var oriArray = new Array();  
    oriArray[0] = nonce;  
    oriArray[1] = timestamp;  
    oriArray[2] = config.token;
    oriArray.sort();  
    var original = oriArray[0]+oriArray[1]+oriArray[2];  
    console.log("Original Str:"+original);  
    console.log("signature:"+signature);  
    var scyptoString = sha1(original);  
    if (signature == scyptoString) {  
        result=true; 
    }  
    return result; 
}

//验证请求是否来自微信服务器
function validateToken(req, res) {  
    if(checkToken(req)) {  
        var echostr = query.echostr;
        res.send(echostr);  
    }  
    else{ 
        res.send({'success':false,'msg':'token错误'}); 
    }  
}

exports.sha1=sha1;
exports.validateToken=validateToken;  
exports.checkToken=checkToken;

