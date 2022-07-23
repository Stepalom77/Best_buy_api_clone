const express = require('express');
const router = express.Router();
const user = require("../controllers/userController");
const loginUser = require('../controllers/userLoginController');
const authMiddleware = require('../middlewares/authorizationMiddleware');

router.post('/auth-user', loginUser.login);
router.get('/user', user.getAll);
router.post('/user', user.create);
router.put('/user/:id',authMiddleware, user.update);
router.get('/user/:id', user.getOne);
router.delete('/user/:id',authMiddleware, user.delete);

//Advance Routes
router.post("/user/create-with-review", user.createWithReview);
router.post("/user/create-with-purchase", user.createWithPurchase);
router.post("/user/create-with-review-store", user.createWithReviewStore);

module.exports = router;
