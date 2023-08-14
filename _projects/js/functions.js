function getUserDataFromStorage(category) {
  // Access Firestore and create a reference to the users collection
  var db = firebase.firestore();
  var usersCollection = db.collection('users');

  // Create a query based on the category parameter
  var query = usersCollection;
  if (category !== 'All') {
    query = query.where('category', '==', category);
  }

  // Add an orderBy clause to sort by height in ascending order
  // query = query.orderBy('date', 'desc'); // 'height', 'date' (date does not work)

  // Get the documents matching the query
  query.get()
    .then(function(querySnapshot) {
      // Clear the usernames container before appending new data
      var usernamesContainer = document.getElementById('usernames-container');
      usernamesContainer.innerHTML = '';

      // Iterate over each document
      querySnapshot.forEach(function(doc) {
        // Get the username and userId from the document data
        var username = doc.data().username;
        var userId = doc.data().userId;

        // Create a new div element for displaying the username and height data
        var usernameBox = document.createElement('div');
        usernameBox.classList.add('user-box');

        // Create an image element
        var userImage = document.createElement('img');
        userImage.classList.add('user-image');

        // Get the profile picture URL from Firebase Storage
        var storageRef = firebase.storage().ref(userId + '/prof_pic');
        storageRef.getDownloadURL()
          .then(function(url) {
            // Set the source of the image
            userImage.src = url;
          })
          .catch(function(error) {
            console.error("Error getting profile picture: ", error);
          });

        // Create a span element for displaying the username text
        var usernameText = document.createElement('span');
        usernameText.textContent = username;
        usernameText.classList.add('username-text');

        // Append the image and username text to the username box
        usernameBox.appendChild(userImage);
        usernameBox.appendChild(usernameText);

        // Retrieve the user document from Firestore
        var userDoc = usersCollection.doc(userId);
        userDoc.get().then(function(doc) {
          if (doc.exists) {
            var heightData = doc.data().height || 0;
            // Create a span element for displaying the height data
            var heightDataElement = document.createElement('span');
            heightDataElement.textContent = "    " + heightData + " hm";
            heightDataElement.classList.add('height-data');

            // Append the height data element to the username box
            usernameBox.appendChild(heightDataElement);
          } else {
            console.error("User document does not exist");
          }
        }).catch(function(error) {
          console.error("Error retrieving user document: ", error);
        });

        // Add an event listener to the username box
        usernameBox.addEventListener('click', function() {
          // Store the userId in localStorage
          localStorage.setItem('userId', userId);

          // Redirect to the new webpage without query parameters
          window.location.href = '/show_user/';
        });

        // Append the username box to the usernames container
        usernamesContainer.appendChild(usernameBox);
      });
    })
    .catch(function(error) {
      console.error("Error retrieving usernames: ", error);
    });
}




function uploadProfImage() {
  var userId = firebase.auth().currentUser.uid;
  const storageRef = firebase.storage().ref(userId);
  const file = document.querySelector("#profilePicture").files[0];
  const name = "prof_pic";
  const metadata = {
    contentType: file.type
  };

  const uploadTask = storageRef.child(name).put(file, metadata);

  uploadTask
    .then(snapshot => {
      return snapshot.ref.getDownloadURL().then(url => {
        const imageObject = {
          imageUrl: url
        };
        const dbRef = firebase.database().ref(userId).push();
        return dbRef.set(imageObject).then(() => {
          console.log("Image uploaded successfully");
          //alert("Image uploaded successfully");
          document.querySelector("#profilePicture").src = url;
        });
      });
    })
    .catch(console.error);
}

function disableAndExecute() {
  // Disable the button when clicked
  document.getElementById("upload").disabled = true;

  document.getElementById("loading").style.display = "block";

  // Call your functions here (uploadImage and storeHeight)
  uploadImage();
  storeHeight();

  // Re-enable the button after 5 seconds
  setTimeout(function () {
    document.getElementById("upload").disabled = false;
    document.getElementById("loading").style.display = "none";
  }, 8000);
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
  const height = document.querySelector("#height").value;
  const date = new Date(document.querySelector("#date").value);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('de-DE', options);

  const uploadTask = storageRef.child(name).put(file, metadata);

  uploadTask.then(snapshot => {
    return snapshot.ref.getDownloadURL().then(url => {
      const imageObject = {
        imageUrl: url,
        description: description,
        height: height,
        date: formattedDate
      };
      const dbRef = firebase.database().ref(userId).push();
      return dbRef.set(imageObject).then(() => {
        console.log("Image uploaded successfully");
        document.getElementById("status").style.display = "block";
        document.getElementById("loading").style.display = "none";
        //alert("Image uploaded successfully");
        // Add the new image to the displayed image list
        const imageListItem = document.createElement("li");
        const imageElement = document.createElement("img");
        imageElement.src = url;
      });
    });
  }).catch(console.error);
}

