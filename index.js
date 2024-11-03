// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  databaseURL:
    "https://leads-tracker-app-12dc1-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

// console.log(database);

const inputEl = document.getElementById("input-el");
//Save input function
const inputBtn = document.getElementById("input-btn");
//Ul Element
const ulEl = document.querySelector("#ul-el");
//Save the delete button
const deleteBtn = document.querySelector("#delete-btn");
// const tabBtn = document.getElementById("tab-btn");

//Fetching the localstorage
// const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// if (leadsFromLocalStorage) {
//   myLeads = leadsFromLocalStorage;
//   render(myLeads);
// }

// tabBtn.addEventListener("click", function () {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     myLeads.push(tabs[0].url);

//     // Save the myLeads array to localStorage - The array needs to be converted 1st to a string using the JSON.stringify
//     localStorage.setItem("myLeads", JSON.stringify(myLeads));

//     render(myLeads);
//   });
// });

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li><a href="${leads[i]}" target="_blank">${leads[i]}</a></li>`;
  }
  ulEl.innerHTML = listItems;
}

function clearButton() {
  // localStorage.clear("myLeads");
  // ulEl.innerHTML = "";
  // localStorage.clear();
}

onValue(referenceInDB, function (snapshot) {
  const snapshotDoesExist = snapshot.exists();

  if (snapshotDoesExist) {
    const snapshotValues = snapshot.val();
    const leads = Object.values(snapshotValues);
    render(leads);
  }
});

inputBtn.addEventListener("click", function () {
  push(referenceInDB, inputEl.value);
  inputEl.value = "";

  // Save the myLeads array to localStorage - The array needs to be converted 1st to a string using the JSON.stringify
  // localStorage.setItem("myLeads", JSON.stringify(myLeads));
});

deleteBtn.addEventListener("dblclick", function () {
  remove(referenceInDB);
  ulEl.innerHTML = "";
});

// const li = document.createElement("li");
// li.textContent += myLeads[i];
// ulEl.append(li);
