var firebaseConfig = {
    apiKey: "AIzaSyAMs3zfVp4AQyzDF7IQdkTXgBL_u82notA",
    authDomain: "chat-test-fd4dc.firebaseapp.com",
    projectId: "chat-test-fd4dc",
    storageBucket: "chat-test-fd4dc.appspot.com",
    messagingSenderId: "357006397982",
    appId: "1:357006397982:web:f871dc4bfc9e899274940f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();


  const signInBtn = document.querySelector('.cta-sign-in-btn');
  const signUpLink = document.querySelector('.sign-up-action');
  const signUp = document.querySelector('#sign-up');
  const signIn = document.querySelector('#sign-in');
  const name = document.querySelector('.name-input-sign-up');
  const mainContainer = document.querySelector('.sign-in-container');


  signUpLink.addEventListener("click", () => {
     signIn.style.display = "none";
     signUp.style.display = "flex";
  })
  
  const signUpBtn = document.querySelector('.cta-sign-up-btn');

  signUpBtn.addEventListener("click", () => {
 
    const email = document.querySelector('.email-input-sign-up');
    const pass = document.querySelector('.pass-input-sign-up');
    auth.createUserWithEmailAndPassword(email.value, pass.value).then(cred => {
        
        return db.collection('users').doc(cred.user.uid).set({ /*create document in firestore that stores user creds that
                                                               is unique to the uid */
          name:name.value, 
          email:email.value
        })
        }).then(() => {
        
          alert("Congrats! You've made an account welcome " + name.value + "!");
          sessionStorage.setItem("AuthenticationState", "Authenticated"); //session is used to determine the auth status for REDIRECTS
          window.location = "chat.html";
          
    
        }).catch((err) => {
          alert(err.message);
          console.log(err.message)
        });
        });
      
    
       
    
signInBtn.addEventListener("click", () => {
      //Sign In User with Email and Password
      const email = document.querySelector('.email-input-sign-in');
      const pass = document.querySelector('.pass-input-sign-in');
      auth.signInWithEmailAndPassword(email.value, pass.value).then(function() {
      alert("Signed in successfully");
      sessionStorage.setItem("AuthenticationState", "Authenticated");
      window.location = "chat.html";
    
     

    
}).catch((error) => {
   alert(error.message);
});
})
