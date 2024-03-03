import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


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
const db = getFirestore(app);
const logOutBut = document.querySelector(".logout-button");

const saveBtn = document.getElementById("save");
const cancleBtn = document.getElementById("cancle");
const titleInp = document.getElementById("title");
const descriptionInp = document.getElementById("description");
const selectElement = document.getElementById("category");
const typeRadioButtons = document.querySelectorAll('input[name="type"]');
const statusRadioButtons = document.querySelectorAll('input[name="status"]');

const isUser = JSON.parse(localStorage.getItem("userData"));

if (!isUser) window.location.replace("/index.html")


const loginSection = () => {

  localStorage.removeItem("userData");
  window.location.href = "index.html";
}

const getCurrentDate = () => {
  var currentDate = new Date();

  // Extract year, month, and day
  var year = currentDate.getFullYear();
  var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-indexed
  var day = ('0' + currentDate.getDate()).slice(-2);

  // Format the date as "YYYY-MM-DD"
  var formattedDate = year + '-' + month + '-' + day;
  return formattedDate
}

function generateBlogId() {
  // Generate a timestamp
  var timestamp = new Date().getTime();

  // Generate a random number
  var randomNumber = Math.floor(Math.random() * 10000);

  // Concatenate timestamp and random number to create a unique ID
  var userId = 'user_' + timestamp + '_' + randomNumber;

  return userId;
}

const handleBlogCreate = () => {
  const title = titleInp.value;
  if (!title.trim()) return alert("Title is required");
  const description = descriptionInp.value;
  if (!description.trim()) return alert("Description is required");


  const selectedOption = selectElement.options[selectElement.selectedIndex];

  // Get the value of the selected option
  const category = selectedOption.value;

  if (!category.trim()) return alert("Category is required");


  let type;

  // Loop through each radio button
  typeRadioButtons.forEach(function (radioButton) {
    // Check if the radio button is checked
    if (radioButton.checked) {
      // If checked, store its value
      type = radioButton.value;
    }
  });

  if (!type.trim()) return alert("Type is required");

  let status;

  // Loop through each radio button
  statusRadioButtons.forEach(function (radioButton) {
    // Check if the radio button is checked
    if (radioButton.checked) {
      // If checked, store its value
      status = radioButton.value;
    }
  });

  if (!status.trim()) return alert("Status is required");

  const date = getCurrentDate();

  const { Email: email, Name: username } = JSON.parse(localStorage.getItem("userData"));
  const uid = generateBlogId();


  const blogData = {
    title,
    description,
    type,
    status,
    category,
    date,
    username,
    email,
    uid
  };
  console.log("🚀 ~ handleBlogCreate ~ blogData:", blogData);


  addDoc(collection(db, "blogs"), blogData)
    .then((d) => {
      console.log("🚀 ~ .then ~ d:", d)


      window.location.replace("/landing.html");

    })
    .catch((err) => {

      console.log("🚀 ~ .then ~ e:", err)

      alert(err);
    })

}

cancleBtn.addEventListener("click", () => window.location.replace("/landing.html"));
logOutBut.addEventListener("click", loginSection);
saveBtn.addEventListener("click", handleBlogCreate)
