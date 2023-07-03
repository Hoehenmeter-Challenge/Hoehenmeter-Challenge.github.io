---
layout: page
title: Mein Profil
permalink: /my_profile/
description: Mein Profil anschauen
nav: true
nav_order: 3
display_categories:
horizontal: false
---

<html>
    <head>
        <title>Firebase Image Upload using HTML and JavaScript</title>
        <link rel="stylesheet" type="text/css" href="../projects/css/style.css">
    </head>

    <script type="text/javascript" src="../projects/js/functions.js"></script>
    
    <body>

        <p>Willkommen <span id="username-placeholder"></span></p>
        <br>
        <p>Aktuelle Höhenmeter: <span id="height-data"></span> hm</p>
        <br>

        <p>
            <a class="btn btn-primary" data-toggle="collapse" href="#collapseSection" role="button" aria-expanded="false" aria-controls="collapseSection">
                Neues Eintrag erstellen
            </a>
        </p>

        <br>

        <div class="collapse" id="collapseSection">
            <label for="photo" class="btn">Neues Bild auswählen</label>
            <input id="photo" style="visibility:hidden;" type="file" onchange="previewImage()">

            <img id="preview"/>

            <div class="input-container">
                <textarea id="description" placeholder="Bergname, Datum und kurze Beschreibung"></textarea>
                <input type="number" id="height" placeholder="Höhenmeter eingeben"/>
            </div>

            <div class="button-container">
                <button id="upload" onclick="uploadImage();storeHeight()">Bild und hm hochladen</button>
            </div>
        </div>

        <p>Deine Bilder</p>

        <!-- Firebase SDK -->
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-storage.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-database.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-auth.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js"></script>
        <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css" />

        <script type="module" src="../projects/js/firebase.js"></script>

        <script>
            window.addEventListener("load", function() {
                showUserDetail();
                getHeightData();
                showimage_my_profile();
            });
        </script>
    </body>
</html>