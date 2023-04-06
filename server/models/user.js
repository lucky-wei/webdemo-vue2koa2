// const userInfo = User.define({ where:{id:1}});//查询
// console.log(userInfo);//输出

// const db  = require('../config/db'),
//     userModel = '../schema/user.js'; //引入user的表结构
const db = require('../config/db');
const Sequelize = require('sequelize')
const TodolistDb = db.Todolist //引入数据库

// 5.x版本
// const User = TodolistDb.import(userModel) //用sequelize的impor方法引入表结构，实例化了User 
// 6.x版本 userModel = '../schema/user.js'; //引入user的表结构
const User = require('../schema/user.js')(TodolistDb, Sequelize.DataTypes)

const getUserById = function* (id) {
    const userInfo = yield User.findOne({
        where: {
            id: id
        }
    })
    return userInfo
}

// koa2由使用语法糖
const getUserByName = function* (name) {
    const userInfo = yield User.findOne({
        where: {
            user_name: name
        }
    })
    return userInfo
}

module.exports = {
    getUserById,
    getUserByName
}