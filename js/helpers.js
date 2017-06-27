// helpers.js - Contains helper functions and variables for the neighborhood map
// app.

googleMapsError = function() {
    alert("There was an error loading Google Maps. Please check your internet \
        connection and try again.");
};

// As a nod to security I put my yelpClientID and yelpClientSecret in a separate
// file, but even Udacity notes it's not technically possibl eto make anything
// secret on the client side. At least it's the thought that counts?
var yelpClientID = "Ory9lXr5JX3muXuSS2YTHw";
var yelpClientSecret = "RnIfASY37qKQEIfkvt9UStwFTuEQo0DD0mMEYbPKzV4yH84cj5Srxj3YW550udBC";