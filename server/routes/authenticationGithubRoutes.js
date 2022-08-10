require('dotenv').config()
const express = require('express');
const router = express.Router();
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const authGithub = require("../controllers/authenticationGithubController");

router.get("/login/github/callback", async (req, res) => {
    const code = req.query.code;
    const access_token = await authGithub.getAccessToken({ code, client_id, client_secret });
    const userGithub = await authGithub.getGithubUser(access_token);
    if(userGithub) {
      req.session.access_token = access_token;
      req.session.githubId = userGithub.id
      res.redirect('/api/v1/user')
    } else {
      res.send('Login error');
    }
});

router.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

module.exports = router;