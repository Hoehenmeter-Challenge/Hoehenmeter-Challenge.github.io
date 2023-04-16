---
layout: page
title: Wenyi
description: Trailrunnerin
img: assets/img/Wenyi/1_Mountain.jpg
importance: 2
category: work
---

Hey, ich bin Wenyi und Trailrunnerin. In den Bergen gefällt mir die Natur und die Freiheit. Die 100.000 Höhenmeter Challenge gefällt mir, weil ich Motivation und Trainingstipps suche.


<form id="image-upload-form">
  <input type="file" id="image-upload-input">
  <button type="submit">Upload</button>
</form>

<div>
    Here is the uploaded image:
    <img id="uploaded-image">
</div>

<script>
  const form = document.querySelector('#image-upload-form');
  const input = document.querySelector('#image-upload-input');
  const img = document.querySelector('#uploaded-image');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = input.files[0];
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/upload', {
        method: 'POST',
        body: formData,
        });

        if (res.ok) {
        const contentType = res.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            try {
            const jsonData = await res.json();
            img.src = jsonData.imageUrl;
            } catch (e) {
            console.error(`Error parsing response as JSON: ${e}`);
            // handle the error appropriately
            }
        } else {
            console.error(`Unexpected response Content-Type: ${contentType}`);
            // handle the error appropriately
        }
        } else {
        console.error(`Error response from server: ${res.status} ${res.statusText}`);
        // handle the error appropriately
        }
    });
</script>


<!--script>
  const form = document.getElementById('image-upload-form');
  const input = document.getElementById('image-upload-input');
  const uploadedImage = document.getElementById('uploaded-image');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', input.files[0]);
    fetch('/upload', {
        method: 'POST',
        body: formData
        }).then(response => {
        // handle the response from the server
        if(response.ok) {
            return response.json(); // assuming the server returns JSON
        } else {
            throw new Error('Upload failed');
        }
        }).then(data => {
        // handle the response data
        const imgUrl = data.url; // assuming the server returns the image URL
        const uploadedImage = document.getElementById('uploaded-image');
        uploadedImage.src = imgUrl;
        }).catch(error => {
        // handle any errors that occur during the upload
        console.error(error);
        });
  });
</script-->