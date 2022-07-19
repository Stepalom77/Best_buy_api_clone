const express = require('express');
const router = express.Router();
const user = require("../controllers/userController");

router.get('/user', user.getAll);
router.post('/user', user.create);
router.put('/user/:id', user.update);
router.get('/user/:id', user.getOne);
router.delete('/user/:id', user.delete);

//Advance Routes
router.post("/user/create-with-review", user.createWithReview);
router.post("/user/create-with-purchase", user.createWithPurchase);
router.post("/user/create-with-review-store", user.createWithReviewStore);

module.exports = router;