function openImageSelector() {
  // Show the collapsed section when "Neuer Eintrag" is clicked
  var collapseSection = document.getElementById("collapseSection");
  collapseSection.style.display = "block";

  // Trigger the image selection immediately
  document.getElementById("photo").click();
}

function previewImage() {
  const preview = document.querySelector('#preview');
  const file = document.querySelector("#photo").files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    // convert image file to data URL
    preview.src = reader.result;
    preview.style.display = 'block'; // Show the preview image
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.style.display = 'none'; // Hide the preview image
  }
}


function previewImage_profile() {
  const preview = document.querySelector('#preview_profilePicture');
  const file = document.querySelector("#profilePicture").files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    // convert image file to data URL
    preview.src = reader.result;
    preview.style.display = 'block'; // Show the preview image
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.style.display = 'none'; // Hide the preview image
  }
}


function deleteImage(imageURL, height) {
  var userId = firebase.auth().currentUser.uid;

  // Find the image in the database
  var databaseRef = firebase.database().ref(userId);
  databaseRef
    .once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        if (childData.imageUrl === imageURL) {
          // Retrieve the current height value from Firestore
          var db = firebase.firestore();
          var usersCollection = db.collection('users');
          var userDoc = usersCollection.doc(userId);

          userDoc.get()
            .then(function(doc) {
              if (doc.exists) {
                var currentHeight = doc.data().height || 0;
                var updatedHeight = currentHeight - height;

                // Update the height field in the document
                userDoc.update({
                  height: updatedHeight
                })
                  .then(function() {
                    console.log("Height updated successfully");
                  })
                  .catch(function(error) {
                    console.error("Error updating height:", error);
                  });
                  
                // Update the displayed height value
                var heightElement = document.getElementById("height-data");
                heightElement.textContent = updatedHeight; // Update the text content

                // Remove the image from the database
                childSnapshot.ref
                  .remove()
                  .then(function () {
                    // Delete the image file from storage
                    var storageRef = firebase.storage().refFromURL(imageURL);
                    storageRef
                      .delete()
                      .then(function () {
                        console.log("Image deleted successfully");
                        //alert("Image deleted successfully");

                        // Remove the image container from the displayed image list
                        var contentContainer = document.getElementById("content-container");
                        var imageContainers = contentContainer.getElementsByClassName("figure");
                        for (var i = 0; i < imageContainers.length; i++) {
                          var imageElement = imageContainers[i].querySelector("img");
                          if (imageElement.src === imageURL) {
                            var container = imageElement.parentNode.parentNode; // Get the parent container element
                            container.parentNode.removeChild(container);
                            break;
                          }
                        }
                      })
                      .catch(function (error) {
                        console.error("Error deleting image from storage:", error);
                      });
                  })
                  .catch(function (error) {
                    console.error("Error deleting image from database:", error);
                  });
              } else {
                console.error("User document does not exist");
              }
            })
            .catch(function(error) {
              console.error("Error retrieving user document:", error);
            });
        }
      });
    })
    .catch(console.error);
}


