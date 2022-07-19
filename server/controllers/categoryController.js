const { category, department, subcategory} = require('../models');

const getCategories = async (req, res) => {
  let allCategories = [];
  try {
    allCategories = await category.findAll({
      include: [{
        model: department,
        as: 'department'
      }, {
        model: subcategory,
        as: 'subcategory'
      }]});
  } catch(err) {
    console.error(err);
    return res.status(400).json({ error: err })
  }
  return res.status(200).json(allCategories)
};

const getCategory = async (req, res,) => {
  let categoryId = req.params.id;
  let searchedCategory = null;
  
  try {
    searchedCategory = await category.findOne({
      where: { id: categoryId}
    }, {
        include: [{
          model: department,
          as: 'department'
        }, {
          model: subcategory,
          as: 'subcategory'
        }]});
  }catch(error) {
    console.error(err);
    if(!searchedCategory) {
        return res.status(404).json({message: "The category you are looking for doesn't exist."})
    }
  }

  return res.status(200).json(searchedCategory);
};



const createCategory = async (req, res) => {
  let createdCategory = null;
  try {
    createdCategory = await category.create(req.body, {
        include: [{
          model: department,
          as: 'department'
        }]}); 
  } catch(err) {
    console.error(err);
    return res.status(400).json({error: err})
  }

  return res.status(200).json(createdCategory);
};

const createCategoryWithSubcategory = async (req, res) => {
    let createdCategoryWithSubcategory = null;
    try {
      createdCategoryWithSubcategory = await category.create(req.body, {
        include: [{
          model: department,
          as: 'department'
        }, {
          model: subcategory,
          as: 'subcategory'
        }]}); 
    } catch(err) {
      console.error(err);
      return res.status(400).json({error: err})
    }
  
    return res.status(200).json(createdCategoryWithSubcategory);
  };

const updateCategory = async (req, res) => {
    let categoryId = req.params.id;
    let {name, department_id} = req.body;
    try {
      let categoryToUpdate = await category.findByPk(categoryId, {
        include: [{
          model: department,
          as: 'department'
        }, {
          model: subcategory,
          as: 'subcategory'
        }]})
        categoryToUpdate = await category.update({
            name: name,
            department_id: department_id
      },
        {where: {
          id: categoryId
        }
      })
    } catch(err) {
      console.error(err);
      if(!categoryToUpdate) {
        return res.status(404).json({message: "The category you want to update doesn't exist."})
      }
    }
      return res.status(200).json(categoryToUpdate);
    }; 

const deleteCategory = async (req, res) => {
  let categoryId = req.params.id;
  let deletedCategory = null;
  try {
    deletedCategory = await category.destroy({
      where: {
        id: categoryId
      }
    });
  } catch(err) {
    console.error(err);
  }
  if (!deletedCategory) {
    return res.status(404).json({message: "The category you are trying to delete doesn't exist."})
  }
  return res.status(204).json({message: "The category has been deleted."})
}

module.exports = {
  getAll: getCategories,
  getOne: getCategory,
  create: createCategory,
  createWithSubcategory: createCategoryWithSubcategory,
  update: updateCategory,
  delete: deleteCategory
}