import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [
      { title: "Post 1"},
      { title: "Post 2"},
      { title: "Post 3"},
      { title: "Post 4"},
      { title: "Post 5"}
    ],
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {

  }
})
