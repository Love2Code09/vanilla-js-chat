var firebaseConfig= {
    apiKey: "AIzaSyAMs3zfVp4AQyzDF7IQdkTXgBL_u82notA",
        authDomain: "chat-test-fd4dc.firebaseapp.com",
        projectId: "chat-test-fd4dc",
        storageBucket: "chat-test-fd4dc.appspot.com",
        messagingSenderId: "357006397982",
        appId: "1:357006397982:web:f871dc4bfc9e899274940f"
}

;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const parent = document.querySelector(".msgs");

window.onload = () => {
    if (sessionStorage.getItem('AuthenticationState') === null) {
        window.open("AccessDenied.html", "_self");
    }


    db.collection("chat-messages").orderBy("timestamp", "asc").onSnapshot(snapshot=> {
            const changes=snapshot.docChanges();

            changes.forEach(change => {
                    if(change.type=="added") {

                        const newDiv = document.createElement("div");
                        newDiv.className = "msg";
                        const msgName = document.createElement("h3");
                        msgName.className ="sender-name";
                        const msgText = document.createElement("p");
                        msgText.className ="sender-msg";
                        const msgTime = document.createElement("span");
                        msgTime.className ="msg-send-time";
                        const welcomeHeader = document.querySelector(".chat-container h1");
                        welcomeHeader.textContent = "Welcome "+ change.doc.data().sender + "!";
                        msgName.textContent = change.doc.data().sender;
                        msgText.textContent = change.doc.data().message;
                        newDiv.appendChild(msgName);
                        newDiv.appendChild(msgText);
                        newDiv.appendChild(msgTime);
                        parent.appendChild(newDiv);
                    }
                }

            )
        }

    )
}

document.querySelector('.chat-container button').addEventListener("click", function() {
        auth.signOut().then(()=> {
                alert("Signed out successfully");
                sessionStorage.setItem('AuthenticationState', null);
                window.location="index.html";
            }

        ).catch((err) => {
                alert(err.message);
                console.log(err.message);
            }


        )
    });

    const msgText = document.querySelector('.msg-text');

    msgText.addEventListener('keypress', function (e) {
            if (e.key ==='Enter') {
                
                firebase.auth().onAuthStateChanged(user => {
                        if (user) {
                            getUserData(user.uid)
                        }
                    }

                )
            }

            function getUserData(uid) {
                var docRef = db.collection("users").doc(uid);

                docRef.get().then((doc) => {
                        const senderName = doc.data().name;

                        db.collection("chat-messages").add( {
                                sender: senderName,
                                message: msgText.value,
                                timestamp:firebase.firestore.FieldValue.serverTimestamp()
                            }
                        

                        ) .catch((error) => {
                                console.error("Error adding document: ", error);
                            });

                    });
                  
                 }

               
            });