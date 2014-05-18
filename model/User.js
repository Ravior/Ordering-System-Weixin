//用户数据

function User(id, name, email) {
    this.id= id;
    this.name = name;
    this.email = email;
};


User.all = function() {
    return users;
}

User.getUserInfoByMail=function(mail){
    for(var i=0;i<users.length;i++){
        if(users[i].email==mail){
            return users[i];
        }
    }
    return null;
}

var users = [
    new User(1, "ravior",   "123456789@qq.com")
];

module.exports = User;