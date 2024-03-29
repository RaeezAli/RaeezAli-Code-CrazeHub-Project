import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, getDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyDl0Ohp6wTbGQ_hqE78nSE36ncgkIYhQGg",
    authDomain: "ali-code-crazehub.firebaseapp.com",
    databaseURL: "https://ali-code-crazehub-default-rtdb.firebaseio.com",
    projectId: "ali-code-crazehub",
    storageBucket: "ali-code-crazehub.appspot.com",
    messagingSenderId: "85369896826",
    appId: "1:85369896826:web:98d2f55de0518566d5a0c3",
    measurementId: "G-NERSGML518"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase();
const fdb = getFirestore(app);
const dbref = ref(db);
const loginWithGoogle = document.querySelector(".login-google-button");
const signUp = document.querySelector("#signUp");
// const login = document.getElementById("login-button");

const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();


    const formData = new FormData(loginForm);


    let formValues = {};

    for (let [key, value] of formData) {
        formValues[key] = value;
    }

    console.log(formValues);

    signInWithEmail(formValues.email, formValues.password)
})


const signInWithEmail = (email, password) => {


    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {

            console.log(userCredential.user.uid);

            // const docRef = doc(fdb, "users");
            // const docSnap = await getDocs(docRef)

            const q = query(collection(fdb, "users"), where("Uid", "==", userCredential.user.uid));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());

                addItemToLocalStorage(doc.data())
            });



            window.location.replace(`/landing.html`);

            // set(child(dbref, "UsersList/" + userCredential.user.uid).then((snapshot)=>{
            //     if(snapshot.exists){
            //         sessionStorage.setItem("user-info", JSON.stringify({
            //             Name: snapshot.val().Name,
            //             Email: snapshot.val().Email
            //         }))
            //         sessionStorage.setItem("user-creds", JSON.stringify(userCredential.user));
            //     }
            // }))
            // window.location.href = "landing.html";
        })
        .catch((error) => {
            console.log("🚀 ~ signInWithEmail ~ error:", error)

            const errorCode = error.code;
            console.log("🚀 ~ signInWithEmail ~ errorCode:", errorCode)
            const errorMessage = error.message;

            alert(errorMessage)


            console.log("errZz", errorMessage);
            // ..
        });

}


const loginWithGoogleFunction = () => {
    signInWithPopup(auth, provider)
        .then(async (result) => {


            const q = query(collection(fdb, "users"), where("Uid", "==",result.user.uid));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());

                addItemToLocalStorage(doc.data())
            });



            window.location.replace("/landing.html");

        }).catch((error) => {

            console.log(error);
        });
}

const signUpSection = () => {
    window.location.href = 'signUp.html';
}


//?     Hide & Show Password Function 

const showHide = document.getElementById("showPassword");

function togglePasswordVisibility() {

    let password = document.getElementById("password-input");

    if (password.type === "password") {

        password.type = "text";
        showHide.innerHTML = "Hide";
    }

    else {

        password.type = "password";
        showHide.innerHTML = "Show";
    }
}

showHide.addEventListener('click', togglePasswordVisibility);

//?       Account Login


// login.addEventListener('click' , signInWithEmail);
loginWithGoogle.addEventListener('click', loginWithGoogleFunction)
signUp.addEventListener("click", signUpSection)


function addItemToLocalStorage(userData) {

    localStorage.setItem("userData", JSON.stringify(userData));

}

function checkAuth() {
    const isUser = JSON.parse(localStorage.getItem("userData"));
  
    if(isUser) window.location.replace("/landing.html");
}

checkAuth()