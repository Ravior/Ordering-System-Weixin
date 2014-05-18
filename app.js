var express=require('express');
var fs = require('fs');
var config=require('./config');
var routes=require('./routes');
var xmlBodyParser=require('./utils/xmlBodyParser');
var validateToken=require('./utils/validateToken');


var app=express();
//系统日志
var date=new Date();
var logPath='./log/'+date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate()+'.';
var accessLogfile = fs.createWriteStream(logPath+'access.log', {flags: 'a'});
var errorLogfile = fs.createWriteStream(logPath+'error.log', {flags: 'a'});

app.use(express.logger({stream: accessLogfile}));
app.use(express.bodyParser());
app.use(xmlBodyParser);
app.use(express.methodOverride());

//错误日志
app.use(function(err, req, res, next){
    var meta = '[' + new Date() + '] ' + req.url + '\n';
    errorLogfile.write(meta + err.stack + '\n');
    next();
});

//路由设置
routes(app);


app.listen(config.port);