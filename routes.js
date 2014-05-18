//路由集合

var index=require('./controller/index');

module.exports=function(app){
	//首页
	app.get('/',index.index);
	app.post('/',index.wx);
}

