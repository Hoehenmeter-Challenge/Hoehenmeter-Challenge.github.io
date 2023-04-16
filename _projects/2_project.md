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

    try {
      const res = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const { imageUrl } = await res.json();
      img.src = imageUrl;
    } catch (err) {
      console.error(err);
    }
  });
</script>
