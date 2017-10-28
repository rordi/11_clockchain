import axios from 'axios'
import Vue from 'vue'
import { store } from '../store'

// base url for the firebase backend
let firebaseUrl = function () {
  let url = 'http://localhost/'
  console.log('Firebase Baseurl: ' + url)
  return url
}

// base url for the blockchain service backend
// let clockchainUrl = function () {
//   let url = 'http://localhost/'
//   console.log('Clockchain Baseurl: ' + url)
//   return url
// }

let FirebaseService = axios.create({
  baseURL: firebaseUrl(),
  timeout: 10000,
  transformRequest: [(data) => JSON.stringify(data)],
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// let ClockchainService = axios.create({
//   baseURL: clockchainService(),
//   timeout: 10000,
//   transformRequest: [(data) => JSON.stringify(data)],
//   headers: {
//     'Content-Type': 'application/json',
//     'X-Requested-With': 'XMLHttpRequest'
//   }
// })

let getToken = () => {
  let token = store.state.token

  if (!token && 'localStorage' in window && window['localStorage'] !== null) {
    token = localStorage.getItem('token')
  }

  return token
}

function handleResponse (response, callback, errorCallback) {
  if (response.data.success) {
    callback(response.data.data)
  } else {
    errorCallback(new Error(response.data.message))
  }
}

export default {

  /**
   * User login via API to obtain an authentication token
   * @param {string} email
   * @param {string} password
   * @param {function} callback
   * @param {function} errorCallback
   */
  login (email, password, callback, errorCallback) {
    FirebaseService.post('/login',
      {
        email: email,
        password: password
      }
    )
    .then(response => {
      handleResponse(response, callback, errorCallback)
    })
    .catch(e => {
      Vue.log.error('firebaseService.login', email)
      errorCallback(e)
    })
  }
}
