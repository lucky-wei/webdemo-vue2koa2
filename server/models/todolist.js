const Sequelize = require('sequelize');
const db = require('../config/db')
const TodolistDb = db.Todolist;//引入数据库

const TodoList = require('../schema/list.js')(TodolistDb, Sequelize.DataTypes)

// 查找列表所有数据
const getTodolistById = function* (id) {
    const todolist = yield TodoList.findAll({
        where: {
            user_id: id
        },
        attributes: ['Id', 'content', 'status'] //只需返回这深南个字段的结果就行
    })
    console.log('todolist', todolist)
    return todolist
}

// 创建一条记录
const createTodolist = async (data) => {
    await TodoList.create({
        user_id: data.id, //用户的id，用来确定给哪个用户创建
        content: data.content,
        status: data.status
    })
    return true
}

// 删除
const removeTodolist = async (id, user_id) => {
    await TodoList.destroy({
        where: {
            id,
            user_id
        }
    })
    return true
}

// 改-更新
const updateTodolist = async (id, user_id, status) => {
    await TodoList.update({
        status
    }, {
        where: {
            id,
            user_id
        }
    })
    return true
}

module.exports = {
    getTodolistById,
    createTodolist,
    removeTodolist,
    updateTodolist
}