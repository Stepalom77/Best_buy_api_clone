const express = require('express');
const router = express.Router();
const purchase = require("../controllers/purchaseController");
const authMiddleware = require('../middlewares/authorizationMiddleware');

router.get('/purchase', purchase.getAll);
router.post('/purchase', purchase.create);
router.put('/purchase/:id',authMiddleware, purchase.update);
router.get('/purchase/:id', purchase.getOne);
router.delete('/purchase/:id',authMiddleware, purchase.delete);

module.exports = router;
