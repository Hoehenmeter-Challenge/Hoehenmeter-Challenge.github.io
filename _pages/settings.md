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
    <div id="content" style="display: none;">
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
            <div class="collapse-container">
                <div class="collapse" id="profilbildSection">
                    <label for="profilePicture" class="btn">Neues Profilbild auswählen</label>
                    <input id="profilePicture" style="visibility:hidden;" type="file" onchange="previewImage_profile()">
                    <img id="preview_profilePicture" style="display: none;">
                    <br>
                    <button id="profilePicture_upload" onclick="uploadProfImage()">Update Profilbild</button>
                </div>
            </div>
        </div>

        <div id="error-message" class="error-banner" style="display: none;">
            Du bist nicht angemeldet. Bitte <a href="../login/">hier anmelden</a>, um auf deine Daten zuzugreifen oder mit einem neuen Account zu starten.
        </div>

        <!-- Firebase SDK -->
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-storage.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-database.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-auth.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"></script>

        <script type="module" src="../projects/js/firebase.js"></script>

        <script>
            window.addEventListener("load", function() {
                getUserData();
            });
        </script>
    </div>
    </body>
</html>