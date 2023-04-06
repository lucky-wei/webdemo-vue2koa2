const auth = require('../controllers/user')
const router = require('koa-router')()

router.get('/user/:id',auth.getUserInfo);//定义Url的参数是id,用user的auth方法引入router
router.post('/user',auth.postUserAuth);

module.exports = router //将router暴露出去