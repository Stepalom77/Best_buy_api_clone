const { user, review, review_store, purchase} = require('../models');

const getUsers = async (req, res) => {
  let allUsers = [];
  try {
    allUsers = await user.findAll({
      include: [{
        model: review,
        as: 'review'
      }, {
        model: review_store,
        as: 'review_store'
      }, {
        model: purchase,
        as: 'purchase'
      }]});
  } catch(err) {
    console.error(err);
    return res.status(400).json({ error: err })
  }
  return res.status(200).json(allUsers)
};

const getUser = async (req, res,) => {
  let userId = req.params.id;
  let searchedUser = null;
  
  try {
    searchedUser = await user.findOne({
      where: { id: userId}
    }, {
        include: [{
          model: review,
          as: 'review'
        }, {
          model: review_store,
          as: 'review_store'
        }, {
          model: purchase,
          as: 'purchase'
        }]});
  }catch(error) {
    console.error(err);
    if(!searchedUser) {
        return res.status(404).json({message: "The user you are looking for doesn't exist."})
    }
  }

  return res.status(200).json(searchedUser);
};



const createUser = async (req, res) => {
  let createdUser = null;
  try {
    createdUser = await user.create(req.body) 
  } catch(err) {
    console.error(err);
    if  (err.username === 'SequelizeUniqueConstraintError' || err.email === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'The user already exists'});
    }
    return res.status(400).json({error: err})
  }

  return res.status(200).json(createdUser);
};

const createUserWithReview = async (req, res) => {
  let createdUserWithReview = null;
  try {
    createdUserWithReview = await user.create(req.body, {
      include: [{
        model: review,
        as: 'review'
      }]}); 
  } catch(err) {
    console.error(err);
    if  (err.username === 'SequelizeUniqueConstraintError' || err.email === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'The user already exists'});
    }
    return res.status(400).json({error: err})
  }

  return res.status(200).json(createdUserWithReview);
};

const createUserWithPurchase = async (req, res) => {
  let createdUserWithPurchase = null;
  try {
    createdUserWithPurchase = await user.create(req.body, {
      include: [{
        model: purchase,
        as: 'purchase'
      }]}); 
  } catch(err) {
    console.error(err);
    if  (err.username === 'SequelizeUniqueConstraintError' || err.email === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'The user already exists'});
    }
    return res.status(400).json({error: err})
  }

  return res.status(200).json(createdUserWithPurchase);
};

const createUserWithReviewStore = async (req, res) => {
    let createdUserWithReviewStore = null;
    try {
      createdUserWithReviewStore = await user.create(req.body, {
        include: [{
          model: review_store,
          as: 'review_store'
        }]}); 
    } catch(err) {
      console.error(err);
      if  (err.username === 'SequelizeUniqueConstraintError' || err.email === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'The user already exists'});
      }
      return res.status(400).json({error: err})
    }
  
    return res.status(200).json(createdUserWithReviewStore);
  };

const updateUser = async (req, res) => {
    let userId = req.params.id;
    let {
        username, password, email, first_name, last_name, payment_method, telephone_number} = req.body;
    try {
      let userToUpdate = await user.findByPk(userId, {
        include: [{
          model: review,
          as: 'review'
        }, {
          model: review_store,
          as: 'review_store'
        }, {
          model: purchase,
          as: 'purchase'
        }]})
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
  }
  if (!deletedUser) {
    return res.status(404).json({message: "The user you are trying to delete doesn't exist."})
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