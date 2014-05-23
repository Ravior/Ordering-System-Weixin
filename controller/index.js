var validateToken=require('../utils/validateToken');
var base=require('../utils/base');
var Today=require('./Today');
var Help=require('./Help');
var Order=require('./Order');

//首页
exports.index=function(req,res){
	validateToken.validateToken(req,res);
}

//微信请求处理
exports.wx=function(req,res){
	console.log(req.body);
	var msg=req.body.xml;
	//消息类型
	var msgType=msg.MsgType[0];

	switch(msgType){
		//处理文本消息
		case 'text':
		   receiveText(res,msg);
		   break;
		//处理事件推送
		case 'event':
		   receiveEvent(res,msg);
		   break;
		//其他情况
		default:
		   //发送空字符串,不做任何响应
		   base.sendNull(res);
		   break;
	}

}

//处理文本消息
var receiveText=function(res,msg){
	//消息发送者
	var fromUserName=msg.FromUserName[0];
	//消息接受者
	var toUserName=msg.ToUserName[0];
	//消息内容
	var content=msg.Content[0].toLowerCase();
	//帮助
	if(content=='help'||content=='h'){
		var reply=Help();
		//发送被动响应消息
		base.sendMsg(res,fromUserName,toUserName,reply);
		return;

	}
	//查看今日菜单
	if(content=='today'||content=='t'){
		var reply=Today();
		//发送被动响应消息
		base.sendMsg(res,fromUserName,toUserName,reply);
		return;

	}
	//下单
	if(/^(\d+)\#(\d+)(\@qq\.com)$/i.test(content)){
		Order.order(res,msg);
		return;
	}
	//取消订单
	if(/^\-(\d+)(\@qq\.com)$/i.test(content)){
		Order.unorder(res,msg);
		return;
	}
	//是否下单
	if(/^(\d+)(\@qq\.com)$/i.test(content)){
		Order.hasOrder(res,msg);
		return;
	}
	//默认处理
	base.handler(res,msg);

}

//处理事件消息
var receiveEvent=function(res,msg){
	//消息发送者
	var fromUserName=msg.FromUserName[0];
	//消息接受者
	var toUserName=msg.ToUserName[0];
	//事件内容
	var event=msg.Event[0];

	switch(event){
		case 'subscribe':
		    var result='\ue056hi,您好,我是饭否机器人Gitlib,欢迎您的关注！您可以给我发送以下命令:\n\n';
		    result+='1. help 或 h :\n   获取帮助信息\n';
		    result+='2. today 或 t :\n   获取今日菜单\n';
		    result+='3. 餐单id#饭否登陆邮箱 :\n   (例如:12#123@qq.com)\n   微信点餐\n';
		    result+='4. 饭否登陆邮箱 :\n   (例如:123@qq.com)\n   查询点餐情况\n';
		    result+='5. \-饭否登陆邮箱 :\n   (例如:-123@qq.com)\n   取消订单\n';
		    result+='\n祝您用餐愉快!';
		    //发送被动响应消息
		    base.sendMsg(res,fromUserName,toUserName,result);
		    break;
		default:
		    //发送空字符串,不做任何响应
		    base.sendNull(res);
		    break;
	}

}


