require('dotenv').config()
const express = require('express');
const router = express.Router();

router.get('/login/github', (req, res) => {
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=http://localhost:2000/login/github/callback`
    res.redirect(url)
})

module.exports = router;