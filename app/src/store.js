// State management implementing the Flux pattern and using Vuex
import Vue from 'vue'
import router from './router'
import Vuex from 'vuex'
import { firebaseAction, firebaseMutations } from 'vuexfire'
import Firebase from 'firebase'
// import Service from './api/Mock'

Vue.use(Vuex)

// init firebase config
let config = {
  apiKey: 'AIzaSyCTLr6Tz0uTZdFhlI8wZ3qE6NShhpaieo4',
  authDomain: 'clockchain-8e2bb.firebaseapp.com',
  databaseURL: 'https://clockchain-8e2bb.firebaseio.com',
  projectId: 'clockchain-8e2bb',
  storageBucket: 'clockchain-8e2bb.appspot.com',
  messagingSenderId: '199252938014'
}
let app = Firebase.initializeApp(config)
let intdb = app.database()
export const db = intdb

export const setAppStateRef = firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
  bindFirebaseRef('appState', ref)
  unbindFirebaseRef('appState')
})

export const setUsersRef = firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
  bindFirebaseRef('users', ref)
  unbindFirebaseRef('users')
})

let initalState = {
  // the authenticated user
  user: null,
  // all users
  users: {},
  // app state data
  appState: {
    missions: []
  },
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

    user: state => state.user,

    users: state => state.users,

    openMissions (state) {
      // any user's view (open missions offered by other users)
      return state.appState.missions.filter(function (mission) {
        return (mission.status === 'open' && mission.supplierId && mission.supplierId !== state.user.id)
      })
    },

    // consumer view (missions I booked)
    bookedMissions (state) {
      return state.appState.missions.filter(function (mission) {
        return (mission.status === 'booked' && mission.consumerId && mission.consumerId === state.user.id)
      })
    },

    // supplier view (missions I offer that were booked)
    pendingAcceptanceMissions (state) {
      return state.appState.missions.filter(function (mission) {
        return (mission.status === 'booked' && mission.supplierId && mission.supplierId === state.user.id)
      })
    },

    // consumer view (missions I booked that were confirmed)
    confirmedMissions (state) {
      return state.appState.missions.filter(function (mission) {
        return mission.status === 'accepted' && mission.consumerId && mission.consumerId === state.user.id
      })
    },

    // supplier view (missions I offer that I accepted)
    acceptedMissions (state) {
      return state.appState.missions.filter(function (mission) {
        return (mission.status === 'accepted' && mission.supplierId && mission.supplierId === state.user.id)
      })
    },

    // supplier view (missions I offered and I claimed)
    claimedMissions (state) {
      return state.appState.missions.filter(function (mission) {
        return (mission.status === 'claimed' && mission.supplierId && mission.supplierId === state.user.id)
      })
    },

    // consumer view (missions I booked and are pending my claim confirmation)
    pendingClaimConfirmationMissions (state) {
      return state.appState.missions.filter(function (mission) {
        return (mission.status === 'claimed' && mission.consumerId && mission.consumerId === state.user.id)
      })
    },

    // supplier view (missions I offer that I accepted)
    pastMissions (state) {
      return state.appState.missions.filter(function (mission) {
        return mission.status === 'past' && (
          (mission.supplierId && mission.supplierId === state.user.id) ||
          (mission.consumerId && mission.consumerId === state.user.id)
        )
      })
    },

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

    UPDATE_MISSION_STATUS (state, mutation) {
      state.appState.missions[mutation.key].status = mutation.status
      db.ref('appState').child('missions/' + mutation.key + '/status').set(mutation.status) // sync to firebase !
    },

    UPDATE_MISSION_CONSUMER (state, mutation) {
      // add new consumerId prop on obj in firebase !
      let mission = { ...state.appState.missions[mutation.key], consumerId: mutation.consumer }
      state.appState.missions[mutation.key] = mission
      db.ref('appState').child('missions/' + mutation.key).set(mission)
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

    setUsersRef: firebaseAction(({
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

    statusChange ({ commit, state }, { mission, status }) {
      return new Promise((resolve, reject) => {
        commit('START_REQUEST')
        let id = mission.id
        let key = (id - 1)
        commit('UPDATE_MISSION_STATUS', { key: key, status: status })
        resolve(state.appState.missions)
        commit('END_REQUEST')
      })
    },

    bookMission ({ commit, state }, { mission, status }) {
      return new Promise((resolve, reject) => {
        commit('START_REQUEST')
        let id = mission.id
        let key = (id - 1)
        commit('UPDATE_MISSION_STATUS', { key: key, status: status })
        commit('UPDATE_MISSION_CONSUMER', { key: key, consumer: state.user.id })
        resolve(state.appState.missions)
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
