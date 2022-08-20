import { createStore } from 'vuex'
import $ from 'jquery'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    login(context, data) {
      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/api/token/',
        type: 'post',
        data: {
          username: data.username,
          password: data.password,
        },
        success(resp) {
          console.log(resp)
        }

      })
    }
  },
  modules: {
  }
})
