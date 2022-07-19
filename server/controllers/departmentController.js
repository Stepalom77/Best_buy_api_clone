const { department, category, store} = require('../models');

const getDepartments = async (req, res) => {
  let allDepartments = [];
  try {
    allDepartments = await department.findAll({
      include: [{
        model: category,
        as: 'category'
      }, {
        model: store,
        as: 'store'
      }]});
  } catch(err) {
    console.error(err);
    return res.status(400).json({ error: err })
  }
  return res.status(200).json(allDepartments)
};

const getDepartment = async (req, res,) => {
  let departmentId = req.params.id;
  let searchedDepartment = null;
  
  try {
    searchedDepartment = await department.findOne({
      where: { id: departmentId}
    }, {
        include: [{
          model: category,
          as: 'category'
        }, {
          model: store,
          as: 'store'
        }]});
  }catch(error) {
    console.error(err);
    if(!searchedDepartment) {
        return res.status(404).json({message: "The department you are looking for doesn't exist."})
    }
  }

  return res.status(200).json(searchedDepartment);
};



const createDepartment = async (req, res) => {
  let createdDepartment = null;
  try {
    createdDepartment = await department.create(req.body); 
  } catch(err) {
    console.error(err);
    return res.status(400).json({error: err})
  }

  return res.status(200).json(createdDepartment);
};

const createDepartmentWithCategory = async (req, res) => {
    let createdDepartmentWithCategory = null;
    try {
      createdDepartmentWithCategory = await department.create(req.body, {
        include: [{
          model: category,
          as: 'category'
        }]}); 
    } catch(err) {
      console.error(err);
      return res.status(400).json({error: err})
    }
  
    return res.status(200).json(createdDepartmentWithCategory);
  };

const updateDepartment = async (req, res) => {
    let departmentId = req.params.id;
    let {name} = req.body;
    try {
      let departmentToUpdate = await department.findByPk(departmentId, {
        include: [{
          model: category,
          as: 'category'
        }, {
          model: store,
          as: 'store'
        }]})
        departmentToUpdate = await department.update({
            name: name
      },
        {where: {
          id: departmentId
        }
      })
    } catch(err) {
      console.error(err);
      if(!departmentToUpdate) {
        return res.status(404).json({message: "The department you want to update doesn't exist."})
      }
    }
      return res.status(200).json(departmentToUpdate);
    }; 

const deleteDepartment = async (req, res) => {
  let departmentId = req.params.id;
  let deletedDepartment = null;
  try {
    deletedDepartment = await department.destroy({
      where: {
        id: departmentId
      }
    });
  } catch(err) {
    console.error(err);
  }
  if (!deletedDepartment) {
    return res.status(404).json({message: "The department you are trying to delete doesn't exist."})
  }
  return res.status(204).json({message: "The department has been deleted."})
}

module.exports = {
  getAll: getDepartments,
  getOne: getDepartment,
  create: createDepartment,
  createWithCategory: createDepartmentWithCategory,
  update: updateDepartment,
  delete: deleteDepartment
}