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

<html>
    <head>
        <title>Firebase Image Upload using HTML and JavaScript</title>
        <link rel="stylesheet" type="text/css" href="../css/style.css">
    </head>

    <script type="text/javascript" src="../js/functions.js"></script>

    <body onload="updateHeights(); showimage('jörn images')">
        <script type="text/javascript">
            window.addEventListener("load", function() {
                showimage('jörn images');
            });
        </script>

        <!-- preview image -->
        <input type="file" id="photo" onchange="previewImage()"/><br>
        <img id="preview" src="" height="200" alt="Preview Image"/><br>

        <!-- upload image -->
        <button id="upload" onclick="uploadImage('jörn images')">Upload Image</button>
        <textarea id="description" placeholder="Enter image description"></textarea><br>

        <input type="number" id="height" placeholder="Enter height meters"/>
        <button id="store" onclick="storeHeight()">Store Height</button>
        <div id="heights"></div>

        <!--display uploaded image from firebase -->
        <!-- id is "img" or "image" -->
        <img id="img" src="" height="200"><br>
        <input type="button" value ="view Image" id="viewbtn" onclick="showimage('jörn images')">        

        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-storage.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-database.js"></script>
        <script type="module" src="../js/firebase.js"></script>
    </body>
</html>

