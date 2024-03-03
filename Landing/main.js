import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


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
const fdb = getFirestore(app);
const blogBut = document.querySelector('.blog-button');
const logOutBut = document.querySelector('.logout-button');
const qnaDataContainer = document.getElementById('qnaData');
const searchBar = document.getElementById('searchBar');
const isUser = JSON.parse(localStorage.getItem("userData"));

let allBlogs = [];

if (!isUser) window.location.replace("/index.html");


const renderBlogs = async () => {
    qnaDataContainer.innerHTML = "";


    const q = query(collection(fdb, "blogs"));

    const querySnapshot = await getDocs(q);
    const blogs = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        blogs.push(data);
    });

    if (!blogs.length) {
        const div = document.createElement("div");
        div.innerHTML = `<p style="color:black;">No Blogs Found</p>`;
        qnaDataContainer.appendChild(div);
        return;
    }


    allBlogs = blogs;

    blogs.reverse().forEach(data => {
        const div = document.createElement("div");
        div.setAttribute(
            "class",
            "question"
        );
        div.addEventListener('click', () => questionSection(data));

        div.innerHTML = `<div class="info-Data">

          <div class="heading">
              <h1>${data.title}</h1>
          </div>
  
          <div class="description">
              <p>${data.description}</p>
          </div>
  
          <div class="admin-info">
              <span class="admin-Name"><i class="fa-solid fa-user"></i> ${data?.username}</span>
              <span class="issue-Date">${data?.date}</span>
          </div>
  
      </div>
  
      <div class="image-Section-1">
      </div>`


        qnaDataContainer.appendChild(div);
    })



}

renderBlogs();


const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();

    const filteredItems = allBlogs.filter(e => e.title.toLowerCase().includes(value));

    qnaDataContainer.innerHTML = "";

    filteredItems.forEach(data => {
        const div = document.createElement("div");
        div.setAttribute(
            "class",
            "question"
        );
        div.addEventListener('click', () => questionSection(data));

        div.innerHTML = `<div class="info-Data">

          <div class="heading">
              <h1>${data.title}</h1>
          </div>
  
          <div class="description">
              <p>${data.description}</p>
          </div>
  
          <div class="admin-info">
              <span class="admin-Name"><i class="fa-solid fa-user"></i> ${data?.username}</span>
              <span class="issue-Date">${data?.date}</span>
          </div>
  
      </div>
  
      <div class="image-Section-1">
      </div>`


        qnaDataContainer.appendChild(div);
    })
}

const blogSection = () => {

    window.location.href = "blog.html";

}


const logOutSection = () => {

    localStorage.removeItem("userData");
    window.location.href = "index.html";

}

const questionSection = (e) => {
    localStorage.setItem("blog", JSON.stringify(e))
    window.location.href = "questionPage.html";

}

logOutBut.addEventListener('click', logOutSection);
searchBar.addEventListener("input", handleSearch);
blogBut.addEventListener('click', blogSection);