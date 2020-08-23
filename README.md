# stydy-self

项目搭建的环境
#配置ssh
##第一步
 git config --global user.name "github项目地址名称"
##第二步
 git config --global user.email "自己github上关联的email地址"
##第三步
 查看是否已经存在ssh
 cd ~/.ssh
 ls.
##第四步 生成ssh（不存在ssh）
 ssh-keygen -t rsa -C '上面输入的邮箱地址'
 一路回车就可以了 默认
##第五步 查看ssh
 cat ~/.ssh/id_rsa.pub 复制一份
##第六步 将公钥添加到远程的仓库
##第七步 查看ssh文件是否配置成功
 ssh -T 这里输入的是你github的仓库名称 不是某一个库的名称 
 显示 You’ve successfully authenticated，but Github does not provide shell access则代表配置ssh成功
