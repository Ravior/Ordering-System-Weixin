//下订单

var config=require('../config');
var Food=require('../model/Food');
var User=require('../model/User');
var func=require('../utils/functions');
var redis=require('../model/redis');
var base=require('../utils/base');

//所有菜单信息
var foods=Food.all();

//根据foodId获取菜单数据
var getFoodInfoById=function(foodId){
	for(var i=0;i<foods.length;i++){
		if(parseInt(foods[i].id)==parseInt(foodId)){
			return foods[i];
		}
	}
	return null;
}

exports.order=function(res,msg){
	//消息发送者
	var fromUserName=msg.FromUserName[0];
	//消息接受者
	var toUserName=msg.ToUserName[0];
	//消息内容
	var content=msg.Content[0].toLowerCase();
	//分解下单消息
	var arr=content.split('#');
	console.log(arr);
	//餐品id
	var id=arr[0];
	//用户邮箱地址
	var mail=arr[1];
	//获取用户信息
	var userInfo=User.getUserInfoByMail(mail);

	//不在点餐时间
	if(!func.isInValidTime()){
		var result=" 亲，不好意思，您已经错过点餐时间,下次吧！";
		base.sendMsg(res,fromUserName,toUserName,result);
		return;

	}
	//用户不存在
	if(!userInfo){
		var result="亲，不好意思，您输入的邮箱错误,请重新输入";
		base.sendMsg(res,fromUserName,toUserName,result);
		return;
	}
	//餐品不存在
	if(!Food.getFoodById(id)){
		var result="亲，不好意思，您输入的餐品不存在,请重新输入";
		base.sendMsg(res,fromUserName,toUserName,result);
		return;
	}

	//读取用户id,判断用户是否点餐
	var userId=userInfo.id;

	redis.exists(userId,function(err,reply){
		//消息发送者
		var fromUserName=msg.FromUserName[0];
		//消息接受者
		var toUserName=msg.ToUserName[0];
		//消息内容
		var content=msg.Content[0].toLowerCase();
		//分解下单消息
		var arr=content.split('#');
		//餐品id
		var orders=arr[0];

		if(err){
			var result="缓存操作失败!";
			base.sendMsg(res,fromUserName,toUserName,result);
			return;
		}
		else{
			//key已经存在
			if(reply==1){
				var result="亲，不好意思，您已经点餐了,不用吃这么多吧！";
				base.sendMsg(res,fromUserName,toUserName,result);
				return;
			}
			else{
				redis.hmset(userId,"order",orders.toString(),"time",func.getNow(),redis.print);
				var time=func.getTime()+" ";
				//判断当前是上午,还是下午
				if(func.isAM()){
					time+=config.redisValidTime[0];
				}
				else{
					time+=config.redisValidTime[1];
				}

				var expireTime=Math.round(Date.parse(time)/1000);
				redis.expireat(userId,expireTime);
				var result="恭喜您,点餐成功,记得付款哟!\ue043\n";
				result+='你可以回复"饭否登陆邮箱(例如:123@qq.com)"查询点餐情况';
				base.sendMsg(res,fromUserName,toUserName,result);
				return;	
			}
		}
	})
}

//取消订单
exports.unorder=function(res,msg){
	//消息发送者
	var fromUserName=msg.FromUserName[0];
	//消息接受者
	var toUserName=msg.ToUserName[0];
	//消息内容
	var content=msg.Content[0].toLowerCase();
	//用户邮箱地址 content="-123@qq.com"
	var mail=content.slice(1);
	console.log(mail);
	
	//获取用户信息
	var userInfo=User.getUserInfoByMail(mail);

	//不在点餐时间
	if(!func.isInValidTime()){
		var result=" 亲，不好意思,非点餐时间无法执行取消订单操作！";
		base.sendMsg(res,fromUserName,toUserName,result);
		return;

	}
	//用户不存在
	if(!userInfo){
		var result="亲，不好意思，您输入的邮箱错误,请重新输入";
		base.sendMsg(res,fromUserName,toUserName,result);
		return;
	}

	//读取用户id,判断用户是否点餐
	var userId=userInfo.id;

	redis.exists(userId,function(err,reply){
		//消息发送者
		var fromUserName=msg.FromUserName[0];
		//消息接受者
		var toUserName=msg.ToUserName[0];

		if(err){
			var result="缓存操作失败!";
			base.sendMsg(res,fromUserName,toUserName,result);
			return;
		}
		else{
			//key已经存在
			if(reply==1){
				redis.del(userId,function(err,reply){
					if(err||reply!=1){
						var result="亲，不好意思，操作失败了！";
						base.sendMsg(res,fromUserName,toUserName,result);
				        return;
					}
					if(reply==1){
						var result="取消订单成功,欢迎您继续使用!";
						base.sendMsg(res,fromUserName,toUserName,result);
				        return;
					}
				})
				
			}
			else{
				var result="亲,您还木有点餐呢,无法执行该操作！";
				base.sendMsg(res,fromUserName,toUserName,result);
				return;	
			}
		}
	})
}


exports.hasOrder=function(res,msg){
	//消息发送者
	var fromUserName=msg.FromUserName[0];
	//消息接受者
	var toUserName=msg.ToUserName[0];
	//消息内容(用户邮箱)
	var mail=msg.Content[0].toLowerCase();
	//获取用户信息
	var userInfo=User.getUserInfoByMail(mail);

	//用户不存在
	if(!userInfo){
		var result="亲，不好意思，您输入的邮箱错误,请重新输入";
		base.sendMsg(res,fromUserName,toUserName,result);
		return;
	}

	//读取用户id,判断用户是否点餐
	var userId=userInfo.id;

	redis.exists(userId,function(err,reply){
		//消息发送者
		var fromUserName=msg.FromUserName[0];
		//消息接受者
		var toUserName=msg.ToUserName[0];

		if(err){
			var result="缓存操作失败!";
			base.sendMsg(res,fromUserName,toUserName,result);
			return;
		}
		else{
			//key已经存在
			if(reply==1){
				redis.hmget(userId,"order","time",function (err, order) {
					if(err){
						var result="操作失败!";
						base.sendMsg(res,fromUserName,toUserName,result);
						return;
					}
					var foodId=order[0].split(',')[0];
					var time=order[1];
					var food=getFoodInfoById(foodId);
					var result="亲,您在"+time+"点了"+food.name;
					base.sendMsg(res,fromUserName,toUserName,result);
					return;
    		    });

			}
			else{
				var result="亲,您还木有点餐呢,可以回复\"id#你的邮箱地址\"(例如:1#123@qq.com)点餐哟!\ue043";
				if(!func.isInValidTime()){
					result="亲,您木有点餐!非点餐时间,不可点餐哟!";
				}
				
				base.sendMsg(res,fromUserName,toUserName,result);
				return;	
			}
		}
	})
}