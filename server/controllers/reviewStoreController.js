const { review_store, store} = require('../models');

const getReviewStores = async (req, res) => {
  let allReviewStores = [];
  try {
    allReviewStores = await review_store.findAll({
      include: [{
        model: store,
        as: 'store'
      }]});
  } catch(err) {
    console.error(err);
    return res.status(400).json({ error: err })
  }
  return res.status(200).json(allReviewStores)
};

const getReviewStore = async (req, res,) => {
  let reviewStoreId = req.params.id;
  let searchedReviewStore = null;
  
  try {
    searchedReviewStore = await review_store.findOne({
      where: { id: reviewStoreId}
    }, {
        include: [{
          model: store,
          as: 'store'
        }]});
  }catch(error) {
    console.error(err);
    if(!searchedReviewStore) {
        return res.status(404).json({message: "The review you are looking for doesn't exist."})
    }
  }

  return res.status(200).json(searchedReviewStore);
};



const createReviewStore = async (req, res) => {
  let createdReviewStore = null;
  try {
    createdReviewStore = await review_store.create(req.body, {
        include: [{
          model: store,
          as: 'store'
        }]}); 
  } catch(err) {
    console.error(err);
    return res.status(400).json({error: err})
  }

  return res.status(200).json(createdReviewStore);
};


const updateReviewStore = async (req, res) => {
    let reviewStoreId = req.params.id;
    let {
        title, rating, description, helpful_votes, unhelpful_votes, store_id, user_id
    } = req.body;
    let reviewStoreToUpdate = null;
    try {
      reviewStoreToUpdate = await review_store.findByPk(reviewStoreId, {
        include: [{
          model: store,
          as: 'store'
        }]})
        reviewStoreToUpdate = await review_store.update({
            title: title,
            rating: rating,
            description: description,
            helpful_votes: helpful_votes,
            unhelpful_votes: unhelpful_votes,
            store_id: store_id,
            user_id: user_id
      },
        {where: {
          id: reviewStoreId
        }
      })
	return res.status(200).json(reviewStoreToUpdate);
    } catch(err) {
      console.error(err);
      if(!reviewStoreToUpdate) {
        return res.status(404).json({message: "The review you want to update doesn't exist."})
      }
    }
    }; 

const deleteReviewStore = async (req, res) => {
  let reviewStoreId = req.params.id;
  let deletedReviewStore = null;
  try {
    deletedReviewStore = await review_store.destroy({
      where: {
        id: reviewStoreId
      }
    });
  } catch(err) {
    console.error(err);
    if (!deletedReviewStore) {
      return res.status(404).json({message: "The review you are trying to delete doesn't exist."})
    }
  }
  
  return res.status(204).json({message: "The review has been deleted."})
}

module.exports = {
  getAll: getReviewStores,
  getOne: getReviewStore,
  create: createReviewStore,
  update: updateReviewStore,
  delete: deleteReviewStore
}
