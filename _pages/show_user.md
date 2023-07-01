---
layout: page
title: Anderes Profil anzeigen
permalink: /user_profiles/show_user
description: Anderes Profil anschauen
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

        <span id="height-data"></span> meters

        <br>
        
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