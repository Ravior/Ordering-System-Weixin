//Profiles 配置文件

module.exports={
	port:8092,              //端口号
	token:'token',         //微信token
	validTime:[['09:00:00','10:45:00'],['13:30:00','17:30:00']],  //有效时间段
	redisValidTime:['13:00:00','20:00:00'], //redis存储到期时间（上午，下午）
	redis:{                 //数据库配置
		host:"127.0.0.1",
		port:6379,
	}
}