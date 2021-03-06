// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MyBread from '@/components/public/myBread.vue'
import ElementUI from 'element-ui'
import MyHttpServer from '@/plugins/http.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import router from './router/index'
import moment from 'moment'
import TreeTable from "vue-table-with-tree-grid";

// Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.use(MyHttpServer)
Vue.config.productionTip = false

// 处理日期格式
Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})
Vue.component('tree-table', TreeTable)
Vue.component('my-bread',MyBread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
