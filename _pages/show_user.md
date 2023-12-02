---
layout: page
title: Teilnehmer Profil
permalink: /show_user/
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
        <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js" type="text/javascript"></script>
        <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
        <!-- Essential JS 2 stylesheets -->
        <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/material.css" />
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
        <span>Start-Datum: <span id="earliest-date-container-user"></span></span>
        <br>
        <div id="charts-container" style="display: flex;">
            <div id="days-pie-chart" style="width: 300px; height: 300px;"></div>
            <div id="height-pie-chart" style="width: 300px; height: 300px;"></div>
        </div>

        <br>

        <ul id="content-container"></ul>
        
        <!-- Firebase SDK -->
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-storage.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-database.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-auth.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"></script>

        <script type="module" src="../projects/js/firebase.js"></script>

        <script>
            window.addEventListener("load", function() {
                getHeightData_user_profile(userId);
                showImage_user_profile(userId);
                displayEarliestDateUser(userId);
                displayDaysPassedLeftUser(userId);
                displayHeightPieChartUser(userId);
            });
        </script>
    </body>
</html>