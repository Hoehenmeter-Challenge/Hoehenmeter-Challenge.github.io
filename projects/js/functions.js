function showUserDetail() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var user = firebase.auth().currentUser;
      // User is signed in, retrieve the user ID and username
      var userId = user.uid;
      var username = user.displayName;

      // Display the user ID and username on the website
      document.getElementById('userId-placeholder').textContent = userId;
      document.getElementById('username-placeholder').textContent = username;
    // ...
    } else {
      // User is signed out
      // ...
    }
  });
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
    //ui.start('#firebaseui-auth-container', uiConfig);
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

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var user = firebase.auth().currentUser;
      // User is signed in, retrieve the user ID and username
      var userId = user.uid;
      var username = user.displayName;

      var databaseRef = firebase.database().ref(userId);
      // Create a <div> element with class "row"
      var rowDiv = document.createElement("div");
  rowDiv.classList.add("row");
  var counter = 0;

  databaseRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
          var description = childSnapshot.child("description").val();
          var imageURL = childSnapshot.child("imageUrl").val();

          if (displayedImageURLs.indexOf(imageURL) === -1) {
              displayedImageURLs.push(imageURL);

              var colDiv = document.createElement("div");
              colDiv.classList.add("col-sm", "mt-3", "mt-md-0");

              var anchor = document.createElement("a");
              anchor.classList.add("image-link"); // Add a CSS class for styling

              var img = document.createElement("img");
              img.src = imageURL;
              img.classList.add("img-fluid", "rounded", "z-depth-1");
              img.setAttribute("alt", description);

              anchor.appendChild(img); // Add the image to the anchor element

              var descriptionEl = document.createElement("p");
              descriptionEl.innerText = description;

              var figureDiv = document.createElement("div");
              figureDiv.classList.add("figure");
              figureDiv.appendChild(anchor); // Add the anchor element to the figure
              figureDiv.appendChild(descriptionEl);
              descriptionEl.classList.add("text-center");

              colDiv.appendChild(figureDiv);
              rowDiv.appendChild(colDiv);
              counter++;

              if (counter === 3) {
                  counter = 0;
                  document.body.appendChild(rowDiv);
                  rowDiv = document.createElement("div");
                  rowDiv.classList.add("row");
              }

              // Click event listener for enlarging the image
              anchor.addEventListener("click", function(e) {
                  e.preventDefault();
                  showEnlargedImage(imageURL, description);
              });
          }
      });

      document.body.appendChild(rowDiv);
      var captionDiv = document.createElement("div");
      captionDiv.classList.add("caption");
      document.body.appendChild(captionDiv);
      });
    } else {
      // User is signed out
      // ...
    }
  });
}


var displayedImageURLs = [];
function showImage_user_profile(userId) {

  databaseRef = firebase.database().ref(userId);

  var rowDiv = document.createElement("div");
  rowDiv.classList.add("row");
  var counter = 0;

  databaseRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
          var description = childSnapshot.child("description").val();
          var imageURL = childSnapshot.child("imageUrl").val();

          if (displayedImageURLs.indexOf(imageURL) === -1) {
              displayedImageURLs.push(imageURL);

              var colDiv = document.createElement("div");
              colDiv.classList.add("col-sm", "mt-3", "mt-md-0");

              var anchor = document.createElement("a");
              anchor.classList.add("image-link"); // Add a CSS class for styling

              var img = document.createElement("img");
              img.src = imageURL;
              img.classList.add("img-fluid", "rounded", "z-depth-1");
              img.setAttribute("alt", description);

              anchor.appendChild(img); // Add the image to the anchor element

              var descriptionEl = document.createElement("p");
              descriptionEl.innerText = description;

              var figureDiv = document.createElement("div");
              figureDiv.classList.add("figure");
              figureDiv.appendChild(anchor); // Add the anchor element to the figure
              figureDiv.appendChild(descriptionEl);
              descriptionEl.classList.add("text-center");

              colDiv.appendChild(figureDiv);
              rowDiv.appendChild(colDiv);
              counter++;

              if (counter === 3) {
                  counter = 0;
                  document.body.appendChild(rowDiv);
                  rowDiv = document.createElement("div");
                  rowDiv.classList.add("row");
              }

              // Click event listener for enlarging the image
              anchor.addEventListener("click", function(e) {
                  e.preventDefault();
                  showEnlargedImage(imageURL, description);
              });
          }
      });

      document.body.appendChild(rowDiv);
      var captionDiv = document.createElement("div");
      captionDiv.classList.add("caption");
      document.body.appendChild(captionDiv);
  });
}


