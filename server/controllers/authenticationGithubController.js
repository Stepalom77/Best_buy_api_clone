require('dotenv').config();
const fetch = require('node-fetch');
const cookieSession = require('cookie-session');
const { request } = require('http');
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const cookie_secret = process.env.GITHUB_COOKIE_SECRET;

async function getAccessToken({ code, client_id, client_secret }) {
    const request = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code
      })
    });
    const text = await request.text();
    const params = new URLSearchParams(text);
    return params.get("access_token");
  };

  async function getGithubUser (token) {
    const request = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    return await request.json()
  }

module.exports = {
    getAccessToken: getAccessToken,
    getGithubUser: getGithubUser
};