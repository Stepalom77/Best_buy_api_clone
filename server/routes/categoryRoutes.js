const express = require('express');
const router = express.Router();
const category = require("../controllers/categoryController");

router.get('/category', category.getAll);
router.post('/category', category.create);
router.put('/category/:id', category.update);
router.get('/category/:id', category.getOne);
router.delete('/category/:id', category.delete);

//Advance Routes
router.post("/category/create-with-subcategory", category.createWithSubcategory);

module.exports = router;