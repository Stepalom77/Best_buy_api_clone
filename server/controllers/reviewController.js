const { review, product, user} = require('../models');

const getReviews = async (req, res) => {
  let allReviews = [];
  try {
    allReviews = await review.findAll();
  } catch(err) {
    console.error(err);
    return res.status(400).json({message: 'There was an error'})
  }
  return res.status(200).json(allReviews)
};

const getReview = async (req, res,) => {
  let reviewId = req.params.id;
  let searchedReview = null;
  
  try {
    searchedReview = await review.findOne({
      where: { id: reviewId}
    });
  }catch(error) {
    console.error(err);
    if(!searchedReview) {
        return res.status(404).json({message: "The review you are looking for doesn't exist."})
    } else {
      return res.status(400).json({message: 'There was an error'});
  }
  }

  return res.status(200).json(searchedReview);
};



const createReview = async (req, res) => {
  let createdReview = null;
  try {
    createdReview = await review.create(req.body, {
        include: [{
          model: product,
          as: 'product'
        }, {
          model: user,
          as: 'user'
        }]}); 
  } catch(err) {
    console.error(err);
    return res.status(400).json({message: 'There was an error'})
  }

  return res.status(200).json(createdReview);
};

const updateReview = async (req, res) => {
    let reviewId = req.params.id;
    let {
        title, rating, description, helpful_votes, unhelpful_votes, time_of_purchase, user_id, product_id
    } = req.body;
    let reviewToUpdate = null;
    try {
      reviewToUpdate = await review.findByPk(reviewId)
        reviewToUpdate = await review.update({
            title: title,
            rating: rating,
            description: description,
            helpful_votes: helpful_votes,
            unhelpful_votes: unhelpful_votes,
            time_of_purchase: time_of_purchase,
            user_id: user_id,
            product_id: product_id
      },
        {where: {
          id: reviewId
        }
      })
    } catch(err) {
      console.error(err);
      if(!reviewToUpdate) {
        return res.status(404).json({message: "The review you want to update doesn't exist."})
      } else {
        return res.status(400).json({message: 'There was an error'});
    }
    }
    return res.status(200).json(reviewToUpdate);
    }; 

const deleteReview = async (req, res) => {
  let reviewId = req.params.id;
  let deletedReview = null;
  try {
    deletedReview = await review.destroy({
      where: {
        id: reviewId
      }
    });
  } catch(err) {
    console.error(err);
    if (!deletedReview) {
      return res.status(404).json({message: "The review you are trying to delete doesn't exist."})
    } else {
      return res.status(400).json({message: 'There was an error'});
  }
  }
 
  return res.status(204).json({message: "The review has been deleted."})
}

module.exports = {
  getAll: getReviews,
  getOne: getReview,
  create: createReview,
  update: updateReview,
  delete: deleteReview
}
