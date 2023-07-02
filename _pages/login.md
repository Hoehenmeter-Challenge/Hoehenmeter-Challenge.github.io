---
layout: page
title: Login
permalink: /login/
description: Login or Register
nav: true
nav_order: 5
display_categories:
horizontal: false
---

<script type="text/javascript" src="../projects/js/functions.js"></script>
<div class="container">
    <!--div id="firebaseui-auth-container" style="float: left; width: 200px; height: 400px;"></div-->
    <div id="firebaseui-auth-container"></div>
</div>

<style>
  .container {
    width: 100%; /* Adjust the width as needed */
    margin: 0 auto; /* Center the container horizontally */
    display: flex;
    align-items: center;
  }

  .firebaseui-auth-container{

  }

  .store-user-info-button {
    /* Add styles for the button */
    /* margin-left: 10px; */ /* Adjust the spacing between the container and the button */
  }
</style>

<!-- Sign out -->
<button id="sign-out-btn" onclick="signOut()" style="width: 200px; height: 50px;">Ausloggen</button>

<!-- Remove account -->
<button id="remove-account-btn" onclick="removeAccount()" style="width: 200px; height: 50px;">Account löschen</button>

<!-- Include necessary JavaScript files -->

<script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
<script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-storage.js"></script>
<script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-database.js"></script>
<script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-auth.js"></script>
<script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"></script>
<script type="module" src="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js"></script>
<link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css" />
<script type="module" src="../projects/js/firebase.js"></script>
