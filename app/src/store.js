// State management implementing the Flux pattern and using Vuex
import Vue from 'vue'
import router from './router'
import Vuex from 'vuex'
import { firebaseAction, firebaseMutations } from 'vuexfire'
// import Service from './api/Mock'

Vue.use(Vuex)

export const setAppStateRef = firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
  bindFirebaseRef('appState', ref)
  unbindFirebaseRef('appState')
})

export const serUsersRef = firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
  bindFirebaseRef('users', ref)
  unbindFirebaseRef('users')
})

let initalState = {
  // the authenticated user
  user: null,
  // all users
  users: {},
  // app state data
  appState: {},
  // get in progress
  loading: false,
  // post/put/delete in progress
  submitting: false,
  // collect errors
  errors: []
}

export const store = new Vuex.Store({
  strict: true,
  state: initalState,

  getters: {

    appState: state => state.appState,

    users: state => state.users,

    authenticated (state) {
      return (state.user && state.user !== null && state.user !== {})
    },

    firstname (state) {
      return state.user ? state.user.firstname : ''
    },

    lastname (state) {
      return state.user ? state.user.lastname : ''
    }
  },

  mutations: {

    ...firebaseMutations,

    SET_USER (state, user) {
      state.user = user
    },

    SET_APP_STATE (state, appState) {
      state.appState = appState
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

    LOGOUT_USER (state) {
      store.replaceState(initalState)
      router.push('/login')
    },

    FORCED_LOGOUT (state) {
      store.replaceState(initalState)
      router.push('/login')
    }
  },

  actions: {

    setAppStateRef: firebaseAction(({
      bindFirebaseRef
    }, ref) => {
      bindFirebaseRef('appState', ref)
    }),

    serUsersRef: firebaseAction(({
      bindFirebaseRef
    }, ref) => {
      bindFirebaseRef('users', ref)
    }),

    login ({ commit, state }, { username, password }) {
      return new Promise((resolve, reject) => {
        if (!username && state.user && username === state.user.email) {
          resolve(state.user)
          return
        }
        commit('START_REQUEST')
        if (username === 'consumer@test.ch' && password) {
          commit('SET_USER', state.users.consumer)
          commit('END_REQUEST')
          resolve(state.users.consumer)
        } else if (username === 'supplier@test.ch' && password) {
          commit('SET_USER', state.users.supplier)
          commit('END_REQUEST')
          resolve(state.users.supplier)
        }
        commit('END_REQUEST')
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