function showEnlargedImage(imageURL, description) {
  var modalDiv = document.createElement("div");
  modalDiv.classList.add("modal");

  var modalContentDiv = document.createElement("div");
  modalContentDiv.classList.add("modal-content");

  var closeButton = document.createElement("span");
  closeButton.innerHTML = "&times;";
  closeButton.classList.add("close-button");

  var modalImg = document.createElement("img");
  modalImg.src = imageURL;
  modalImg.classList.add("enlarged-image");

  var modalDescription = document.createElement("p");
  modalDescription.innerText = description;

  modalContentDiv.appendChild(closeButton);
  modalContentDiv.appendChild(modalImg);
  modalContentDiv.appendChild(modalDescription);
  modalDiv.appendChild(modalContentDiv);
  document.body.appendChild(modalDiv);

  // Close the modal when clicked outside the image or on the close button
  function closeModal() {
      modalDiv.remove();
      document.removeEventListener("keydown", handleKeyPress);
  }

  modalDiv.addEventListener("click", function(e) {
      if (e.target === modalDiv || e.target === closeButton) {
          closeModal();
      }
  });

  // Close the modal when Escape key is pressed
  function handleKeyPress(e) {
      if (e.key === "Escape") {
          closeModal();
      }
  }

  document.addEventListener("keydown", handleKeyPress);
}


function storeHeight() {
  var user = firebase.auth().currentUser;
  if (user) {
    var userId = user.uid;
    var db = firebase.firestore();
    var usersCollection = db.collection('users');
    var userDoc = usersCollection.doc(userId);

    var heightInput = document.getElementById('height');
    var newHeight = parseFloat(heightInput.value);

    // Retrieve the current height value from Firestore
    userDoc.get().then(function(doc) {
      if (doc.exists) {
        var currentHeight = doc.data().height || 0;
        var updatedHeight = currentHeight + newHeight;

        // Update the height field in the document
        userDoc.update({
          height: updatedHeight
        })
        .then(function() {
          console.log("Height stored successfully");
          getHeightData();
        })
        .catch(function(error) {
          console.error("Error storing height: ", error);
        });
      } else {
        console.error("User document does not exist");
      }
    }).catch(function(error) {
      console.error("Error retrieving user document: ", error);
    });
  } else {
    // User is not signed in, show the sign-in UI
    //ui.start('#firebaseui-auth-container', uiConfig);
  }
}


function getHeightData() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var user = firebase.auth().currentUser;
      if (user) {
        var userId = user.uid;
        var db = firebase.firestore();
        var usersCollection = db.collection('users');
        var userDoc = usersCollection.doc(userId);

        // Retrieve the user document from Firestore
        userDoc.get().then(function(doc) {
          if (doc.exists) {
            var heightData = doc.data().height || 0;
            // Display the height data on the webpage
            var heightDataElement = document.getElementById('height-data');
            heightDataElement.textContent = heightData;
          } else {
            console.error("User document does not exist");
          }
        }).catch(function(error) {
          console.error("Error retrieving user document: ", error);
        });
      }
    } else {
      // User is not signed in
      console.error("User is not signed in");
    }
  });
}


function getHeightData_user_profile(userId) {
  var db = firebase.firestore();
  var usersCollection = db.collection('users');
  var userDoc = usersCollection.doc(userId);

  // Retrieve the user document from Firestore
  userDoc.get().then(function(doc) {
    if (doc.exists) {
      var heightData = doc.data().height || 0;
      // Display the height data on the webpage
      var heightDataElement = document.getElementById('height-data');
      heightDataElement.textContent = heightData;
    } else {
      console.error("User document does not exist");
    }
  }).catch(function(error) {
    console.error("Error retrieving user document: ", error);
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