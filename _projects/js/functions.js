function showUserDetail() {
  var user = firebase.auth().currentUser;
  if (user) {
    // User is signed in, retrieve the user ID and username
    var userId = user.uid;
    var username = user.displayName;

    // Display the user ID and username on the website
    document.getElementById('userId-placeholder').textContent = userId;
    document.getElementById('username-placeholder').textContent = username;
  } else {
    // User is not signed in, show the sign-in UI
    ui.start('#firebaseui-auth-container', uiConfig);
  }
}


function storeUserInformation() {
  var user = firebase.auth().currentUser;
  if (user) {
    // User is signed in, retrieve the user ID and username
    var userId = user.uid;
    var username = user.displayName;

    // Access Firestore and create a reference to the users collection
    var db = firebase.firestore();
    var usersCollection = db.collection('users');

    // Create a new document in the users collection using the user ID
    var userDoc = usersCollection.doc(userId);

    // Set the username as a field in the document
    userDoc.set({
      username: username,
      userId: userId
    })
    .then(function() {
      console.log("User information stored successfully");
    })
    .catch(function(error) {
      console.error("Error storing user information: ", error);
    });
  } else {
    // User is not signed in, show the sign-in UI
    ui.start('#firebaseui-auth-container', uiConfig);
  }
}


function getUsernamesFromStorage() {
  // Access Firestore and create a reference to the users collection
  var db = firebase.firestore();
  var usersCollection = db.collection('users');

  // Get all documents from the users collection
  usersCollection.get()
    .then(function(querySnapshot) {
      // Iterate over each document
      querySnapshot.forEach(function(doc) {
        // Get the username from the document data
        var username = doc.data().username;
        var userId = doc.data().userId;

        // Create a new div element for displaying the username
        var usernameBox = document.createElement('div');
        usernameBox.textContent = username;
        usernameBox.classList.add('user-box'); 

        // Add an event listener to the username box
        usernameBox.addEventListener('click', function() {
          // Store the userId in localStorage
          localStorage.setItem('userId', userId);

          // Redirect to the new webpage without query parameters
          window.location.href = 'show_user.html';
          //window.location.href = 'show_user.html?userId=' + userId;
        });

        // Append the username box to the webpage
        document.getElementById('usernames-container').appendChild(usernameBox);
      });
    })
    .catch(function(error) {
      console.error("Error retrieving usernames: ", error);
    });
}



function uploadImage() {
    var userId = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref(userId);
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
            const dbRef = firebase.database().ref(userId).push();
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


var displayedImageURLs = [];
function showimage_my_profile() {
    var userId = firebase.auth().currentUser.uid;
    var databaseRef = firebase.database().ref(userId);
    // Create a <div> element with class "row"
    var rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    // Initialize a counter variable to keep track of the number of images displayed
    var counter = 0;

    // Attach a listener to the database reference
    databaseRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            // Get the description and image URL for each image
            var description = childSnapshot.child("description").val();
            var imageURL = childSnapshot.child("imageUrl").val();

            // Check if the image has already been displayed
            if (displayedImageURLs.indexOf(imageURL) === -1) {
                // Add the image URL to the displayedImageURLs array
                displayedImageURLs.push(imageURL);

                // Create a <div> element with class "col-sm"
                var colDiv = document.createElement("div");
                colDiv.classList.add("col-sm", "mt-3", "mt-md-0");

                // Create an <img> element to display the image
                var img = document.createElement("img");
                img.src = imageURL;
                img.height = 400;
                img.width = 400;
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
                descriptionEl.classList.add("text-center");

                // Append the <div> element with class "figure" to the <div> element with class "col-sm"
                colDiv.appendChild(figureDiv);

                // Append the <div> element with class "col-sm" to the <div> element with class "row"
                rowDiv.appendChild(colDiv);

                // Increment the counter variable
                counter++;

                // Check if the counter is equal to 3
                if (counter === 3) {
                    // Reset the counter variable
                    counter = 0;
                    // Append the <div> element with class "row" to the body of the HTML document
                    document.body.appendChild(rowDiv);
                    // Create a new <div> element with class "row"
                    rowDiv = document.createElement("div");
                    rowDiv.classList.add("row");
                }
            }
        });

        // Append the <div> element with class "row" to the body of the HTML document
        document.body.appendChild(rowDiv);

        // Create a <div> element with class "caption" and add the caption text
        var captionDiv = document.createElement("div");
        captionDiv.classList.add("caption");
        //captionDiv.innerText = "Caption photos easily.";

        // Append the <div> element with class "caption" to the body of the HTML document
        document.body.appendChild(captionDiv);
    });
}


