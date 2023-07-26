---
layout: page
title: Teilnehmer Profil
permalink: /show_user
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
        <script>
            // Retrieve the userId from localStorage
            var userId = localStorage.getItem('userId');
        </script>

        <p class="user-info-container">
            <span>Profil von: <span id="username-placeholder-all"></span></span>
            <span>Aktuelle Höhenmeter: <span id="height-data"></span> hm</span>
        </p>

        <br>

        <ul id="content-container"></ul>
        
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
                getHeightData_user_profile(userId);
                showImage_user_profile(userId);
            });
        </script>
    </body>
</html>