const express = require('express');
const router = express.Router();
const subcategory = require("../controllers/subcategoryController");
const authMiddleware = require('../middlewares/authorizationMiddleware');

router.get('/subcategory', subcategory.getAll);
router.post('/subcategory', subcategory.create);
router.put('/subcategory/:id',authMiddleware, subcategory.update);
router.get('/subcategory/:id', subcategory.getOne);
router.delete('/subcategory/:id',authMiddleware, subcategory.delete);

//Advance Routes
router.post("/subcategory/create-with-product", subcategory.createWithProduct);

module.exports = router;
