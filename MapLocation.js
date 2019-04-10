/*  
     Author: Adam D
     Date: 04/10/2019
*/

"use strict";
var waitForUser;

// Request to obtain location from user.
function geoTest()
{
	waitForUser = setTimeout(fail, 10000);
	
	if (navigator.geolocation) 
	{ 
		navigator.geolocation.getCurrentPosition(createMap,
									fail); 
	}
	else
	{ 
		fail();
	}
}

// Creates a centered map of the location.
function createMap(position) 
{
	clearTimeout(waitForUser);
	
	var Lat = position.coords.latitude; 
	var Lng = position.coords.longitude; 

	var mapOptions = 
	{ 
		center: new google.maps.LatLng(Lat, Lng), 
		zoom: 10 
	}; 

	var map = new google.maps.Map(document.getElementById("map"), 
                                                   mapOptions);
}

// Error message if location can not be found.
function fail() 
{
	document.getElementById("map").innerHTML = 
				"Unable to access your current location";
}