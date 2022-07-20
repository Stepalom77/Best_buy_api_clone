require('dotenv').config();
const fetch = require('node-fetch');
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;

const getAccessToken = async (code) => {
    const res = await fetch('https://github.com/login/oauth/access_token', {
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
    const data = await res.text();
    const params = new URLSearchParams(data);
    return params.get('access_token');
};

module.exports = {
    getAccessToken: getAccessToken
};