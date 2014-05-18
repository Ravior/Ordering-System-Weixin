//帮助处理程序

module.exports=function(){
	var result='\ue056hi,您好,我是饭否机器人Gitlib,您可以给我发送以下命令:\n\n';
	result+='1. help 或 h :\n   获取帮助信息\n';
    result+='2. today 或 t :\n   获取今日菜单\n';
    result+='3. 餐单id#饭否登陆邮箱 :\n   (例如:12#123@qq.com)\n   微信点餐\n';
    result+='4. 饭否登陆邮箱 :\n   (例如:123@qq.com)\n   查询点餐情况\n';
    result+='\n祝您用餐愉快!';
	return result;
}