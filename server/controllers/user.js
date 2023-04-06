const user = require('../models/user')
// const jwt = require('koa-jwt')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const getUserInfo = function* (){
    const id = this.params.id //获取url里传过来的参数里的id
    const result = yield user.getUserById(id)
    this.body = result
}

const postUserAuth = function* (){
    const data = this.request.body; //post过来的数据存在request.body
    const userInfo = yield user.getUserByName(data.user_name)
    if(userInfo != null){ //如果查无此用户会返回null
        console.log('data',data)
        console.log('userInfo',userInfo)
        if(userInfo.password !== data.password){
        // if(!bcrypt.compareSync(data.password,userInfo.password)){
            this.body = {
                code:201,
                data:null,
                msg:"密码错误！"
            }
        }else{
            const userToken = {
                name:userInfo.user_name,
                id:userInfo.Id
            }
            const secret = 'vue-koa-demo';//指定秘钥，这是之后用来判断token合法性的标志
            const token = jwt.sign(userToken,secret)
            this.body = {
                code:200,
                data:{
                    token
                    // userToken
                },
                msg:'获取成功！'
            }
        }
    }else{
        this.body = {
            code:201,
            data:null,
            msg:'用户不存在'
        }
    }
}
module.exports = {
    getUserInfo, //将获取用户信息的方法暴露出去
    postUserAuth
}