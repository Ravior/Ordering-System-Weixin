//工具函数
var xmlbuilder = require('xmlbuilder');

var buildXml=function(to, from, msgType,callback){
    var xml = xmlbuilder.create('xml').ele('ToUserName').dat(to).up()
    .ele('FromUserName').dat(from).up()
    .ele('CreateTime').txt(new Date().getMilliseconds()).up()
    .ele('MsgType').dat(msgType).up();
    xml = callback(xml);
    return xml.end({pretty:true});
}


//处理默认消息
var handler=function(res,msg){
    //消息发送者
    var fromUserName=msg.FromUserName[0];
    //消息接收者
    var toUserName=msg.ToUserName[0];
    //消息内容
    var content='启禀代王,小的愚钝,无法理解您的命令....';
    //发送响应消息
    sendMsg(res,fromUserName,toUserName,content);
}


//发送被动响应消息
var sendMsg=function(res,toUserName,fromUserName,content){
    var xml = buildXml(toUserName,fromUserName,'text', function(xml) {
        return xml.ele('Content').dat(content);
    });
    console.log("回复消息:"+xml);
    res.contentType('text/xml');
    res.send(xml, 200);
}

//发送空字符串,不做任何响应
var sendNull=function(res){
    res.send('');
}

exports.buildXml=buildXml;
exports.handler=handler;
exports.sendMsg=sendMsg;
exports.sendNull=sendNull;
