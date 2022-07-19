const express = require('express');
const router = express.Router();
const subcategory = require("../controllers/subcategoryController");

router.get('/subcategory', subcategory.getAll);
router.post('/subcategory', subcategory.create);
router.put('/subcategory/:id', subcategory.update);
router.get('/subcategory/:id', subcategory.getOne);
router.delete('/subcategory/:id', subcategory.delete);

//Advance Routes
router.post("/subcategory/create-with-product", subcategory.createWithProduct);

module.exports = router;