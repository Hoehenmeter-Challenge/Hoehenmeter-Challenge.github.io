---
layout: page
title: Mein Profil
permalink: /my_profile/
description:
nav: true
nav_order: 2
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
            <span>Aktuelle Höhenmeter: <span id="height-data"></span> hm</span>
        </p>

        <div id="error-message" class="error-banner" style="display: none;">
            Du bist nicht angemeldet. Bitte <a href="../login/">hier anmelden</a>, um auf deine Daten zuzugreifen oder mit einem neuen Account zu starten.
        </div>

        <button id="redirectToSettings" class="btn">Einstellungen</button>

        <div>
            <p>Deine Challenge:</p>
            <ul id="category-data" hidden></ul>

            <button class="category-button" id="category1Button" onclick="storeCategory('category1')">30.000 hm</button>
            <button class="category-button" id="category2Button" onclick="storeCategory('category2')">60.000 hm</button>
            <button class="category-button" id="category3Button" onclick="storeCategory('category3')">100.000 hm</button>
        </div>

        <br>

        <div id="collapse-buttons">
            <div class="collapse-container">
                <p>
                    <button class="btn btn-primary" onclick="openImageSelector()">Neuen Eintrag erstellen</button>
                </p>

                <div class="collapse" id="collapseSection" style="display:none;">
                    <!-- Remove the button for selecting a new image -->
                    <input id="photo" style="visibility:hidden;" type="file" onchange="previewImage()">
                    <img id="preview" style="display: none;">

                    <div class="input-container">
                        <textarea id="description" placeholder="Bergname / Tour"></textarea>
                        <input type="number" id="height" placeholder="Höhenmeter" />
                        <input type="date" id="date" placeholder="Datum" />
                    </div>

                    <div class="button-container">
                        <button id="upload" onclick="disableAndExecute()">Bild und hm hochladen</button>
                        <div id="status" style="display: none; color: green; font-weight: bold;">Erfolgreich gespeichert!</div>
                    </div>

                    <div id="loading" style="display: none;">
                        Eintrag wird gespeichert, bitte warten...
                    </div>

                </div>
            </div>
        </div>

        <p>Deine Bilder</p>

        <ul id="content-container"></ul>

        <!-- Firebase SDK -->
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-storage.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-database.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-auth.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"></script>

        <script type="module" src="../projects/js/firebase.js"></script>

        <script>
            // Get a reference to the button element
            const redirectButton = document.getElementById('redirectToSettings');
            // Add a click event listener to the button
            redirectButton.addEventListener('click', function() {
            // Redirect to the new webpage
            window.location.href = 'settings.html';
            });
        </script>

        <script>
            window.addEventListener("load", function() {
                getUserData();
                getUserData_only_one();
                showimage_my_profile();
            });
        </script>
    </body>
</html>