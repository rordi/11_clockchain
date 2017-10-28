/*eslint-disable */
export default {

	login(email) {
    let result
    if (email === 'supplier@test.ch') {
      result = {
        "user": {
          "firstname": "Max",
          "lastname": "Frisch",
          "email": "supplier@test.ch",
          "etherbase": "123abc"
        }
      }
    } else if (email === 'consumer@test.ch') {
      result = {
        "user": {
          "firstname": "Wilhelm",
          "lastname": "Busch",
          "email": "consumer@test.ch",
          "etherbase": "456def"
        }
      }
    }  else {
      result = null
    }

    return result
  }
}
