---
layout: page
title: leoni
description: Wanderin
img:
importance: 4
category: fun
---

<html>
    <head>
        <title>Firebase Image Upload using HTML and JavaScript</title>
        <link rel="stylesheet" type="text/css" href="../css/style.css">
    </head>

    <script type="text/javascript" src="../js/functions.js"></script>

    <body onload="updateHeights(); showimage('tim images')">
        <script type="text/javascript">
            window.addEventListener("load", function() {
                showimage('tim images');
                storeHeight()
            });
        </script>

        <div id="heights"></div>

        <label for="photo" class="btn">Neues Bild auswählen</label>
        <input id="photo" style="visibility:hidden;" type="file" onchange="previewImage()">

        <img id="preview"/>

        <div class="input-container">
            <textarea id="description" placeholder="Bergname, Datum und kurze Beschreibung"></textarea>
            <input type="number" id="height" placeholder="Höhenmeter eingeben"/>
        </div>

        <div class="button-container">
            <button id="upload" onclick="uploadImage('tim images');storeHeight()">Bild und hm hochladen</button>
        </div>
        

        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-storage.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-database.js"></script>
        <script type="module" src="../js/firebase.js"></script>
    </body>
</html>

