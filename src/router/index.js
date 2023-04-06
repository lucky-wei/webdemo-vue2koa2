import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',  // 默认首页打开是登录页
    component: () => import('@/components/login.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{
    path: '/todolist',
      component: () => import('@/components/TodoList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由前置守卫
router.beforeEach((to,from,next)=>{
  const token = sessionStorage.getItem('demo-token')
  if(to.path == '/'){ //如果是跳转到登录页的
    if(token != 'null' && token != null){
      next('/todolist') //如果有token就转向todolist不返回登录页
    }
    next();//否则转回登录页
  }else{
    if(token != 'null' && token != null){
      // 全局设置header的token验证，注意Bearer后面有个空格
      // Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
      next() //如果有token就正常转向
    }else{
      next('/') //否则跳转回登录页
    }
  }
})

export default router
