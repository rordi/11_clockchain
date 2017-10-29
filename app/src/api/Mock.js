/*eslint-disable */
import UserResponses from './Mockdata/User/responses'

const timeout = 700

// return an error in 20% of the time
const successRate = 0.8

// Simulate requests
export default {
  login (email, password, callback, errorCallback) {
    let response = UserResponses.login(email)
    setTimeout(() => {
      if (Math.random() > successRate) {
        errorCallback(new Error('api failed.'))
      } else {
        if (response.user) {
          callback(response)
        } else {
          errorCallback(new Error('login failed.'))
        }
      }
    }, timeout)
  }
}
