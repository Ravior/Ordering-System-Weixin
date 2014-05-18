//redis操作

var redis=require('redis');
var config=require('../config');


var client=redis.createClient(config.redis.port,config.redis.host);
client.on("error",function(err){
	console.log("Redis[" + client.host + ":" + client.port + " ]发生错误，错误详情： " + err);
})


module.exports=client;

