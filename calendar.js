/*
 *    KC Mavericks
 *    Variables and functions
 *    Author: Adam D
 *    Date: 02/13/2019  

 *    Filename: tt.js
 */

// global variables
var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", 
   "Thursday", "Friday", "Saturday"];
var opponents = ["Stingrays", "Stingrays", "(off)", "(off)", "(off)", 
    "(off)", "(off)", "Americans", "Wings", "(off)", "(off)", "(off)", 
	"Oilers", "(off)", "Grizzlies", "Grizzlies", "(off)", "Grizzlies", 
	"(off)", "Walleye", "(off)", "Walleye", "Wings", "(off)", "(off)", 
	"(off)", "Steelheads", "(off)"];
var gameLocation = 
   ["home", "home", "", "", "", "", "", "home", "home", 
    "", "", "", "home", "", "away", "away", "", "away",
    "", "home", "", "home", "home", "", "", "", "home", ""];

// function to place daysOfWeek values in header row cells 
function addColumnHeaders() {
   var i = 0;
   while (i < 7) {
      document.getElementsByTagName("th")[i].innerHTML = daysOfWeek[i];
      i++;
   }
}

// function to place day of month value in first p element 
// within each table data cell that has an id 
function addCalendarDates() {
   var i = 1;
   var paragraphs = "";
   do {
      var tableCell = document.getElementById("02-" + i);
      paragraphs = tableCell.getElementsByTagName("p");
      paragraphs[0].innerHTML = i;
      i++;      
   } while (i <= 28);
}

// function to place opponents and gameLocation values in 
// second p element within each table data cell that has an id
function addGameInfo() {
   var paragraphs = "";
   for (var i = 0; i < 29; i++) {
      var date = i+1;
      var tableCell = document.getElementById("02-" + date);
      paragraphs = tableCell.getElementsByTagName("p");

      switch (gameLocation[i]) {
         case "away":
            paragraphs[1].innerHTML = "@ ";
            break;
         case "home":
            paragraphs[1].innerHTML = "vs ";
            break;
      }
      paragraphs[1].innerHTML += opponents[i];
   }
}

// function to populate calendar 
function setUpPage() {
   addColumnHeaders();
   addCalendarDates();
   addGameInfo();
}

// runs setUpPage() function when page loads
if (window.addEventListener) {
   window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
   window.attachEvent("load", setUpPage);
}