var displayedImageURLs = [];
function showimage_my_profile() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var userId = user.uid;
      var username = user.displayName;

      var databaseRef = firebase.database().ref(userId);
      var containerDiv = document.createElement('div'); // Create a container for the rows
      containerDiv.classList.add('container');
      var rowDiv = null;
      var counter = 0;

      databaseRef.on('value', function(snapshot) {
        // Create an array to hold the image data for sorting
        var imageData = [];

        snapshot.forEach(function(childSnapshot) {
          var description = childSnapshot.child('description').val();
          var imageURL = childSnapshot.child('imageUrl').val();
          var height = childSnapshot.child('height').val();
          var date = childSnapshot.child('date').val();

          if (imageURL.includes('prof_pic')) {
            // Skip the image with name 'prof_pic'
            return;
          }

          imageData.push({
            imageURL: imageURL,
            description: description,
            height: height,
            date: date
          });
        });

        // Sort the imageData array based on the date in descending order (newest to oldest)
        imageData.sort(function(a, b) {
          var dateA = new Date(parseGermanDate(b.date));
          var dateB = new Date(parseGermanDate(a.date));
          return dateA - dateB;
        });

        // Clear displayedImageURLs and containerDiv before repopulating
        displayedImageURLs = [];
        containerDiv.innerHTML = '';

        imageData.forEach(function(data) {
          var imageURL = data.imageURL;
          var description = data.description;
          var height = data.height;
          var date = data.date;

          if (displayedImageURLs.indexOf(imageURL) === -1) {
            displayedImageURLs.push(imageURL);

            var colDiv = document.createElement('div');
            colDiv.classList.add('col-md-4', 'mb-3', 'image-column'); // Modified class names

            var anchor = document.createElement('a');
            anchor.classList.add('image-link');

            var img = document.createElement('img');
            img.src = imageURL;
            img.classList.add('img-fluid', 'rounded', 'z-depth-1');
            img.setAttribute('alt', description);

            anchor.appendChild(img);

            var descriptionEl = document.createElement('p');
            descriptionEl.innerText = description;
            descriptionEl.classList.add('text-center');

            var heightEl = document.createElement('p');
            heightEl.innerText = height + " hm";
            heightEl.classList.add('text-center');

            var dateEl = document.createElement('p');
            dateEl.innerText = "Datum: " + date;
            dateEl.classList.add('text-center');

            var deleteButton = document.createElement('button');
            deleteButton.innerText = 'Löschen';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'delete-button');
            deleteButton.addEventListener('click', function() {
              deleteImage(imageURL, height);
            });

            var figureDiv = document.createElement('div');
            figureDiv.classList.add('figure', 'text-center');
            figureDiv.appendChild(anchor);
            figureDiv.appendChild(descriptionEl);
            figureDiv.appendChild(heightEl);
            figureDiv.appendChild(dateEl);
            figureDiv.appendChild(deleteButton);

            colDiv.appendChild(figureDiv);

            if (counter % 3 === 0 && rowDiv !== null) { // Modified condition for creating a new row
              rowDiv = null; // Reset the rowDiv variable
            }

            if (rowDiv === null) {
              rowDiv = document.createElement('div');
              rowDiv.classList.add('row');
              containerDiv.appendChild(rowDiv); // Append the row to the container
            }

            rowDiv.appendChild(colDiv);
            counter++;

            anchor.addEventListener('click', function(e) {
              e.preventDefault();
              showEnlargedImage(imageURL, description);
            });
          }
        });

        document.getElementById('content-container').appendChild(containerDiv); // Append the container to the content container

        var captionDiv = document.createElement('div');
        captionDiv.classList.add('caption');
        document.getElementById('content-container').appendChild(captionDiv); // Append the caption to the content container
      });
    }
  });
}


