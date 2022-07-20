require('dotenv').config()
const express = require('express');
const router = express.Router();

router.get('/auth/github', (req, res) => {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    )
})

module.exports = router;