const { purchase, user} = require('../models');

const getPurchases = async (req, res) => {
  let allPurchases = [];
  try {
    allPurchases = await purchase.findAll();
  } catch(err) {
    console.error(err);
    return res.status(400).json({message: 'There was an error'})
  }
  return res.status(200).json(allPurchases)
};

const getPurchase = async (req, res,) => {
  let purchaseId = req.params.id;
  let searchedPurchase = null;
  
  try {
    searchedPurchase = await purchase.findOne({
      where: { id: purchaseId}
    });
  }catch(error) {
    console.error(err);
    if(!searchedPurchase) {
        return res.status(404).json({message: "The purchase you are looking for doesn't exist."})
    } else {
      return res.status(400).json({message: 'There was an error'});
  }
  }

  return res.status(200).json(searchedPurchase);
};



const createPurchase = async (req, res) => {
  let createdPurchase = null;
  try {
    createdPurchase = await purchase.create(req.body, {
        include: [{
          model: user,
          as: 'user'
        }]}); 
  } catch(err) {
    console.error(err);
    return res.status(400).json({message: 'There was an error'})
  }

  return res.status(200).json(createdPurchase);
};


const updatePurchase = async (req, res) => {
    let purchaseId = req.params.id;
    let {
        time, amount, user_id
    } = req.body;
    let purchaseToUpdate = null;
    try {
      purchaseToUpdate = await purchase.findByPk(purchaseId)
        purchaseToUpdate = await purchase.update({
            time: time,
            amount: amount,
            user_id: user_id
      },
        {where: {
          id: purchaseId
        }
      })
	
    } catch(err) {
      console.error(err);
      if(!purchaseToUpdate) {
        return res.status(404).json({message: "The purchase you want to update doesn't exist."})
      } else {
        return res.status(400).json({message: 'There was an error'});
    }
    }
    return res.status(200).json(purchaseToUpdate);
    }; 

const deletePurchase = async (req, res) => {
  let purchaseId = req.params.id;
  let deletedPurchase = null;
  try {
    deletedPurchase = await purchase.destroy({
      where: {
        id: purchaseId
      }
    });
  } catch(err) {
    console.error(err);
    if (!deletedPurchase) {
      return res.status(404).json({message: "The purchase you are trying to delete doesn't exist."})
    } else {
      return res.status(400).json({message: 'There was an error'});
  }
  }
  
  return res.status(204).json({message: "The purchase has been deleted."})
}

module.exports = {
  getAll: getPurchases,
  getOne: getPurchase,
  create: createPurchase,
  update: updatePurchase,
  delete: deletePurchase
}
