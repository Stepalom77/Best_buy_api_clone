const express = require('express');
const router = express.Router();
const review = require("../controllers/reviewController");
const authMiddleware = require('../middlewares/authorizationMiddleware');

router.get('/review', review.getAll);
router.post('/review', review.create);
router.put('/review/:id',authMiddleware, review.update);
router.get('/review/:id', review.getOne);
router.delete('/review/:id',authMiddleware, review.delete);

module.exports = router;
