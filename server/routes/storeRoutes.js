const express = require('express');
const router = express.Router();
const store = require("../controllers/storeController");

router.get('/store', store.getAll);
router.post('/store', store.create);
router.put('/store/:id', store.update);
router.get('/store/:id', store.getOne);
router.delete('/store/:id', store.delete);

//Advance Routes
router.post("/store/create-with-department", store.createWithDepartment);
router.post("/store/create-with-review-store", store.createWithReviewStore);

module.exports = router;