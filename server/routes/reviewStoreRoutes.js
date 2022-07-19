const express = require('express');
const router = express.Router();
const review_store = require("../controllers/reviewStoreController");

router.get('/review-store', review_store.getAll);
router.post('/review-store', review_store.create);
router.put('/review-store/:id', review_store.update);
router.get('/review-store/:id', review_store.getOne);
router.delete('/review-store/:id', review_store.delete);

module.exports = router;