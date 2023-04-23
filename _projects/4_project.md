---
layout: page
title: leonii
description: another without an image
img:
importance: 3
category: fun
---

<!DOCTYPE html>
<html>
    <head>
        <title>Firebase Image Upload using HTML and JavaScript</title>
        <style>
            #photo{
                margin-top: 200px;
                margin-left: 450px;
            }
            #upload{
                margin-top: 20px;
                margin-left: 450px;
            }
            #preview{
                margin-top: 20px;
                margin-left: 450px;
            }
            #img{
                margin-top: 20px;
                margin-left: 450px;
            }
        </style>
    </head>

    <script>
        function uploadImage() {
            const ref = firebase.storage().ref();
            const file = document.querySelector("#photo").files[0];
            const name = +new Date() + "-" + file.name;
            const metadata = {
                contentType: file.type
            };
            const task = ref.child(name).put(file, metadata);task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
            console.log(url);
            alert('image uploaded successfully');
            document.querySelector("#image").src = url;
        })
        .catch(console.error);
        }
        function previewImage() {
            const preview = document.querySelector('#preview');
            const file = document.querySelector("#photo").files[0];
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                // convert image file to data URL
                preview.src = reader.result;
            }, false);
            if (file) {
                reader.readAsDataURL(file);
            }
        }
        function showimage() {
            var storageRef = firebase.storage().ref();
            var spaceRef = storageRef.child("1682152240360-3_Mountain.jpg");
            storageRef.child("1682152240360-3_Mountain.jpg").getDownloadURL().then(function(url) {
                var test = url;
                alert(url);
                document.querySelector('#img').src = test;
            }).catch(function(error) {
            });
            }
        const errorMsgElement = document.querySelector('span#errorMsg');
    </script>

    <body>
        <!-- preview image -->
        <input type="file" id="photo" onchange="previewImage()"/><br>
        <img id="preview" src="" height="200" alt="Preview Image"/><br>
        <!-- upload image -->
        <button id="upload" onclick="uploadImage()">Upload Image</button>

        <display uploaded image from firebase >
        <img id="img" src="" height="200"><br>
        <input type="button" value ="view Image" id="viewbtn" onclick="showimage();">
        

        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-storage.js"></script>
        <script type="module">
            const firebaseConfig = {
                apiKey: "AIzaSyCqzhsxeL6Ne7R7ira1adqXgfXjUL4o-sk",
                authDomain: "k-hm-challenge.firebaseapp.com",
                projectId: "k-hm-challenge",
                storageBucket: "k-hm-challenge.appspot.com",
                messagingSenderId: "306851410400",
                appId: "1:306851410400:web:1a18994ea064698431fb85",
                measurementId: "G-Z3YGJV4N3X"
                };

            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            console.log(firebase);
        </script>
            
    </body>
</html>