var displayedImageURLs = [];
function showImage_user_profile(userId) {
  var databaseRef = firebase.database().ref(userId);
  var containerDiv = document.createElement('div'); // Create a container for the rows
  containerDiv.classList.add('container');
  var rowDiv = null;
  var counter = 0;

  databaseRef.on('value', function(snapshot) {
    // Create an array to hold the image data for sorting
    var imageData = [];

    snapshot.forEach(function(childSnapshot) {
      var description = childSnapshot.child('description').val();
      var imageURL = childSnapshot.child('imageUrl').val();
      var height = childSnapshot.child('height').val();
      var date = childSnapshot.child('date').val();

      if (imageURL.includes('prof_pic')) {
        // Skip the image with name 'prof_pic'
        return;
      }

      imageData.push({
        imageURL: imageURL,
        description: description,
        height: height,
        date: date
      });
    });

    // Sort the imageData array based on the date in descending order (newest to oldest)
    imageData.sort(function(a, b) {
      var dateA = new Date(parseGermanDate(b.date));
      var dateB = new Date(parseGermanDate(a.date));
      return dateA - dateB;
    });

    // Clear displayedImageURLs and containerDiv before repopulating
    displayedImageURLs = [];
    containerDiv.innerHTML = '';

    imageData.forEach(function(data) {
      var imageURL = data.imageURL;
      var description = data.description;
      var height = data.height;
      var date = data.date;

      if (displayedImageURLs.indexOf(imageURL) === -1) {
        displayedImageURLs.push(imageURL);

        var colDiv = document.createElement('div');
        colDiv.classList.add('col-md-4', 'mb-3', 'image-column'); // Modified class names

        var anchor = document.createElement('a');
        anchor.classList.add('image-link');

        var img = document.createElement('img');
        img.src = imageURL;
        img.classList.add('img-fluid', 'rounded', 'z-depth-1');
        img.setAttribute('alt', description);

        anchor.appendChild(img);

        var descriptionEl = document.createElement('p');
        descriptionEl.innerText = description;
        descriptionEl.classList.add('text-center');

        var heightEl = document.createElement('p');
        heightEl.innerText = height + " hm";
        heightEl.classList.add('text-center');

        var dateEl = document.createElement('p');
        dateEl.innerText = "Datum: " + date;
        dateEl.classList.add('text-center');

        var figureDiv = document.createElement('div');
        figureDiv.classList.add('figure');
        figureDiv.appendChild(anchor);
        figureDiv.appendChild(descriptionEl);
        figureDiv.appendChild(heightEl);
        figureDiv.appendChild(dateEl);

        colDiv.appendChild(figureDiv);

        if (counter % 3 === 0 && rowDiv !== null) { // Modified condition for creating a new row
          rowDiv = null; // Reset the rowDiv variable
        }

        if (rowDiv === null) {
          rowDiv = document.createElement('div');
          rowDiv.classList.add('row');
          containerDiv.appendChild(rowDiv); // Append the row to the container
        }

        rowDiv.appendChild(colDiv);
        counter++;

        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          showEnlargedImage(imageURL, description);
        });
      }
    });
  });

  document.getElementById('content-container').appendChild(containerDiv); // Append the container to the content container

  var captionDiv = document.createElement('div');
  captionDiv.classList.add('caption');
  document.getElementById('content-container').appendChild(captionDiv); // Append the caption to the content container
}

// Helper function to parse German date format (dd.mm.yyyy) to a format accepted by Date constructor (mm/dd/yyyy)
function parseGermanDate(germanDate) {
  var parts = germanDate.split('.');
  if (parts.length === 3) {
    return parts[1] + '/' + parts[0] + '/' + parts[2];
  }
  return germanDate;
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
          getUserData();
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

function getUserData() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      document.getElementById('content').style.display = 'block';
      document.getElementById('error-message').style.display = 'none';
      var userId = user.uid;
      var db = firebase.firestore();
      var usersCollection = db.collection('users');
      var userDoc = usersCollection.doc(userId);

      var username = user.displayName;
      document.getElementById('username-placeholder').textContent = username;

      // Retrieve the user document from Firestore
      userDoc.get().then(function(doc) {
        if (doc.exists) {
          var heightData = doc.data().height || 0;
          // Display the height data on the webpage
          var heightDataElement = document.getElementById('height-data');
          heightDataElement.textContent = heightData;
          
          // category
          var category = doc.data().category || 'No category';
          var categoryDataElement = document.getElementById('category-data');
          categoryDataElement.textContent = category;

          // Highlight the active category button
          var category1Button = document.getElementById('category1Button');
          var category2Button = document.getElementById('category2Button');
          var category3Button = document.getElementById('category3Button');

          category1Button.style.backgroundColor = category === 'category1' ? 'green' : 'rgba(105, 105, 105, 0.3)';
          category2Button.style.backgroundColor = category === 'category2' ? 'green' : 'rgba(105, 105, 105, 0.3)';
          category3Button.style.backgroundColor = category === 'category3' ? 'green' : 'rgba(105, 105, 105, 0.3)';

          var errorMessageElement = document.getElementById('error-message');
          errorMessageElement.style.display = 'none';

        } else {
          console.error("User document does not exist");
        }
      }).catch(function(error) {
        console.error("Error retrieving user document: ", error);
      });
    } else {
      // User is not signed in, notify or redirect them
      console.error("User is not signed in");
      document.getElementById('content').style.display = 'none';
      document.getElementById('error-message').style.display = 'block';
    }
  });
}


