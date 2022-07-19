const { purchase, user, product} = require('../models');

const getPurchases = async (req, res) => {
  let allPurchases = [];
  try {
    allPurchases = await purchase.findAll({
      include: [{
        model: user,
        as: 'user'
      }, {
        model: product,
        as: 'product'
      }]});
  } catch(err) {
    console.error(err);
    return res.status(400).json({ error: err })
  }
  return res.status(200).json(allPurchases)
};

const getPurchase = async (req, res,) => {
  let purchaseId = req.params.id;
  let searchedPurchase = null;
  
  try {
    searchedPurchase = await purchase.findOne({
      where: { id: purchaseId}
    }, {
        include: [{
          model: user,
          as: 'user'
        }, {
          model: product,
          as: 'product'
        }]});
  }catch(error) {
    console.error(err);
    if(!searchedPurchase) {
        return res.status(404).json({message: "The purchase you are looking for doesn't exist."})
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
    return res.status(400).json({error: err})
  }

  return res.status(200).json(createdPurchase);
};


const updatePurchase = async (req, res) => {
    let purchaseId = req.params.id;
    let {
        time, amount, product_id
    } = req.body;
    try {
      let purchaseToUpdate = await purchase.findByPk(purchaseId, {
        include: [{
          model: user,
          as: 'user'
        }, {
          model: product,
          as: 'product'
        }]})
        purchaseToUpdate = await purchase.update({
            time: time,
            amount: amount,
            product_id: product_id
      },
        {where: {
          id: purchaseId
        }
      })
    } catch(err) {
      console.error(err);
      if(!purchaseToUpdate) {
        return res.status(404).json({message: "The purchase you want to update doesn't exist."})
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
  }
  if (!deletedPurchase) {
    return res.status(404).json({message: "The purchase you are trying to delete doesn't exist."})
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