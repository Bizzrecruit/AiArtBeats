const express = require('express');
const axios = require('axios');
require('dotenv').config();
const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

const express = require('express');
const axios = require('axios');
const security = require('./security'); // Import the security module

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
const encryptedAccessToken = process.env.INSTAGRAM_ENCRYPTED_TOKEN; // Encrypted token

// ...

app.get('/', async (req, res) => {
    try {
        const accessToken = security.decryptToken(encryptedAccessToken); // Decrypt the token
        const response = await axios.get(`https://graph.instagram.com/me/media?fields=media_type,media_url,thumbnail_url,caption&access_token=${accessToken}`);
        const posts = response.data.data;
        res.render('index', { posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// ...