function getUserData_old() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var user = firebase.auth().currentUser;
      if (user) {
        var userId = user.uid;
        var db = firebase.firestore();
        var usersCollection = db.collection('users');
        var userDoc = usersCollection.doc(userId);

        var username = user.displayName;
        document.getElementById('username-placeholder').textContent = username;

        // Retrieve the user document from Firestore
        userDoc.get().then(function(doc) {
          if (doc.exists) {
            var heightData = doc.data().height || 0;
            // Display the height data on the webpage
            var heightDataElement = document.getElementById('height-data');
            heightDataElement.textContent = heightData;
            
            // category
            var category = doc.data().category || 'No category';
            var categoryDataElement = document.getElementById('category-data');
            categoryDataElement.textContent = category;

            // Highlight the active category button
            var category1Button = document.getElementById('category1Button');
            var category2Button = document.getElementById('category2Button');
            var category3Button = document.getElementById('category3Button');

            category1Button.style.backgroundColor = category === 'category1' ? 'green' : 'rgba(105, 105, 105, 0.3)';
            category2Button.style.backgroundColor = category === 'category2' ? 'green' : 'rgba(105, 105, 105, 0.3)';
            category3Button.style.backgroundColor = category === 'category3' ? 'green' : 'rgba(105, 105, 105, 0.3)';

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

function getUserData_only_one() {
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

            // category
            var category = doc.data().category || 'No category';
            var categoryDataElement = document.getElementById('category-data');
            categoryDataElement.textContent = category;

            // Hide all buttons first
            var categoryButtons = document.getElementsByClassName('category-button');
            for (var i = 0; i < categoryButtons.length; i++) {
              categoryButtons[i].style.display = 'none';
            }

            // Show the selected category button
            var selectedButton = document.getElementById(category + 'Button');
            selectedButton.style.display = 'block';

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
      var username = doc.data().username || "";
      // Display the height data on the webpage
      var heightDataElement = document.getElementById('height-data');
      heightDataElement.textContent = heightData;

      var usernameElement = document.getElementById('username-placeholder-all'); // Assuming you have an element with id 'username' to display the username
      usernameElement.textContent = username;
    } else {
      console.error("User document does not exist");
    }
  }).catch(function(error) {
    console.error("Error retrieving user document: ", error);
  });
}


function storeCategory(category) {
  var user = firebase.auth().currentUser;
  if (user) {
    var userId = user.uid;
    var db = firebase.firestore();
    var usersCollection = db.collection('users');
    var userDoc = usersCollection.doc(userId);

    // Update the category field in the document
    userDoc.update({
      category: category
    })
    .then(function() {
      console.log("Category stored successfully");
      getUserData();
    })
    .catch(function(error) {
      console.error("Error storing category: ", error);
    });
  } else {
    // User is not signed in, show the sign-in UI
    //ui.start('#firebaseui-auth-container', uiConfig);
  }
}


function removeAccount() {
  var user = firebase.auth().currentUser;
  var userId = user.uid;

  // Prompt the user to confirm the account removal
  var confirmDelete = confirm("Bist du sicher, dass du den Account löschen willst? Diese Aktion kann nicht rückgängig gemacht werden.");

  if (confirmDelete) {
    // Delete user data from Firestore
    var firestoreRef = firebase.firestore().collection("users").doc(userId);
    firestoreRef.delete()
      .then(function () {
        // Delete user data from Realtime Database
        var realtimeRef = firebase.database().ref(userId);
        realtimeRef.remove()
          .then(function () {
            // Delete user data from Firebase Storage
            var storageRef = firebase.storage().ref(userId);
            storageRef.listAll()
              .then(function (listResult) {
                var deletePromises = listResult.items.map(function (item) {
                  return item.delete();
                });
                return Promise.all(deletePromises);
              })
              .then(function () {
                // All related data has been deleted, now delete the user account
                return user.delete();
              })
              .then(function () {
                alert("Account erfolgreich gelöscht");
                // Account removal successful.
                // You can redirect the user to a different page or update the UI as needed.
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
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