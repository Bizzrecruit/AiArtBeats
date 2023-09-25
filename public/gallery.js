document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.image-gallery');

  // Function to handle lazy loading of images
  const lazyLoad = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.onload = () => {
          img.removeAttribute('data-src');
          observer.unobserve(img);
        };
      }
    });
  };

  // Intersection Observer options
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1, // Adjust as needed
  };

  // Create an Intersection Observer instance
  const observer = new IntersectionObserver(lazyLoad, options);

  // Fetch a list of images from the "/images" route
  fetch('/images') // Modify the URL to match your server route for fetching images
    .then((response) => response.json())
    .then((data) => {
      data.forEach((image) => {
        const imgElement = document.createElement('img');
        imgElement.classList.add('image-thumbnail');
        imgElement.dataset.src = `/images/${image}`;
        gallery.appendChild(imgElement);
        observer.observe(imgElement); // Observe each image for visibility
      });
    })
    .catch((error) => {
      console.error('Error fetching images:', error);
    });
});
