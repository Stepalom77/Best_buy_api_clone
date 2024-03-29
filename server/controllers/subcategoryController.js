const { subcategory, category, product} = require('../models');

const getSubcategories = async (req, res) => {
  let allSubcategories = [];
  try {
    allSubcategories = await subcategory.findAll();
  } catch(err) {
    console.error(err);
    return res.status(400).json({message: 'There was an error'})
  }
  return res.status(200).json(allSubcategories)
};

const getSubcategory = async (req, res,) => {
  let subcategoryId = req.params.id;
  let searchedSubcategory = null;
  
  try {
    searchedSubcategory = await subcategory.findOne({
      where: { id: subcategoryId}
    });
  }catch(error) {
    console.error(err);
    if(!searchedSubcategory) {
        return res.status(404).json({message: "The subcategory you are looking for doesn't exist."})
    } else {
      return res.status(400).json({message: 'There was an error'});
  }
  }

  return res.status(200).json(searchedSubcategory);
};



const createSubcategory = async (req, res) => {
  let createdSubcategory = null;
  try {
    createdSubcategory = await subcategory.create(req.body, {
        include: [{
          model: category,
          as: 'category'
        }]}); 
  } catch(err) {
    console.error(err);
    return res.status(400).json({message: 'There was an error'})
  }

  return res.status(200).json(createdSubcategory);
};

const createSubcategoryWithProduct = async (req, res) => {
    let createdSubcategoryWithProduct = null;
    try {
      createdSubcategoryWithProduct = await subcategory.create(req.body, {
        include: [{
          model: category,
          as: 'category'
        }, {
          model: product,
          as: 'product'
        }]}); 
    } catch(err) {
      console.error(err);
      return res.status(400).json({message: 'There was an error'})
    }
  
    return res.status(200).json(createdSubcategoryWithProduct);
  };

const updateSubcategory = async (req, res) => {
    let subcategoryId = req.params.id;
    let {name, category_id} = req.body;
    let subcategoryToUpdate = null;
    try {
      subcategoryToUpdate = await subcategory.findByPk(subcategoryId)
        subcategoryToUpdate = await subcategory.update({
            name: name,
            category_id: category_id
      },
        {where: {
          id: subcategoryId
        }
      })
	
    } catch(err) {
      console.error(err);
      if(!subcategoryToUpdate) {
        return res.status(404).json({message: "The subcategory you want to update doesn't exist."})
      } else {
        return res.status(400).json({message: 'There was an error'});
    }
    }
    return res.status(200).json(subcategoryToUpdate);
    }; 

const deleteSubcategory = async (req, res) => {
  let subcategoryId = req.params.id;
  let deletedSubcategory = null;
  try {
    deletedSubcategory = await subcategory.destroy({
      where: {
        id: subcategoryId
      }
    });
  } catch(err) {
    console.error(err);
    if (!deletedSubcategory) {
      return res.status(404).json({message: "The subcategory you are trying to delete doesn't exist."})
    } else {
      return res.status(400).json({message: 'There was an error'});
  }
  }
  
  return res.status(204).json({message: "The subcategory has been deleted."})
}

module.exports = {
  getAll: getSubcategories,
  getOne: getSubcategory,
  create: createSubcategory,
  createWithProduct: createSubcategoryWithProduct,
  update: updateSubcategory,
  delete: deleteSubcategory
}
