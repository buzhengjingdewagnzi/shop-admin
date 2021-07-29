import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/user/user.vue'
import Role from '@/components/role/role.vue'
import Right from '@/components/right/right.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'login',
      path: '/login',
      component:Login
    },
    {
      name:'home',
      path: '/',
      component:Home,
      children:[
        {
          name:'users',
          path:'users',
          component:Users
        },
        {
          name:'role',
          path:'role',
          component:Role
        },
        {
          name:'right',
          path:'right',
          component:Right
        }
      ]
    }
  ]
})
