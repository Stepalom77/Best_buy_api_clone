const express = require('express');
const router = express.Router();
const product = require("../controllers/productController");

router.get('/product', product.getAll);
router.post('/product', product.create);
router.put('/product/:id', product.update);
router.get('/product/:id', product.getOne);
router.delete('/product/:id', product.delete);

//Advance Routes
router.post("/product/create-with-review", product.createWithReview);
router.post("/product/create-with-purchase", product.createWithPurchase);

module.exports = router;