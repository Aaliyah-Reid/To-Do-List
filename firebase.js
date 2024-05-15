import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth,GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 

document.addEventListener('DOMContentLoaded', async (event) => {
  const firebaseConfig = {
    apiKey: "AIzaSyAasHoYNtJO_mrbr2H3PDcC-WEogthsJbI",
    authDomain: "to-do-list-c4af1.firebaseapp.com",
    projectId: "to-do-list-c4af1",
    storageBucket: "to-do-list-c4af1.appspot.com",
    messagingSenderId: "339701377217",
    appId: "1:339701377217:web:ee0e541c28f67c24a40c40",
    measurementId: "G-1QV5TQS6HT"
  };

  const app = initializeApp(firebaseConfig);


  // Authentication
  const auth = getAuth(app);
  // Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
  auth.languageCode = 'en';
  const provider = new GoogleAuthProvider();

  // login and sign up using google account


  const googleLogin = document.getElementById("google-auth-btn");
  googleLogin.addEventListener("click", function(){
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...

      console.log(user);
      window.location.href = "http://127.0.0.1:5500/index.html"
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  })

  // Sign up users with email and password input

  function attachSignUpEvent() {
    const signUpBtn = document.getElementById("signup-btn");
    if (signUpBtn) {
      signUpBtn.addEventListener("click", function(){
        // alert("5");
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          // ...
          window.location.href = "http://127.0.0.1:5500/index.html"
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
  });
      });
    }
  }

  // Login users with email and password input
  
  function attachLoginEvent() {
    const loginBtn = document.getElementById("log-btn");
    if (loginBtn) {
      loginBtn.addEventListener("click", function(){
        // alert("7");
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            window.location.href = "http://127.0.0.1:5500/index.html"

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)

            if (errorCode === 'auth/invalid-credential') {
              // Tell the user to use their Google account to log in
              alert('Your account is connected to Google - use the Google button to log in.');
            } else {
              // Handle other errors
              alert(errorMessage);
            }
  });
      });
    }
  }
  
  // Call the appropriate function based on some condition, like the URL
  if (window.location.pathname.includes("signup.html")) {
    attachSignUpEvent();
  } else if (window.location.pathname.includes("login.html")) {
    attachLoginEvent();
  }
  

  // DataBase




 

 







});