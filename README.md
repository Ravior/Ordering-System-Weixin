## Ordering-System-Weixin

公司内部订餐系统微信端v1.0

*By Ravior (QQ:1767071791,Mail:ravior@gitlib.com)*

## Part1.运行环境

* NodeJS 0.10.18
* Redis 2.8.9

预览效果
![图片](http://mail.gitlib.com/cgi-bin/download?mailid=ZC2218-S33PCSef0jNLhR5NOX4Wc45&filename=%D5%D5%C6%AC.PNG&sid=oZc5ZkjwaYjwwlkK,7&type=json)



## Part2.依赖包
1. Redis            -----redis客户端
2. express          -----NodeJS web框架
3. ejs              -----页面渲染模板
4. async            -----异步转同步
5. xml2js           -----解析xml
6. xmlbuilder       -----生成xml


## Part3.怎样运行

### 修改配置config.js

* token:微信公共平台token
* port,redis配置（微信公共平台只支持80端口,可采用nginx作代理）
* 时间配置用于定制点餐时间

### 添加用户和菜名

该程序只适合小团队订餐,用户数据和菜名数据都存放在相应的文件中（model/User、model/Food）,减少对数据库的依赖。同时,添加用户和菜名都需要重启服务。需要进行用户和菜名动态管理的话，可以自行添加数据库，修改数据处理模块。`只支持统一的邮箱地址（默认只支持qq邮箱,可自行修改代码中的正则表达式）`



### 运行程序

`node app.js`
> 推荐使用forever启动,`forever app.js`,让程序可以在后台运行