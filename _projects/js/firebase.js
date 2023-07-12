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

// Sign Up
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var userId;
var username;

var uiConfig = {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: 'https://hoehenmeter-challenge.github.io/my_profile/',
  //signInSuccessUrl: 'https://localhost:8080/login/',
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // Retrieve the userId of the currently authenticated user
      var userId = authResult.user.uid;
      var username = authResult.user.displayName;
      
      var db = firebase.firestore();
      var usersCollection = db.collection('users');

      // Create a new document in the users collection using the user ID
      var userDoc = usersCollection.doc(userId);
      userDoc.get()
        .then(function(doc) {
          if (!doc.exists) {
            // User doesn't exist, create a new document
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

            // Continue with the default behavior
            //return true;
          }
        });
    }
  },
  // Additional config options...
};

ui.start('#firebaseui-auth-container', uiConfig);
