const database = require('./users.json')
const bcrypt = require('bcrypt')

const findUser = (userReq) => {
  // return database.raw("SELECT * FROM users WHERE username = ?", [userReq.username])
  //   .then((data) => data.rows[0])
  return Promise.resolve()
}

const checkPassword = (reqPassword, foundUser) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(reqPassword, foundUser.password_digest, (err, response) => {
      if (err) {
        reject(err)
      }
      else if (response) {
        resolve(response)
      } else {
        reject(new Error('Passwords do not match.'))
      }
    })
  )
}

const signin = (request, response) => {
  // get user creds from request body
  // find user based on username in request
  // check user's password_digest against pw from request
  // if match, create and save a new token for user
  // send back json to client with token and user info
  const userReq = request.body
  let user

  findUser(userReq)
    // .then(foundUser => {
    //   user = foundUser
    //   return checkPassword(userReq.password, foundUser)
    // })
    // .then((res) => createToken())
    // .then(token => updateUserToken(token, user))
    .then(() => {
      // delete user.password_digest
      database[1].is_locked = true
      response.status(200).json(database[1])
    })
    .catch((err) => console.error(err))
}

module.exports = {
  signin,
}