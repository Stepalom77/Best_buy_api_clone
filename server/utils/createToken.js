require('dotenv').config()
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error('There is no SECRET KEY');
}

const createToken = (user) => new Promise((resolve, reject) => {
  const payload = {
    id: user.id,
    email: user.email,
  } 


  jwt.sign(payload, SECRET_KEY, (err, token) => {
    if (err) {
      reject(err);
    }
    resolve(token);
  })
})

module.exports = createToken;
