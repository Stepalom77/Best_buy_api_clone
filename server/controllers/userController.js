const argon2 = require('argon2');
const { user, review, review_store, purchase} = require('../models');

const getUsers = async (req, res) => {
  let allUsers = [];
  try {
    allUsers = await user.findAll();
  } catch(err) {
    console.error(err);
    return res.status(400).json({message: 'There was an error'})
  }
  return res.status(200).json(allUsers)
};

const getUser = async (req, res,) => {
  let userId = req.params.id;
  let searchedUser = null;
  
  try {
    searchedUser = await user.findOne({
      where: { id: userId}
    });
  }catch(error) {
    console.error(err);
    if(!searchedUser) {
        return res.status(404).json({message: "The user you are looking for doesn't exist."})
    } else {
      return res.status(400).json({message: 'There was an error'});
  }
  }

  return res.status(200).json(searchedUser);
};



const createUser = async (req, res) => {
  let {password, email} = req.body;
   let hash = null;
   try {
     hash = await argon2.hash(password);
   } catch (err) {
     console.log(`There was an error with encription the password of the user ${req.body.email}`)
     console.error(err);
   }
  let createdUser = null;
  try {
    createdUser = await user.create({
      ...req.body,
      password:hash
  })
  } catch(err) {
    console.error(err);
    if  (err.username === 'SequelizeUniqueConstraintError' || err.email === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'The user already exists'});
    }
    return res.status(400).json({message: 'There was an error'})
  }

  return res.status(200).json(createdUser);
};

const createUserWithReview = async (req, res) => {
 let {password, email} = req.body;
  let hash = null;
  try {
     hash = await argon2.hash(password);
  } catch (err) {
    console.log(`There was an error with encription the password of the user ${req.body.email}`)
    console.error(err);
  }
  let createdUserWithReview = null;
  try {
    createdUserWithReview = await user.create({
      ...req.body,
      password:hash
  }, {
      include: [{
        model: review,
        as: 'review'
      }]}); 
  } catch(err) {
    console.error(err);
    if  (err.username === 'SequelizeUniqueConstraintError' || err.email === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'The user already exists'});
    }
    return res.status(400).json({message: 'There was an error'})
  }

  return res.status(200).json(createdUserWithReview);
};

const createUserWithPurchase = async (req, res) => {
 let {password, email} = req.body;
  let hash = null;
  try {
     hash = await argon2.hash(password);
  } catch (err) {
    console.log(`There was an error with encription the password of the user ${req.body.email}`)
    console.error(err);
  }
  let createdUserWithPurchase = null;
  try {
    createdUserWithPurchase = await user.create({
      ...req.body,
      password:hash
  }, {
      include: [{
        model: purchase,
        as: 'purchase'
      }]}); 
  } catch(err) {
    console.error(err);
    if  (err.username === 'SequelizeUniqueConstraintError' || err.email === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'The user already exists'});
    }
    return res.status(400).json({message: 'There was an error'})
  }

  return res.status(200).json(createdUserWithPurchase);
};

const createUserWithReviewStore = async (req, res) => {
 let {password, email} = req.body;
  let hash = null;
  try {
     hash = await argon2.hash(password);
  } catch (err) {
    console.log(`There was an error with encription the password of the user ${req.body.email}`)
    console.error(err);
  }
    let createdUserWithReviewStore = null;
    try {
      createdUserWithReviewStore = await user.create({
      ...req.body,
      password:hash
  }, {
        include: [{
          model: review_store,
          as: 'review_store'
        }]}); 
    } catch(err) {
      console.error(err);
      if  (err.username === 'SequelizeUniqueConstraintError' || err.email === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'The user already exists'});
      }
      return res.status(400).json({message: 'There was an error'})
    }
  
    return res.status(200).json(createdUserWithReviewStore);
  };

const updateUser = async (req, res) => {
    let userId = req.params.id;
    let {
        username, password, email, first_name, last_name, payment_method, telephone_number} = req.body;
        let userToUpdate = null;
    try {
      userToUpdate = await user.findByPk(userId)
        userToUpdate = await user.update({
            username: username,
            password: password,
            email: email,
            first_name: first_name,
            last_name: last_name,
            payment_method: payment_method,
            telephone_number: telephone_number
      },
        {where: {
          id: userId
        }
      })
	
    } catch(err) {
      console.error(err);
      if(!userToUpdate) {
        return res.status(404).json({message: "The user you want to update doesn't exist."})
      } else {
        return res.status(400).json({message: 'There was an error'});
    }
    }
    return res.status(200).json(userToUpdate);
    }; 

const deleteUser = async (req, res) => {
  let userId = req.params.id;
  let deletedUser = null;
  try {
    deletedUser = await user.destroy({
      where: {
        id: userId
      }
    });
  } catch(err) {
    console.error(err);
    if (!deletedUser) {
      return res.status(404).json({message: "The user you are trying to delete doesn't exist."})
    } else {
      return res.status(400).json({message: 'There was an error'});
  }
  }
  
  return res.status(204).json({message: "The user has been deleted."})
}

module.exports = {
  getAll: getUsers,
  getOne: getUser,
  create: createUser,
  createWithReview: createUserWithReview,
  createWithPurchase: createUserWithPurchase,
  createWithReviewStore: createUserWithReviewStore,
  update: updateUser,
  delete: deleteUser
}