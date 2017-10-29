// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FireBase from 'firebase'
import VuexFirebase from 'vuex-firebase'
import Notie from 'vue-notie'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import { store } from './store'

Vue.config.productionTip = false

const moment = require('moment')
require('moment/locale/de')
Vue.use(require('vue-moment'), { moment })
Vue.use(router)
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(Notie)

// init the firebase-based backend with vuex
let config = {
  apiKey: 'AIzaSyCTLr6Tz0uTZdFhlI8wZ3qE6NShhpaieo4',
  authDomain: 'clockchain-8e2bb.firebaseapp.com',
  databaseURL: 'https://clockchain-8e2bb.firebaseio.com',
  projectId: 'clockchain-8e2bb',
  storageBucket: 'clockchain-8e2bb.appspot.com',
  messagingSenderId: '199252938014'
}
FireBase.initializeApp(config)
VuexFirebase(store, FireBase)

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  // delete any pending requests in store, as well as errors from previous requests
  store.commit('END_REQUEST')

  // scroll to top
  window.scrollTo(0, 0)
  if (to.matched.some(record => record.meta.auth)) {
    if (!store.getters.authenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#clockchain',
  router,
  store,
  template: '<App/>',
  components: { App }
})
