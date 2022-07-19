const express = require('express');
const router = express.Router();
const purchase = require("../controllers/purchaseController");

router.get('/purchase', purchase.getAll);
router.post('/purchase', purchase.create);
router.put('/purchase/:id', purchase.update);
router.get('/purchase/:id', purchase.getOne);
router.delete('/purchase/:id', purchase.delete);

module.exports = router;