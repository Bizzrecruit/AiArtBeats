const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));


// Define a route to retrieve a list of images from the "public/images" folder
app.get('/images', (req, res) => {
  const fs = require('fs');
  const imageFolder = './public/images'; // Replace with your folder path

  fs.readdir(imageFolder, (err, files) => {
    if (err) {
      console.error('Error reading images:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const imageList = files.filter((file) => {
        // Filter to include only image files (e.g., jpg, png, etc.)
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
      });
      res.json(imageList);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
