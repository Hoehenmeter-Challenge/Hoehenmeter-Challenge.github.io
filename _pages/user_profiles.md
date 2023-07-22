---
layout: page
title: Teilnehmer
permalink: /user_profiles/
description: Alle Teilnehmer
nav: true
nav_order: 4
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

        <button class="category-button" onclick="getUserDataFromStorage('All')">Alle anzeigen</button>
        <button class="category-button" onclick="getUserDataFromStorage('category1')">30.000 hm</button>
        <button class="category-button" onclick="getUserDataFromStorage('category2')">60.000 hm</button>
        <button class="category-button" onclick="getUserDataFromStorage('category3')">100.000 hm</button>

        <ul id="usernames-container"></ul>

        
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
                getUserDataFromStorage('All');
            });
        </script>
    </body>
</html>