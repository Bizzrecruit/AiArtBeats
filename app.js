const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up static files (CSS, images)
app.use(express.static('public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Route to fetch and display Instagram posts
app.get('/', async (req, res) => {
    try {
        const accessToken = 'IGQWROaE9nOWczMG1EZAnE0NmJldUZAtdE52a3hXRUFmRjkxODdXcU5sa0pHNzA2dkx3TUdYdHg3S0VMUHVFSzlJODRYaW8wbzlBRUFTVjBQUGVhZAkJqRUQ5ZAHdZAa0NSQWpXb3pndWJPdlMydWNzR3ZARZAFdOMzlmaVUZD'; // Replace with your actual token
        const response = await axios.get(`https://graph.instagram.com/me/media?fields=media_type,media_url,thumbnail_url,caption&access_token=${accessToken}`);
        const posts = response.data.data;
        res.render('index', { posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
