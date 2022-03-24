# stydy-self

项目搭建的环境
## 配置
## 第一步
 git config --global user.name "github项目地址名称"
## 第二步
 git config --global user.email "自己github上关联的email地址"
## 第三步
 查看是否已经存在ssh
 cd ~/.ssh
 ls.
## 生成ssh（不存在ssh）
 ssh-keygen -t rsa -C '上面输入的邮箱地址'
 一路回车就可以了 默认
## 查看ssh
 cat ~/.ssh/id_rsa.pub 复制一份
## 将公钥添加到远程的仓库
## 查看ssh文件是否配置成功
 ssh -T 这里输入的是你github的仓库名称 不是某一个库的名称 
 显示 You’ve successfully authenticated，but Github does not provide shell access则代表配置ssh成功
 # 创建项目步骤
1,在远程仓库创建一个新的仓库
2,将代码拉下来
3,搭建项目并且将代码进行提交
4,npm init -y 配置对应的文件格式 
5,配置打包文件以及Dev product dev文件是用来作为webpack-dev-server启动用的 prod是用来打包发布使用的
6,merge是通过解构出来才会存在的 文件配置中属性应该为plugins
7,安装配置babel 
