const express = require('express');
const router = express.Router();
const review = require("../controllers/reviewController");

router.get('/review', review.getAll);
router.post('/review', review.create);
router.put('/review/:id', review.update);
router.get('/review/:id', review.getOne);
router.delete('/review/:id', review.delete);

module.exports = router;