require('dotenv').config()
const express = require('express');
const router = express.Router();
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const authGithub = require("../controllers/authenticationGithubController");

router.get("/login/github/callback", async (req, res) => {
    const code = req.query.code;
    const token = await authGithub.getAccessToken({ code, client_id, client_secret });
    const githubData = await authGithub.getGithubUser(token)
    res.json(githubData);
})

module.exports = router;