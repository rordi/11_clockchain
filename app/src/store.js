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

    user: state => state.user,

    users: state => state.users,

    openMissions (state) {
      let open = []
      if (state.appState.missions) {
        open = state.appState.missions.open.filter(function (mission) {
          return mission.supplierId !== state.user.id
        })
      }
      return open
    },

    // consumer view (missions I booked)
    bookedMissions (state) {
      let booked = []
      if (state.appState.missions) {
        booked = state.appState.missions.booked.filter(function (mission) {
          return mission.consumerId === state.user.id
        })
      }
      return booked
    },

    // supplier view (missions I offer that were booked)
    pendingAcceptanceMissions (state) {
      let pending = []
      if (state.appState.missions) {
        pending = state.appState.missions.booked.filter(function (mission) {
          return mission.supplierId === state.user.id
        })
      }
      return pending
    },

    // supplier view (missions I offer that I accpeted)
    acceptedMissions (state) {
      let accepted = []
      if (state.appState.missions) {
        accepted = state.appState.missions.accepted.filter(function (mission) {
          return mission.supplierId === state.user.id
        })
      }
      return accepted
    },

    // consumer view (missions I booked that werde confirmed)
    confirmedMissions (state) {
      let confirmed = []
      if (state.appState.missions) {
        confirmed = state.appState.missions.accepted.filter(function (mission) {
          return mission.consumerId === state.user.id
        })
      }
      return confirmed
    },

    // supplier view (missions I offered and I claimed)
    claimedMissions (state) {
      let claimed = []
      if (state.appState.missions) {
        claimed = state.appState.missions.claimed.filter(function (mission) {
          return mission.supplierId === state.user.id
        })
      }
      return claimed
    },

    // consumer view (missions I booked and are pending my claim confirmation)
    pendingClaimConfirmationMissions (state) {
      let pending = []
      if (state.appState.missions) {
        pending = state.appState.missions.claimed.filter(function (mission) {
          return mission.consumerId === state.user.id
        })
      }
      return pending
    },

    // supplier view (missions I offer that I accpeted)
    pastMissions (state) {
      let past = []
      if (state.appState.missions) {
        past = state.appState.missions.past.filter(function (mission) {
          return mission.supplierId === state.user.id || mission.consumerId === state.user.id
        })
      }
      return past
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
