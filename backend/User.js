const database = require('./users.json')
const bcrypt = require('bcrypt')

const findUser = (userReq) => {
  return new Promise((resolve, reject) => {
    const foundUser = database.find(({ username }) => username === userReq.username)
    if (foundUser) {
      if (foundUser.is_locked) {
        reject(new Error('User is locked'))
      } else {
        resolve(foundUser)
      }
    } else {
      reject(new Error('User does not exist'))
    }
  })
}

const checkPassword = (reqPassword, foundUser) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(reqPassword, foundUser.password_hashed, (err, response) => {
      if (err) {
        reject(err)
      }
      else if (response) {
        resolve(response)
      } else {
        registerFailedAttempt(foundUser).then(user => {
          const attempsLeft = 3 - user.login_attempts
          reject(new Error(`Password does not match. You have ${attempsLeft} login attempts left.`))
        })
      }
    })
  )
}

const registerFailedAttempt = (userReq) => new Promise((resolve, reject) => {
  try {
    const foundUser = database.find(({ username }) => username === userReq.username)
    foundUser.login_attempts += 1
    if (foundUser.login_attempts > 3) {
      foundUser.is_locked = true
    }
    resolve(foundUser)
  }
  catch (err) {
    reject(err)
  }
})

const signin = (request, response) => {
  const userReq = request.body
  let user

  findUser(userReq)
    .then(foundUser => {
      user = foundUser
      return checkPassword(userReq.password, foundUser)
    })
    .then(() => {
      response.status(200).json({
        id: user.id,
        username: user.username
      })
    })
    .catch((err) => {
      if (!user) {
        response.status(400).json({
          error: err.toString(),
        })
      } else {
        response.status(400).json({
          error: err.toString(),
          login_attempts: user.login_attempts,
          is_locked: user.is_locked
        })
      }
      console.error(err)
    })
}

module.exports = {
  signin,
}