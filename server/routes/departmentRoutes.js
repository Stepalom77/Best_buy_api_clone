const express = require('express');
const router = express.Router();
const department = require("../controllers/departmentController");

router.get('/department', department.getAll);
router.post('/department', department.create);
router.put('/department/:id', department.update);
router.get('/department/:id', department.getOne);
router.delete('/department/:id', department.delete);

//Advance Routes
router.post("/department/create-with-category", department.createWithCategory);

module.exports = router;