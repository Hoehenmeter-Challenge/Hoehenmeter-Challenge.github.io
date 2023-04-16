---
layout: page
title: Jörn
description: Wanderer
img: assets/img/7.jpg
importance: 3
category: work
---

Hallo, ich bin Jörn und nehme bei der 100.000 hm Challenge als Wanderer teil. Im Winter sind auch Skitouren dabei, die ich zu meinem Training dazu zähle. 

Es macht mir Spaß, in den Bergen zu sein und ich bin gespannt, wie viel Höhenmeeter ich pro Jahr schaffen kann.

<style>
  #image-container img {
    max-width: 300px;
    max-height: 300px;
  }
</style>

<div>
  <h1>Upload an Image</h1>
  <form>
    <label for="file">Select a file:</label>
    <input type="file" id="file" name="file" accept="image/*">
    <br>
    <button type="submit">Upload</button>
  </form>
  <div id="image-container">
  <!-- Placeholder for the uploaded image -->
</div>

<div id="image-container">
  <!-- Display the original image if available in local storage -->
  {% if localStorage.getItem('uploadedImage') %}
    <img src="{{ localStorage.getItem('uploadedImage') }}" alt="Uploaded Image">
  {% else %}
    <img src="{{ page.img }}" alt="Original Image">
  {% endif %}
</div>

<script>
  const form = document.querySelector('form');
  const imageContainer = document.getElementById('image-container');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting

    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.addEventListener('load', (event) => {
        // Create an <img> element and set its source to the uploaded file
        const img = document.createElement('img');
        img.src = event.target.result;
        img.alt = file.name;

        // Add the <img> element to the image container
        imageContainer.appendChild(img);
      });

      // Read the uploaded file as a data URL
      reader.readAsDataURL(file);
    }
  });
</script>

<script>
  const form = document.querySelector('form');
  const imageContainer = document.getElementById('image-container');

  // Check for a stored image on page load
  window.addEventListener('load', () => {
    if (localStorage.getItem('uploadedImage')) {
      const img = document.createElement('img');
      img.src = localStorage.getItem('uploadedImage');
      img.alt = 'Uploaded Image';
      imageContainer.appendChild(img);
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting

    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.addEventListener('load', (event) => {
        // Create an <img> element and set its source to the uploaded file
        const img = document.createElement('img');
        img.src = event.target.result;
        img.alt = file.name;

        // Add the <img> element to the image container
        imageContainer.appendChild(img);

        // Store the data URL in local storage
        localStorage.setItem('uploadedImage', event.target.result);
      });

      // Read the uploaded file as a data URL
      reader.readAsDataURL(file);
    }
  });
</script>

