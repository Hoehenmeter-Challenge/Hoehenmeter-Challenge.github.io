---
layout: page
title: Wenyi
description: Trailrunnerin
img: assets/img/Wenyi/1_Mountain.jpg
importance: 2
category: work
---

Hey, ich bin Wenyi und Trailrunnerin. In den Bergen gefällt mir die Natur und die Freiheit. Die 100.000 Höhenmeter Challenge gefällt mir, weil ich Motivation und Trainingstipps suche.

hi
hi
hi

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