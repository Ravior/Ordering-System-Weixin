//菜单数据

function Food(id,shopId,name,price){
	this.id=id;
	this.shopId=shopId;
	this.name=name;
	this.price=price;
}


Food.all = function() {
	return foods;
}

Food.getFoodById=function(id){
    for(var i=0;i<foods.length;i++){
        if(foods[i].id==id){
            return foods[i];
        }
    }
    return null;
}

var foods = [
    new Food(1, 1,'清蒸排骨饭', 12),
    new Food(2, 1,'凉瓜排骨饭', 11),
    new Food(3, 1,'老干妈排骨饭', 12),
    new Food(4, 1,'咸鱼五花肉饭', 13),
    new Food(5, 1,'香芋排骨饭', 11),
    new Food(6, 1,'板栗焖鸡饭', 14),
    new Food(7, 1,'豉油鸡饭', 11),
    new Food(8, 1,'豉汁鱼腩饭', 11),
    new Food(9, 1,'剁椒鱼腩饭', 11),
    new Food(10, 1,'冬菇鸡腿饭', 12),
    new Food(11, 1,'杂菌鸡腿饭', 13),
    new Food(12, 1,'咸蛋肉饼饭', 11),
    new Food(13, 1,'香菇肉饼饭', 11),
    new Food(14, 1,'梅菜扣肉饭', 12),
    new Food(15, 1,'香芋扣肉饭', 12),
    new Food(16, 1,'五香卤肉饭', 12),
    new Food(17, 1,'萝卜牛腩饭', 13),
    new Food(18, 1,'孜然肥牛饭', 13),
    new Food(19, 1,'牛肉丸饭', 11),
    new Food(20, 1,'麻辣牛杂饭', 13),
    new Food(21, 1,'花生猪脚饭', 13),
    new Food(22, 1,'啤酒鸭饭', 12),
    new Food(23, 1,'笋干焖鸭饭', 13),
    new Food(24, 1,'烧鸭饭', 11),
    new Food(25, 1,'广味腊肠饭', 13),
    new Food(26, 1,'梅菜肉饼饭', 11),
];

module.exports = Food;