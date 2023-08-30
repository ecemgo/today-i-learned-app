"use strict";

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// console.log(CATEGORIES.find((cat) => cat.name === "society").color);

// Selecting DOM elements
const shareButton = document.querySelector(".btn-share");
const factForm = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

// console.dir(shareButton);

// Create DOM elements: Render facts in list
factsList.innerHTML = "";

// Load data from Supabase
loadFacts();

async function loadFacts() {
  const res = await fetch(
    "https://apjexwpnuvqvwrdqbpoj.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwamV4d3BudXZxdndyZHFicG9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyMDQyNTMsImV4cCI6MjAwNzc4MDI1M30.Hhr1y0N_1V2qLu2w_wbMjClue8zu1Kdi2ADj2zyIbcY",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwamV4d3BudXZxdndyZHFicG9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyMDQyNTMsImV4cCI6MjAwNzc4MDI1M30.Hhr1y0N_1V2qLu2w_wbMjClue8zu1Kdi2ADj2zyIbcY",
      },
    }
  );
  const data = await res.json();
  // const filteredData = data.filter((fact) => fact.category === "society");
  // console.log(data);
  createFactList(data);
}

function createFactList(dataArray) {
  // factsList.insertAdjacentHTML("afterbegin", "<li>Jonas<li/>");
  // factsList.insertAdjacentHTML("afterbegin", "<li>Mike<li/>");

  const htmlArr = dataArray.map(
    (fact) => `
  <li class="fact">
    <p>${fact.text}<a class="source" href=${
      fact.source
    } target="_blank">(Source)</a></p>

    <span class="tag" style="background-color: ${
      CATEGORIES.find((cat) => cat.name === fact.category).color
    }">${fact.category}</span>

    <div class="vote-buttons">
      <button>👍 ${fact.votesInteresting}</button>
      <button>🤯 ${fact.votesMindblowing}</button>
      <button>⛔ ${fact.votesFalse}</button>
    </div>
  </li>`
  );
  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

// Toggle form visibility
shareButton.addEventListener("click", function () {
  if (factForm.classList.contains("hidden")) {
    factForm.classList.remove("hidden");
    shareButton.textContent = "Close";
  } else {
    factForm.classList.add("hidden");
    shareButton.textContent = "Share a fact";
  }
});
