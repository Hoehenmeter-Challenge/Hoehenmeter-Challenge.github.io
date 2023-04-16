---
layout: page
title: Tim
description: Trailrunner
img: assets/img/Tim/prof_pic.jpg
importance: 1
category: work
---


Hi, ich bin Tim. Ich wohne in Weilheim und München. Meine Trainings mache ich oft in Garmisch und in Gebieten rund um den Kochelsee.

Ich mache bei der 100.000 Höhenmeter Challenge mit, um fitter zu werden. Letztes Jahr habe ich 87.000 Höhenmeter geschafft.

Meine Höhenmeter mache ich zum größten Teil mit Trailrunning. Schau dir meine Etappen auf dem Weg zum Ziel an!

<form id="image-upload-form">
  <input type="file" id="image-upload-input">
  <button type="submit">Upload</button>
</form>

<img id="uploaded-image">

<p>
  <a class="btn btn-primary" data-toggle="collapse" href="#collapseJanuar" role="button" aria-expanded="false" aria-controls="collapseJanuar">
    Januar
  </a>
</p>
<div class="collapse" id="collapseJanuar">
    <div class="row">
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.html path="assets/img/Tim/1_Mountain.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
            <div class="caption">
            01.01.23, Hörnle, 670 hm.
            </div>
        </div>
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.html path="assets/img/Tim/2_Mountain.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
            <div class="caption">
            07.01.23, Wank, 1000 hm.
            </div>
        </div>
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.html path="assets/img/Tim/3_Mountain.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
            <div class="caption">
            12.01.23, Kreuzeckhaus, 900 hm.
            </div>
        </div>
    </div>
</div>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/Tim/5_Mountain.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    20.01.23, Osterfelderkopf, 1300 hm.
</div>

Das war mein Trailrunning Training im Januar. Die geplanten Höhenmeter habe ich nicht ganz geschafft. Im Februar wird es bestimmt besser!


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/Tim/7_Mountain.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/Tim/8_Mountain.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>


<script>
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
</script>


