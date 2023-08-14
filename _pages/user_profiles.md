---
layout: about
title: Teilnehmer
permalink: /
subtitle: Wie viele Höhenmeter kannst du innerhalb von einem Jahr mit Trailrunning, Wandern und Skitouren sammeln?
news: False  # includes a list of news items
latest_posts: false  # includes a list of the newest posts
selected_papers: False # includes a list of papers marked as "selected={true}"
social: false  # includes social icons at the bottom of the page
---

<html>
    <head>
        <title>Firebase Image Upload using HTML and JavaScript</title>
        <link rel="stylesheet" type="text/css" href="../projects/css/style.css">
    </head>

    <script type="text/javascript" src="../projects/js/functions.js"></script>

    <body>
        <br>
        <div class="category-button-container">
            <button class="category-button" onclick="getUserDataFromStorage('All')">Alle anzeigen</button>
            <button class="category-button" onclick="getUserDataFromStorage('category1')">30.000 hm</button>
            <button class="category-button" onclick="getUserDataFromStorage('category2')">60.000 hm</button>
            <button class="category-button" onclick="getUserDataFromStorage('category3')">100.000 hm</button>
        </div>
        
        <br>

        <ul id="usernames-container"></ul>

        
        <!-- Firebase SDK -->
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-storage.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-database.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-auth.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"></script>

        <script type="module" src="../projects/js/firebase.js"></script>

        <script>
            window.addEventListener("load", function() {
                getUserDataFromStorage('All');
            });
        </script>
    </body>
</html>