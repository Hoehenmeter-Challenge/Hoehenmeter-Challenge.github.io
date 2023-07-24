---
layout: page
title: Einstellungen
permalink: /my_profile/settings
description:
nav: false
nav_order:
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

        <p class="user-info-container">
            <span id="welcome-text">Willkommen <span id="username-placeholder"></span></span>
            <ul id="height-data" hidden></ul>
        </p>

        <div>
            <p>Deine aktuell gewählte Challenge:</p>
            <ul id="category-data" hidden></ul>

            <button class="category-button" id="category1Button" onclick="storeCategory('category1')">30.000 hm</button>
            <button class="category-button" id="category2Button" onclick="storeCategory('category2')">60.000 hm</button>
            <button class="category-button" id="category3Button" onclick="storeCategory('category3')">100.000 hm</button>
        </div>

        <br>
        <div id="collapse-buttons">
            <p>
                <a class="btn btn-primary" data-toggle="collapse" href="#profilbildSection" role="button" aria-expanded="false" aria-controls="profilbildSection">
                    Neues Profilbild
                </a>
            </p>

            <div class="collapse" id="profilbildSection">
                <h3>Neues Profilbild</h3>
                <label for="profilePicture" class="btn">Neues Bild auswählen</label>
                <input id="profilePicture" style="visibility:hidden;" type="file" onchange="previewImage_profile()">
                <img id="preview_profilePicture" style="display: none;">
                <button id="profilePicture_upload" onclick="uploadProfImage()">Update Profilbild</button>
            </div>
        </div>


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
                getUserData();
            });
        </script>
    </body>
</html>