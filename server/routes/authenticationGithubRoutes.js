require('dotenv').config()
const express = require('express');
const router = express.Router();
const authGithub = require("../controllers/authenticationGithubController");

router.get('/login/github/callback', async (req, res) => {
    const code = req.query.code;
    const token = await authGithub.getAccessToken(code);
    res.json({token})
})

module.exports = router;