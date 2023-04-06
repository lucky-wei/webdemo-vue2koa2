const Sequelize = require('sequelize')

// 使用url连接的形式进行连接
const Todolist = new Sequelize('mysql://root:root@localhost/exam',{
    define:{
        timestamps:false //取消给Sequelize自动给数据库加入时间戳
    }
})

module.exports = {
    Todolist //将Todolist 暴露出接口方便Model调用
}