//功能函数

var config=require('../config');

// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)   
{    
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  

//时间戳转换为 2014-2-1 19:23:3
function getLocTime(nS){
    var date=new Date(parseInt(nS))
    return date.Format('yyyy-MM-dd hh:mm:ss')
    //return date.getFullYear()+'-'+toFix(date.getMonth()+1,2)+'-'+toFix(date.getDate(),2)+' '+toFix(date.getHours(),2)+":"+toFix(date.getMinutes(),2)+":"+toFix(date.getSeconds(),2);
}


function convertDateStr(str,fmt){
    var date=new Date(Date.parse(str));
    fmt=fmt||'yyyy-MM-dd hh:mm:ss';
    return date.Format(fmt);

}


//计算时间差 时间格式 "2012-02-23 19:23:23",第二个参数可省略,表示到现在的截止时间
function grapTime(timeStart,timeEnd){
    var date1=new Date(timeStart.replace(/-/g,"/")).getTime();
    var date2=timeEnd?new Date(timeEnd.replace(/-/g,"/")).getTime():new Date().getTime();
    //时间间隔,毫秒
    var date=date2-date1;
    return date;
}

function getNow(){
    var time=new Date().getTime();
    return getLocTime(time);
}

//判断是上午还是下午
function isAM(){
    var isAM=true;
    var hour=new Date().getHours();
    if(hour>=12){
        isAM=false;
    }
    return isAM;
}


//获取当前时间或多少天后的时间,返回格式：2013-03-23
function getTime(days){
    days=days||0;
    var time=new Date().getTime()+days*24*3600*1000;
    var date=new Date(parseInt(time))
    return date.Format('yyyy-MM-dd')
}

//自动补全
function toFix(n , bit) {
    if(!bit)bit = 1;
    var str = n.toString();
    var b = bit - str.length;
    while(b > 0) {
        str = "0" + str;
        b--;
    }
    return str;
}



//判断是否在有效期内
function isInValidTime(){
    var result=false;
    var validTimeStart1=getTime()+" "+config.validTime[0][0];
    var validTimeEnd1=getTime()+" "+config.validTime[0][1];
    var validTimeStart2=getTime()+" "+config.validTime[1][0];
    var validTimeEnd2=getTime()+" "+config.validTime[1][1];

    var time1=grapTime(validTimeStart1);
    var time2=grapTime(validTimeEnd1);
    var time3=grapTime(validTimeStart2);
    var time4=grapTime(validTimeEnd2);

    if((time1>0&&time2<0)||(time3>0&&time4<0)){
        result=true;
    }
    return result;
}



exports.toFix=toFix;
exports.getLocTime=getLocTime;
exports.convertDateStr=convertDateStr;
exports.grapTime=grapTime;
exports.getNow=getNow;
exports.getTime=getTime;
exports.isAM=isAM;
exports.isInValidTime=isInValidTime;



