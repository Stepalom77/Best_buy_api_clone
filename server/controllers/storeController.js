const { store, department, review_store} = require('../models');

const getStores = async (req, res) => {
  let allStores = [];
  try {
    allStores = await store.findAll({
      include: [{
        model: department,
        as: 'department'
      }, {
        model: review_store,
        as: 'review_store'
      }]});
  } catch(err) {
    console.error(err);
    return res.status(400).json({ error: err })
  }
  return res.status(200).json(allStores)
};

const getStore = async (req, res,) => {
  let storeId = req.params.id;
  let searchedStore = null;
  
  try {
    searchedStore = await store.findOne({
      where: { id: storeId}
    }, {
      include: [{
        model: department,
        as: 'department'
      }, {
        model: review_store,
        as: 'review_store'
      }]});
  }catch(error) {
    console.error(err);
    if(!searchedUser) {
        return res.status(404).json({message: "The store you are looking for doesn't exist."})
    }
  }

  return res.status(200).json(searchedStore);
};



const createStore = async (req, res) => {
  let createdStore = null;
  try {
    createdStore = await store.create(req.body) 
  } catch(err) {
    console.error(err);
    return res.status(400).json({error: err})
  }

  return res.status(200).json(createdStore);
};

const createStoreWithDepartment = async (req, res) => {
  let createdStoreWithDepartment = null;
  try {
    createdStoreWithDepartment = await store.create(req.body, {
      include: [{
        model: department,
        as: 'department'
      }]}); 
  } catch(err) {
    console.error(err);
    return res.status(400).json({error: err})
  }

  return res.status(200).json(createdStoreWithDepartment);
};

const createStoreWithReviewStore = async (req, res) => {
    let createdStoreWithReviewStore = null;
    try {
      createdStoreWithReviewStore = await store.create(req.body, {
        include: [{
          model: review_store,
          as: 'review_store'
        }]}); 
    } catch(err) {
      console.error(err);
      return res.status(400).json({error: err})
    }
  
    return res.status(200).json(createdStoreWithReviewStore);
  };

const updateStore = async (req, res) => {
    let storeId = req.params.id;
    let {
      name, address, schedule, telephone_number, email} = req.body;
      let storeToUpdate =  null;
    try {
      storeToUpdate = await store.findByPk(storeId, {
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
        storeToUpdate = await store.update({
          name: name,
            password: password,
            address: address,
            schedule: schedule,
            telephone_number: telephone_number,
            email: email
      },
        {where: {
          id: storeId
        }
      })
    } catch(err) {
      console.error(err);
      if(!storeToUpdate) {
        return res.status(404).json({message: "The store you want to update doesn't exist."})
      }
    }
      return res.status(200).json(storeToUpdate);
    }; 

const deleteStore = async (req, res) => {
  let storeId = req.params.id;
  let deletedStore = null;
  try {
    deletedStore = await store.destroy({
      where: {
        id: storeId
      }
    });
  } catch(err) {
    console.error(err);
    if (!deletedStore) {
      return res.status(404).json({message: "The store you are trying to delete doesn't exist."})
    }
  }
  return res.status(204).json({message: "The store has been deleted."})
}

module.exports = {
  getAll: getStores,
  getOne: getStore,
  create: createStore,
  createWithDepartment: createStoreWithDepartment,
  createWithReviewStore: createStoreWithReviewStore,
  update: updateStore,
  delete: deleteStore
}