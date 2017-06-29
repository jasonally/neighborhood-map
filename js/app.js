// app.js - Contains the KnockoutJS implementation for the neighborhood map app.

// Google Maps variables.
var map;
var infoWindow;
var bounds;

// Yelp variables.
var yelpAccessToken;
var corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
var yelpError = '<div id="yelp-content">The Yelp rating cannot be displayed right now.\nPlease try again later.</div>';

var ViewModel = function() {
  // Trick to make the current this available to subfunctions and closures.
  // See https://stackoverflow.com/questions/17163248/whats-the-advantage-of-using-var-self-this-in-knockout-js-view-models
  var self = this;

  // Observable arrays which will be used throughout the ViewModel.
  self.cafeList = ko.observableArray([]);
  self.filteredCafeList = ko.observableArray([]);

  self.filterKeyword = ko.observable('');

  // Set map to initial coordinates over San Francisco Bay. The map will be
  // resized as markers get placed on it.
  self.init = function() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.617254, lng: -122.111212},
    zoom: 10
    });
  };

  // For each location in cafeLocations, create a new instance of Cafe and add
  // it to cafeList. cafeLocations is defined in model.js.
  self.createCafeLocations = function() {
    cafeLocations.forEach(function(cafeItem) {
      self.cafeList.push(new Cafe(cafeItem));
    });
    // Resize the map to fit the marker from each Cafe instance.
    map.fitBounds(bounds);
  };

  // Sorts the cafes alphabetically by name.
  // See http://www.c-sharpcorner.com/UploadFile/cd7c2e/apply-sort-function-on-observable-array-using-knockoutjs/
  self.sortCafeLocations = function() {
    self.cafeList.sort(function (a, b) {
      return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;});
  };

  // Add click event listener to each marker in cafeList. When a user clicks
  // on a marker, call self.cafeClick().
  self.setCafeClickFunctions = function() {
    self.cafeList().forEach(function(cafe) {
      google.maps.event.addListener(cafe.marker(), 'click', function() {
        self.cafeClick(cafe);
      });
    });
  };

  // self.cafeClick() needs to be separate from self.setCafeClickFunctions() so
  // because of the sidebar list in the app. When a user clicks on an item from
  // the sidebar list, that will also trigger self.cafeClick().
  self.cafeClick = function(cafe) {
    infoWindow.setContent(cafe.infoContent);
    self.openIcon(cafe);
  };

  // When the user clicks an icon, start getting the Yelp rating. Then center
  // the map to the icon, open the icon, and call the bounce function.
  self.openIcon = function(cafe) {
    self.getYelpAccessToken(cafe);
    map.panTo(cafe.position);
    infoWindow.open(map, cafe.marker());
    self.bounceIcon(cafe);
  };

  // Making the icon bounce requires two distinct steps, so might as well have
  // it in a dedicated function.
  self.bounceIcon = function(cafe) {
    cafe.marker().setAnimation(google.maps.Animation.BOUNCE);
    // 750 milliseconds is exactly enough time for the icon to bounce up and
    // down once.
    setTimeout(function() {
      cafe.marker().setAnimation(null);
    }, 700);
  };

  self.filterCafes = ko.computed(function() {
    var lowerCaseKeyword = self.filterKeyword().toLowerCase()
    self.filteredCafeList([]);
    for (var i = 0; i < self.cafeList().length; i++) {

      // We'll filter based on cafe title, city, or neighborhood. Grab all three
      // entries for each instance of Cafe in cafeList and convert them to
      // lowercase.
      var cafeTitle = self.cafeList()[i].title.toLowerCase();
      var cafeCity = self.cafeList()[i].city.toLowerCase();
      var cafeNeighborhood = self.cafeList()[i].neighborhood.toLowerCase();

      // If self.filterKeyword() matches a cafe's title, city, or neighborhood,
      // add the corresponding self.cafeList() entry to self.filteredCafeList().
      // Put the matching marker on the map and hide the non-matching markers.
      if (cafeTitle.indexOf(lowerCaseKeyword) > -1 ||
        cafeCity.indexOf(lowerCaseKeyword) > -1 ||
        cafeNeighborhood.indexOf(lowerCaseKeyword) > -1) {
        self.filteredCafeList.push(self.cafeList()[i]);
        // setVisible(true) and setVisible(false) shows/hides the markers
        // without completely re-rendering them -- more efficient.
        self.cafeList()[i].marker().setVisible(true);
      } else {
        self.cafeList()[i].marker().setVisible(false);
      }
    }
  });

  // Using the Yelp API was much tricker thanks to the launch of Yelp Fusion, or
  // Yelp API v3. Fusion requires an access token in API requests, which means
  // it doesn't play nicely with CORS or JSON-P. This Udacity thread helps
  // explain what you need to do:
  // https://discussions.udacity.com/t/yelp-v3-implementation/235928/18
  self.getYelpAccessToken = function(cafe) {
    var yelpAuthUrl = corsAnywhereUrl + "https://api.yelp.com/oauth2/token";

    // Clicking on one marker will make an access request and send back a
    // token. If you click on another marker will make a request for the same
    // token, so no need to ask for it again. You can skip to getting the rating
    // data from the Yelp API.
    if (yelpAccessToken) {
      self.getYelpData(yelpAccessToken, cafe);
    }
    else {
      $.ajax({
        url: yelpAuthUrl,
        method: "POST",
        data: {
            grant_type: 'client_credentials',
            client_id: yelpClientID,
            client_secret: yelpClientSecret
        },
      }).done(function(response){

          // If the token request succeeds, save the token so subsequent
          // requests won't be needed. Then call self.getYelpData().
          yelpAccessToken = response.access_token;
          self.getYelpData(yelpAccessToken, cafe);
      }).fail(function(jqxhr, textStatus, error){

          // Append an error to the marker infoWindow if the request fails.
          cafe.infoContent += yelpError;
          infoWindow.setContent(cafe.infoContent);
      });
    }
  };

  // Similar to what Yelp API v2 requests looked like, now that you have a
  // token. Yelp API v3 no longer includes the rating image URL in the response,
  // so I had to download the icons and include them in my app files.
  self.getYelpData = function(yelpAccessToken, cafe) {
    var yelpSearchUrl = "https://api.yelp.com/v3/businesses/";
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": corsAnywhereUrl + yelpSearchUrl + cafe.yelpID,
      "method": "GET",
      "headers": {
        "authorization": "Bearer " + yelpAccessToken,
        "cache-control": "no-cache"
      }
    };
    $.ajax(settings).done(function(response) {
      cafe.infoContent += '<div id="yelp-content">Yelp rating: <a href="' +
        response.url + '" target="_blank"><img src="img/yelp_stars/small_' +
        response.rating + '.png" alt="Yelp link"/></a></div>';
      infoWindow.setContent(cafe.infoContent);
    }).fail(function(jqxhr, textStatus, error) {
      cafe.infoContent += yelpError;
      infoWindow.setContent(cafe.infoContent);
    });
  };

  // Kick off these functions when the map loads.
  googleSuccess = function() {
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow();

    self.init();
    self.createCafeLocations();
    self.sortCafeLocations();
    self.setCafeClickFunctions();

    // Put the contents of self.cafeList() into self.filteredCafeList() at first
    // so all cafes show at the first page load.
    self.filteredCafeList(self.cafeList());

    // Listener to resize the map as the user resizes the browser window.
    google.maps.event.addDomListener(window, 'resize', function() {
      map.fitBounds(bounds);
    });
  };

  googleError = function() {
    alert("There was an error loading Google Maps. Please check your internet connection and try again.");
  };

};

