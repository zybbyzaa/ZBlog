# ZBlog
built with react、redux、koajs、webpack...

## 运行命令

### 数据库启动

        mongod --dbpath=D://MongoDB/data/ --logpath=D://MongoDB/logs/mongodb.log --logappend

### 开发模式

        npm run server-watch
        npm run client-watch

### 生产模式

        set NODE_ENV=production
        npm run start

## 问题收集

1. 评论后发表内容没清空
2. 用户不正常过期
