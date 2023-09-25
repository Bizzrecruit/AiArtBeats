const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

// Define a route to retrieve a list of images from the "public/images" folder
app.get('/images', (req, res) => {
  // Use the 'fs' module to read the list of images from the folder
  const fs = require('fs');
  const imageFolder = 'public/images'; // Replace with your folder path

  fs.readdir(imageFolder, (err, files) => {
    if (err) {
      console.error('Error reading images:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(files);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
