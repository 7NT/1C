import Vue from 'vue'
import Vuex from 'vuex'

import jstore from './jstore'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    jstore
  }
})
export default store
/*
export default function () {
  const Store = new Vue.Store({
    modules: {
      jstore
    }
  })

  return Store
}
*/
