//今日菜单处理程序
var Food=require('../model/Food');

module.exports=function(){
	var foods=Food.all();
	var result='';
	for(var i=0;i<foods.length;i++){
		var food=foods[i];
		var str=(i+1)+". "+food.name+"("+food.price+"元/份)\n";
		result+=str;
	}
	result+='\n回复\"id#你的邮箱地址\"(例如:1#123@qq.com)点餐';
	return result;
}