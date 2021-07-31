import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/user/user.vue'
import Role from '@/components/role/role.vue'
import Right from '@/components/right/right.vue'
import GoodsList from '@/components/goods/goodslist.vue'
import GoodsAdd from '@/components/goods/goodsadd.vue'
import GoodsCate from '@/components/goods/goodscate.vue'
import GoodsParams from '@/components/goods/goodsparams.vue'
import Orders from '@/components/orders/order.vue'
import Reports from '@/components/reports/reports.vue'

import { Message } from 'element-ui';
Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: 'users',
          component: Users
        },
        {
          name: 'roles',
          path: 'roles',
          component: Role
        },
        {
          name: 'rights',
          path: 'rights',
          component: Right
        },
        {
          name: 'goods',
          path: 'goods',
          component: GoodsList
        },
        {
          name: 'goodsadd',
          path: 'goodsadd',
          component: GoodsAdd
        },
        {
          name: 'categories',
          path: 'categories',
          component: GoodsCate
        },
        {
          name: 'params',
          path: 'params',
          component: GoodsParams
        },
        {
          name: 'orders',
          path: 'orders',
          component: Orders
        },
        {
          name:'reports',
          path:'reports',
          component:Reports
        }
      ]
    }
  ]
})

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {

    const token = localStorage.getItem("token");

    if (!token) {
      Message.warning('请先登录')
      router.push({ name: "login" });
    } else {
      next()
    }
  }

  // to and from are both route objects. must call `next`.
})
export default router