var displayedImageURLs = [];
function showImage_user_profiles(userId) {
    var databaseRef = firebase.database().ref(userId);
    // Create a <div> element with class "row"
    var rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    // Initialize a counter variable to keep track of the number of images displayed
    var counter = 0;

    // Attach a listener to the database reference
    databaseRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            // Get the description and image URL for each image
            var description = childSnapshot.child("description").val();
            var imageURL = childSnapshot.child("imageUrl").val();

            // Check if the image has already been displayed
            if (displayedImageURLs.indexOf(imageURL) === -1) {
                // Add the image URL to the displayedImageURLs array
                displayedImageURLs.push(imageURL);

                // Create a <div> element with class "col-sm"
                var colDiv = document.createElement("div");
                colDiv.classList.add("col-sm", "mt-3", "mt-md-0");

                // Create an <img> element to display the image
                var img = document.createElement("img");
                img.src = imageURL;
                img.height = 400;
                img.width = 400;
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
                descriptionEl.classList.add("text-center");

                // Append the <div> element with class "figure" to the <div> element with class "col-sm"
                colDiv.appendChild(figureDiv);

                // Append the <div> element with class "col-sm" to the <div> element with class "row"
                rowDiv.appendChild(colDiv);

                // Increment the counter variable
                counter++;

                // Check if the counter is equal to 3
                if (counter === 3) {
                    // Reset the counter variable
                    counter = 0;
                    // Append the <div> element with class "row" to the body of the HTML document
                    document.body.appendChild(rowDiv);
                    // Create a new <div> element with class "row"
                    rowDiv = document.createElement("div");
                    rowDiv.classList.add("row");
                }
            }
        });

        // Append the <div> element with class "row" to the body of the HTML document
        document.body.appendChild(rowDiv);

        // Create a <div> element with class "caption" and add the caption text
        var captionDiv = document.createElement("div");
        captionDiv.classList.add("caption");
        //captionDiv.innerText = "Caption photos easily.";

        // Append the <div> element with class "caption" to the body of the HTML document
        document.body.appendChild(captionDiv);
    });
}


function updateHeights(snapshot) {
  var totalHeight = 0;
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    var height = parseInt(childData.height);
    if (!isNaN(height)) {
      totalHeight += height;
    }
  });
  document.getElementById("heights").innerHTML = "Total height: " + totalHeight + " m";
}


function storeHeight() {
  var height = document.getElementById("height").value;
  firebase.database().ref().push({
    height: height
  }, function(error) {
    if (error) {
      console.log("Error storing height: " + error);
    } else {
      console.log("Height stored successfully");
      firebase.database().ref().once('value', function(snapshot) {
        updateHeights(snapshot);
      });
    }
  });
}


function removeAccount(){
  var user = firebase.auth().currentUser;

  // Prompt the user to confirm the account removal
  var confirmDelete = confirm("Bist du sicher, dass du den Account löschen willst? Diese Aktion kann nicht rückgängig gemacht werden.");

  if (confirmDelete) {
    // Delete the user account
    user.delete().then(function() {
      alert("Account erfolgreich gelöscht")
      // Account removal successful.
      // You can redirect the user to a different page or update the UI as needed.
    }).catch(function(error) {
      // An error happened during account removal.
      console.log(error);
    });
  }
}

function signOut(){
  // Add event listener to the sign-out button
  firebase.auth().signOut().then(function() {
    alert("Ausgeloggt")
    // Sign-out successful.
    // You can redirect the user to a different page or update the UI as needed.
  }).catch(function(error) {
    // An error happened during sign-out.
    console.log(error);
  });
}

const errorMsgElement = document.querySelector('span#errorMsg');