var Cafe = function(data) {
  var marker;
  this.title = data.title;
  this.address = data.address;
  this.city = data.city;
  this.position = data.location;
  this.neighborhood = data.neighborhood;
  this.facebook = data.facebook;
  this.instagramID = data.instagramID;
  this.yelpID = data.yelpID;

  // Putting the infoWindow content for each cafe directly in a Cafe instance
  // makes it easier to append the Yelp data without needing to use jQuery. See
  // https://discussions.udacity.com/t/knockout-binding-from-infowindow/189235/12
  // for more on how to avoid using jQuery for the infoWindows (requires you
  // to log into Udacity to view the thread).
  this.infoContent = '<div class="info-content"><div id="cafe-name"><b>' +
      data.title + '</b></div>' +
    '<div>' + data.address + '</div>' +
    '<div>' + data.neighborhood + '</div>' +
    '<div class="info-content"><a href=https://www.facebook.com/' +
      data.facebook + '/ target="_blank"><img src="img/fb_logo.png" height="29" width="29" alt="Facebook link"/></a> ' +
    '<a href=https://www.instagram.com/explore/locations/' + data.instagramID + '/ target="_blank">' +
      '<img src="img/insta_logo.png" height="29" width="29" alt="Instagram link"/></a></div>';

  marker = new google.maps.Marker({
    title: this.title,
    position: this.position,
    map: map,
  });

  this.marker = ko.observable(marker);

  // Extend the bounds variable each time a marker is created. This variable
  // will be used to resize the map once each Cafe instance is created and added
  // to self.cafeList().
  bounds.extend(marker.position);
};

// Make it go!
ko.applyBindings(new ViewModel());