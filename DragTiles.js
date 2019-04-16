/* 
    Author: Adam D 
    Date: 04/09/2019  
    Revisions:
	.1 - Added support for touch events
	.2 - enhanced app to support pointer events
*/

"use strict";

// global variables
var loc = [];
var origin;
var onTop;

// perform setup tasks when page first loads
function setUpPage() {
   var puzzlePieces = document.querySelectorAll("#pieces div");
   onTop = puzzlePieces.length + 1;
   for (var i = 0; i < puzzlePieces.length; i++) {
	  // .2 - disable IE10+ interface gestures
      puzzlePieces[i].style.msTouchAction = "none"; 
	  puzzlePieces[i].style.touchAction = "none";
	  
	  //.1 - added touchstart listener
      if (puzzlePieces[i].addEventListener) {
         puzzlePieces[i].addEventListener("mousedown", startDrag, false);
		 puzzlePieces[i].addEventListener("touchstart", startDrag, false);	
		 //.2 - added mspointerdown and pointerdown listeners
		 puzzlePieces[i].addEventListener("mspointerdown", startDrag, false);
		 puzzlePieces[i].addEventListener("pointerdown", startDrag, false);		 
      } else if (puzzlePieces[i].attachEvent) {
         puzzlePieces[i].attachEvent("onmousedown", startDrag);
      }
   }
}

// add event listeners and move object when user starts dragging
function startDrag(event) {
   this.style.zIndex = onTop; // set z-index to move selected element on top of other elements
   onTop++; // increment z-index counter so next selected element is on top of other elements
   event.preventDefault();
   //.1
   if (event.type !== "mousedown"){
	   this.addEventListener("touchmove", moveDrag, false);
	   //.2 - added mspointermove and pointermove add listeners
	   this.addEventListener("mspointermove", moveDrag, false); 
	   this.addEventListener("pointermove", moveDrag, false);
	   this.addEventListener("touchend", removeTouchListener, false);
	   //.2 - added mspointerup and pointerup add listeners
	   this.addEventListener("mspointerup", removeTouchListener, false); 
	   this.addEventListener("pointerup", removeTouchListener, false);
   } else {
	   this.addEventListener("mousemove", moveDrag, false);
       this.addEventListener("mouseup", removeDragListener, false);
   }

   loc = [this.offsetLeft,this.offsetTop];
   origin = getCoords(event);
}

// calculate new location of dragged object
function moveDrag(event) {
   var currentPos = getCoords(event);
   var deltaX = currentPos[0] - origin[0];
   var deltaY = currentPos[1] - origin[1];
   this.style.left = (loc[0] + deltaX) + "px";
   this.style.top  = (loc[1] + deltaY) + "px";
}

// identify location of event
function getCoords(event) {
   var coords = [];
   if (event.targetTouches && event.targetTouches.length) { 
		var thisTouch = event.targetTouches[0]; 
		coords[0] = thisTouch.clientX; 
		coords[1] = thisTouch.clientY;
   } else {
		coords[0] = event.clientX;
		coords[1] = event.clientY;
   }
   return coords;
}

// remove mouse event listeners when dragging ends
function removeDragListener() {
   this.removeEventListener("mousemove", moveDrag, false);
   this.removeEventListener("mouseup", removeDragListener, false);
}

//.1 - remove touch event listeners when dragging ends 
function removeTouchListener() { 
   this.removeEventListener("touchmove", moveDrag, false); 
   // .2 - added mspointermove and pointermove remove listeners
   this.removeEventListener("mspointermove", moveDrag, false); 
   this.removeEventListener("pointermove", moveDrag, false);
   this.removeEventListener("touchend", removeTouchListener, false);
   // .2 - added mspointerup and pointerup remove listeners
   this.removeEventListener("mspointerup", removeTouchListener, false); 
   this.removeEventListener("pointerup", removeTouchListener, false);
}

// run setUpPage() function when page finishes loading
if (window.addEventListener) {
   window.addEventListener("load", setUpPage, false);
}
