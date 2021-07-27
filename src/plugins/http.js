import axios from 'axios'

const MyHttpServer={}

MyHttpServer.install = (Vue, options) =>{

    axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
    Vue.prototype.$http = axios
  
}

export default MyHttpServer