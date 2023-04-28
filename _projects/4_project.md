---
layout: page
title: leonii
description: another without an image
img:
importance: 4
category: fun
---

<!DOCTYPE html>
<html>
    <head>
        <title>Firebase Image Upload using HTML and JavaScript</title>
        <!--link rel="stylesheet" type="text/css" href="./style.css"-->
        <style>
            #photo{
                margin-top: 200px;
                margin-left: 450px;
            }
            #preview{
                margin-top: 20px;
                margin-left: 450px;
            }
            #upload{
                margin-top: 20px;
                margin-left: 450px;
            }
            #img{
                margin-top: 20px;
                margin-left: 450px;
            }
            #viewbtn{
                margin-top: 20px;
                margin-left: 450px;
            }
        </style>
    </head>

    <!--script type="text/javascript" src="./functions.js"></script-->
    <script>
        
        function uploadImage() {
            const storageRef = firebase.storage().ref("images");
            const file = document.querySelector("#photo").files[0];
            const name = +new Date() + "-" + file.name;
            const metadata = {
                contentType: file.type
            };
            const description = document.querySelector("#description").value;

            const uploadTask = storageRef.child(name).put(file, metadata);

            uploadTask.then(snapshot => {
                return snapshot.ref.getDownloadURL().then(url => {
                    const imageObject = {
                        imageUrl: url,
                        description: description
                    };
                    const dbRef = firebase.database().ref("images").push();
                    return dbRef.set(imageObject).then(() => {
                        console.log("Image uploaded successfully");
                        alert("Image uploaded successfully");
                        document.querySelector("#image").src = url;
                    });
                });
            }).catch(console.error);
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

        // chatgpt to integrate it into 100k hm format
        function showimage() {
            var databaseRef = firebase.database().ref("images");
            // Create a <div> element with class "row"
            var rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
        
            // Attach a listener to the database reference
            databaseRef.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // Get the description and image URL for each image
                var description = childSnapshot.child("description").val();
                var imageURL = childSnapshot.child("imageUrl").val();
        
                // Create a <div> element with class "col-sm"
                var colDiv = document.createElement("div");
                colDiv.classList.add("col-sm", "mt-3", "mt-md-0");
        
                // Create an <img> element to display the image
                var img = document.createElement("img");
                img.src = imageURL;
                img.height = 200;
                img.classList.add("img-fluid", "rounded", "z-depth-1");
                img.setAttribute("alt", description);
        
                // Create a <p> element to display the description
                var descriptionEl = document.createElement("p");
                descriptionEl.innerText = description;
        
                // Create a <div> element with class "figure" and append the <img> and <p> elements to it
                var figureDiv = document.createElement("div");
                figureDiv.classList.add("figure");
                figureDiv.appendChild(img);
                figureDiv.appendChild(descriptionEl);
        
                // Append the <div> element with class "figure" to the <div> element with class "col-sm"
                colDiv.appendChild(figureDiv);
        
                // Append the <div> element with class "col-sm" to the <div> element with class "row"
                rowDiv.appendChild(colDiv);
            });
        
            // Append the <div> element with class "row" to the body of the HTML document
            document.body.appendChild(rowDiv);
        
            // Create a <div> element with class "caption" and add the caption text
            var captionDiv = document.createElement("div");
            captionDiv.classList.add("caption");
            captionDiv.innerText = "Caption photos easily.";
        
            // Append the <div> element with class "caption" to the body of the HTML document
            document.body.appendChild(captionDiv);
            });
        }
        

        const errorMsgElement = document.querySelector('span#errorMsg');
    </script>

    <body onload="showimage()">
        <!-- To integrate the index.js file, set the base href="." -->
        <base href=".">

        <!-- preview image -->
        <input type="file" id="photo" onchange="previewImage()"/><br>
        <img id="preview" src="" height="200" alt="Preview Image"/><br>

        <!-- upload image -->
        <button id="upload" onclick="uploadImage()">Upload Image</button>
        <textarea id="description" placeholder="Enter image description"></textarea><br>

        <!--display uploaded image from firebase -->
        <!-- id is "img" or "image" -->
        <img id="img" src="" height="200"><br>
        <input type="button" value ="view Image" id="viewbtn" onclick="showimage()";>
        <!--input type="button" value ="view Image" id="viewbtn" onclick="showDescriptions()";-->
        

        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-storage.js"></script>
        <script type="module" src="https://www.gstatic.com/firebasejs/7.7.0/firebase-database.js"></script>
        <!--script type="module" src="./index.js"></script-->
        <script>
            const firebaseConfig = {
                apiKey: "AIzaSyCvIAgaWEP4jef2skPJdPMZffXj5vdNDbc",
                authDomain: "k-hm-challenge-usa.firebaseapp.com",
                databaseURL: "https://k-hm-challenge-usa-default-rtdb.firebaseio.com",
                projectId: "k-hm-challenge-usa",
                storageBucket: "k-hm-challenge-usa.appspot.com",
                messagingSenderId: "215394595845",
                appId: "1:215394595845:web:a177f327ab9bac545d986c",
                measurementId: "G-EXXF6NS1XZ"
            }

            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            console.log(firebase);
        </script>
    </body>
</html>

