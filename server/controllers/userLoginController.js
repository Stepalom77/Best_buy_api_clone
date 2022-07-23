const argon2 = require('argon2');
const {user} = require('../models');
const createToken = require('../utils/createToken');

 const login = async (req, res) => {
    let {email, password} = req.body;

    let usersLogger = null;
    try {
        usersLogger = await user.findOne({
            where: {
                email
            }
        })
    } catch(err) {
        console.error(err);
        throw new Error()
    }

    const hashedPassword = usersLogger.password;
    const passwordToTest = password;
    let isCorrectPassword = false;

    try{
        isCorrectPassword = await argon2.verify(hashedPassword, passwordToTest)
    } catch(err) {
        console.error(`There was an error while verifying the hash of the email: ${email}`)
        return res.status(404).json({ message: 'Login error' });
    }

    if (!isCorrectPassword) {
        return res.status(403).json({ 
          message: 'Incorrect password', 
          code: 'auth/wrong-password'
        })
      }

    let token = null;
  try {
    token = await createToken({ 
      id: usersLogger.id, 
      email: usersLogger.email 
    })
  } catch(err) {
    console.error(err);
    return res.status(404).json({ message: 'Login error' })
  }

  res.status(200).json({
    token,
    user: {
      id: usersLogger.id,
      email: usersLogger.email,
      username: usersLogger.username
    }
  })
}

module.exports = {
    login
};
