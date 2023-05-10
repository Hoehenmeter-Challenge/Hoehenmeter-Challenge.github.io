function uploadImage(folderName) {
    const storageRef = firebase.storage().ref(folderName);
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
            const dbRef = firebase.database().ref(folderName).push();
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

// here new
var displayedImageURLs = [];

function showimage(folderName) {
    var databaseRef = firebase.database().ref(folderName);
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


window.addEventListener("load", function() {
  showimage('tim images');
  updateHeights();
});

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
  

const errorMsgElement = document.querySelector('span#errorMsg');