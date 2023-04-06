const api = require('../controllers/todolist')
const router = require('koa-router')()

router.get('/todolist/:id', api.getTodolist);
router.post('/todolist', api.createTodolist);
router.post('/todolist/remove-data',api.removeTodolist)
router.post('/todolist/update-data',api.updateTodolist)

module.exports = router //导出router规则