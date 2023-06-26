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

    <body onload="updateHeights(); showimage_my_profile()">
        <script type="text/javascript">
            window.addEventListener("load", function() {
                showimage_my_profile();
                storeHeight();
            });
        </script>
        
        <button id="show User info" onclick="showUserDetail()" style="width: 200px; height: 50px;">Show user info</button>
        <p>Welcome <span id="username-placeholder"></span> with username <span id="userId-placeholder"></span></p>
        <div id="heights"></div>

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

        <button id="show images" onclick="showimage_my_profile()" style="width: 200px; height: 50px;">Show images</button>
        
        <!-- Firebase SDK -->
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-storage.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-database.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-auth.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js"></script>
        <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css" />

        <script type="module" src="../projects/js/firebase.js"></script>
    </body>
</html>