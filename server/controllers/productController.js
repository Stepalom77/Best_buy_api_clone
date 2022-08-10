const { product, review, subcategory, purchase} = require('../models');

const getProducts = async (req, res) => {
  let allProducts = [];
  try {
    allProducts = await product.findAll({
      include: [{
        model: review,
        as: 'review'
      }, {
        model: subcategory,
        as: 'subcategory'
      }, {
        model: purchase,
        as: 'purchase'
      }]});
  } catch(err) {
    console.error(err);
    return res.status(400).json({ error: err })
  }
  return res.status(200).json(allProducts)
};

const getProduct = async (req, res,) => {
  let productId = req.params.id;
  let searchedProduct = null;
  
  try {
    searchedProduct = await product.findOne({
      where: { id: productId}
    }, {
        include: [{
          model: review,
          as: 'review'
        }, {
          model: subcategory,
          as: 'subcategory'
        }, {
          model: purchase,
          as: 'purchase'
        }]});
  }catch(error) {
    console.error(err);
    if(!searchedProduct) {
        return res.status(404).json({message: "The product you are looking for doesn't exist."})
    }
  }

  return res.status(200).json(searchedProduct);
};



const createProduct = async (req, res) => {
  let createdProduct = null;
  try {
    createdProduct = await product.create(req.body, {
        include: [{
          model: subcategory,
          as: 'subcategory'
        }]}); 
  } catch(err) {
    console.error(err);
    return res.status(400).json({error: err})
  }

  return res.status(200).json(createdProduct);
};

const createProductWithReview = async (req, res) => {
  let createdProductWithReview = null;
  try {
    createdProductWithReview = await curso.create(req.body, {
      include: [{
        model: subcategory,
        as: 'subcategory'
      }, {
        model: review,
        as: 'review'
      }]}); 
  } catch(err) {
    console.error(err);
    return res.status(400).json({error: err})
  }

  return res.status(200).json(createdProductWithReview);
};

const createProductWithPurchase = async (req, res) => {
  let createdProductWithPurchase = null;
  try {
    createdProductWithPurchase = await curso.create(req.body, {
      include: [{
        model: subcategory,
        as: 'subcategory'
      }, {
        model: purchase,
        as: 'purchase'
      }]}); 
  } catch(err) {
    console.error(err);
    return res.status(400).json({error: err})
  }

  return res.status(200).json(createdProductWithPurchase);
};

const updateProduct = async (req, res) => {
    let productId = req.params.id;
    let {
        name, price, rating, overview, specifications, shipping, stock, subcategory_id
    } = req.body;
    let productToUpdate = null;
    try {
      productToUpdate = await product.findByPk(productId, {
        include: [{
          model: review,
          as: 'review'
        }, {
          model: subcategory,
          as: 'subcategory'
        }, {
          model: purchase,
          as: 'purchase'
        }]})
        productToUpdate = await product.update({
            name: name,
            price: price,
            rating: rating,
            overview: overview,
            specifications: specifications,
            shipping: shipping,
            stock: stock,
            subcategory_id: subcategory_id
      },
        {where: {
          id: productId
        }
      })
    } catch(err) {
      console.error(err);
      if(!productToUpdate) {
        return res.status(404).json({message: "The product you want to update doesn't exist."})
      }
    }
      return res.status(200).json(productToUpdate);
    }; 

const deleteProduct = async (req, res) => {
  let productId = req.params.id;
  let deletedProduct = null;
  try {
    deletedProduct = await product.destroy({
      where: {
        id: productId
      }
    });
  } catch(err) {
    console.error(err);
    if (!deletedProduct) {
      return res.status(404).json({message: "The product you are trying to delete doesn't exist."})
    }
  }
  
  return res.status(204).json({message: "The product has been deleted."})
}

module.exports = {
  getAll: getProducts,
  getOne: getProduct,
  create: createProduct,
  createWithReview: createProductWithReview,
  createWithPurchase: createProductWithPurchase,
  update: updateProduct,
  delete: deleteProduct
}