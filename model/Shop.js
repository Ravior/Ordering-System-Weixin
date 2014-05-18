//店铺数据

function Shop(id,name){
	this.id=id;
	this.name=name;
}


Shop.all = function() {
	return shopes;
}

var shopes = [
    new Shop(1, '张记瓦罐汤')
];

module.exports = Shop;