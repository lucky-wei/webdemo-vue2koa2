const todolist = require('../models/todolist')

// 查
const getTodolist = function* () {
    const id = this.params.id //获取url里的id
    // const result = yield todolist.getTodolistById(id)//同步查询返回的结果
    const result = {
        h:'hello world'
    }
    this.body = {
        code: 200,
        result
    } //将请求结果返回
}

// 增
const createTodolist = function* () {
    const data = this.request.body
    const success = yield todolist.createTodolist(data)
    this.body = {
        code: 200,
        success,
        msg: '创建成功！'
    }
}

// 删除
const removeTodolist = async (ctx) => {
    const { id, user_id } = ctx
    const result = await todolist.removeTodolist(id, user_id)
    this.body = {
        code: 200,
        result,
        msg: '删除成功'
    }
}

// 更新
const updateTodolist = async (ctx) => {
    const { id, user_id, status } = ctx
    status === '0' ? status = true : status = false //状态反转
    const result = await todolist.updateTodolist(id, user_id, status)
    this.body = {
        code: 200,
        result,
        msg: '更新成功'
    }
}

module.exports = {
    getTodolist,
    createTodolist,
    removeTodolist,
    updateTodolist
}