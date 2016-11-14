# httpupload

jdf http方式上传代码的服务器接收端

# 部署和使用

先clone代码，然后到目录下`npm i`安装依赖，用pm2或者nodemon启动。
pm2下先关闭当前的实例
```
$ pm2 delete instance-name
$ kill -9 pm2-pid
```
修改pm2的启动用户方式
```
$ vi  /etc/init.d/pm2-init.sh
```
修改 USER=xxxx 和 export PM2_HOME="/var/www/html/.pm2"为你自己的配置，切换到有权限的用户
```
$ su xxxx 
```
启动 pm2，如果需要修改路径和监听端口的话，到server.js里面去修改，可以配合nginx做反向代理
```
$ pm2 startup centos
$ pm2 start server.js
```

一定要注意启动选择的用户，要想和ftp sftp方式无缝切换的话，要配置上传目录的权限，不要使用nologin用户，最好是所有用户都在一个分组中，然后上传路径直接chmod 777。

客户端上传时可以直接
```
$ jdf output        // 默认上传方式为 http
$ jdf output -t ftp // 指定上传方式为ftp
$ jdf output -t scp // 指定上传方式为scp
```
