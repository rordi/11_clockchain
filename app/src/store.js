// State management implementing the Flux pattern and using Vuex
import Vue from 'vue'
import router from './router'
import Vuex from 'vuex'
// import Service from 'api/Service'
import Service from './api/Mock'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {

    // the JWT token
    token: null,

    // the authenticated user
    user: null,

    // app state data
    appData: {
    },

    // get in progress
    loading: false,

    // post/put/delete in progress
    submitting: false,

    // collect errors
    errors: []

  },

  getters: {

    authenticated (state) {
      return (state.user && state.user !== null && state.user !== {})
    },

    token (state) {
      return state.token
    },

    firstname (state) {
      return state.user ? state.user.firstname : null
    },

    lastname (state) {
      return state.user ? state.user.lastname : null
    }
  },

  mutations: {

    SET_USER (state, user) {
      state.user = user
    },

    SET_APP_DATA (state, appData) {
      state.appData = appData
    },

    START_REQUEST (state, load) {
      if (load) {
        state.loading = true
      } else {
        state.submitting = true
      }
      state.errors = []
    },

    END_REQUEST (state, errors) {
      state.loading = false
      state.submitting = false
      state.errors = errors
    },

    UPDATE_USER_NAMES (state, names) {
      state.user.firstname = names.firstname
      state.user.lastname = names.lastname
    },

    SET_TOKEN (state, token) {
      state.token = token
      try {
        if ('localStorage' in window && window['localStorage'] !== null) {
          // Store token in local storage of browser
          localStorage.setItem('token', token)
        }
      } catch (e) {
        Vue.log.error('localStorage not available', e)
      }
    },

    LOGOUT_USER (state) {
      store.replaceState({
        token: null,
        user: null,
        loading: null,
        errors: null,
        appData: {
        }
      })
      localStorage.setItem('token', '')
      router.push({ name: 'Login', params: { logout: true } })
    },

    FORCED_LOGOUT (state) {
      store.replaceState({
        token: null,
        user: null,
        loading: null,
        errors: null,
        appData: {
        }
      })
      localStorage.setItem('token', '')
      router.push({ name: 'Login', params: { error: true } })
    }
  },

  actions: {

    login ({ commit, state }, { username, password }) {
      return new Promise((resolve, reject) => {
        if (!username && state.token && state.user) {
          resolve(state.user)
          return
        }
        commit('START_REQUEST')

        Service.login(username, password, result => {
          commit('SET_USER', result.user)
          commit('SET_APP_DATA', {})
          // commit('SET_TOKEN', result.token)
          commit('END_REQUEST')
          resolve(result)
        },
        err => {
          commit('END_REQUEST', [err])
          reject(err)
        })
      })
    },

    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('LOGOUT_USER')
        resolve()
      })
    }
  }
})
