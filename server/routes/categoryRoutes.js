const express = require('express');
const router = express.Router();
const category = require("../controllers/categoryController");
const authMiddleware = require('../middlewares/authorizationMiddleware');

router.get('/category', category.getAll);
router.post('/category', category.create);
router.put('/category/:id',authMiddleware, category.update);
router.get('/category/:id', category.getOne);
router.delete('/category/:id',authMiddleware, category.delete);

//Advance Routes
router.post("/category/create-with-subcategory", category.createWithSubcategory);

module.exports = router;
