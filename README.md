# Project: Neighborhood Map

### About
This project uses concepts from Udacity's section on The Frontend: JavaScript & AJAX to build a mobile-friendly, single-page application featuring the Google Maps API. My map highlights my favorite ice cream shops and tea cafes in the San Francisco Bay Area. Users can select a location directly from the map or from the displayed list, and users can also use the search box to filter by location name, city, or neighborhood.

For each marker on the map I display the location's name, address, and neighborhood, plus I hard-coded links to each location's Facebook page and to Instagram photos tagged from the location. Finally, my app makes requests to the Yelp API to retrieve Yelp's rating for each location. As already mentioned, the app uses [Google Maps JavaScript](https://developers.google.com/maps/documentation/javascript/) and [Yelp](https://www.yelp.com/developers) APIs as well as [jQuery](https://jquery.com/), [KnockoutJS](http://knockoutjs.com/),and [Bootstrap](http://getbootstrap.com/). I also used [Yarn](https://yarnpkg.com/) to manage the dependencies in my app.

### Directory Contents
You'll find the following inside this directory:
1. `css/` - Contains the production Bootstrap CSS file as well as styles.css for app-specific styling.
2. `img/` - Contains the Facebook, Instagram, and Yelp icons used in the app.
3. `js/` - Contains the production KnockoutJS and jQuery files as well as the app-specific JavaScript files: app.js, helpers.js, and model.js.
4. `node_modules/` - Contains the source Bootstrap, KnockoutJS, and jQuery files I downloaded using Yarn.
5. `index.html` - HTML skeleton for the app -- and what makes everything run!
6. `package.json` - Yarn's way of keeping track of which dependencies I've installed.

### How to Run
Clone or download this repository to your desktop and open `index.html` in your browser. Or, you can use [this temporary link](https://cdn.rawgit.com/jasonally/neighborhood-map/f5d27122/dist/index.html) to view the map on the web until I learn how to use GitHub Pages.

### Building the App, Problems I Encountered, and Design Choices
In a somewhat chronological order I'll chronicle the challenges and choices I faced while building the app.

##### Getting Started
Udacity warned students that this project was hard and they were right. Udacity's [Google Maps APIs course](https://www.udacity.com/course/google-maps-apis--ud864) provided an overview and examples of how the Google Maps JavaScript APIs work, but it was up to students to take the code examples and rewrite them using the KnockoutJS framework. Of all the time I spent working on my project, most of it went into simply rendering a map with icons using KnockoutJS. The [Udacity forums](https://discussions.udacity.com/) were invaluable during this phase of development, and to some extent other students' projects were a source of inspiration. [dsbotta](https://github.com/dsbotta/Neighborhood-Map), [hipslikeyeah](https://github.com/hipslikeyeah/udacity-p5-neighborhood-map), [lastres0rt](https://github.com/lastres0rt/udacity-neighborhood-map-project) and [ToniRib](https://github.com/ToniRib/neighborhood-map) had projects which were particularly helpful, but I made my own choices in building and styling my app.

##### Facebook and Instagram Links
I consciously chose to hard-code Facebook and Instagram links into my `model.js` file. For Facebook I chose to do this because some locations on my map had actively managed business pages while other locations had static pages that appear to have been auto-generated by Facebook. I wanted to control which page users went to so I chose to hard-code instead of trying to use a Facebook API. I faced a similar decision with Instagram, since their API didn't appear to contain a way to search for posts tagged at a location. I decided to hard-code location IDs to avoid this issue altogether, though it meant I had to use Salt & Straw's Venice location since there doesn't appear to be an Instagram location for Salt & Straw's San Francisco shop.

##### Yelp Fusion
Prior students had an easier time making requests to Yelp's API, but in September 2016 Yelp launched Yelp Fusion (also known as v3 of their API) and in April 2017 they stopped allowing users to sign up for v2. A major difference in Yelp Fusion is API requests need an access token, and obtaining that access token means the API doesn't play nicely with CORS or JSON-P. [This Udacity thread](https://discussions.udacity.com/t/yelp-v3-implementation/235928/18) explains what you'll need to do, though you'll need to log into Udacity to view the discussion. I provided additional comments on my solution in my `app.js` file. I also chose to hard-code each location's Yelp ID into my `model.js` file, so I'm retrieving the rating information by using the API to search by Yelp ID.

##### Mobile-Friendly Design
I like simplicity in my design -- just check out my other Udacity projects for examples. For this project I opted for an easy Bootstrap design which resizes content based on viewport width. For smaller viewports the map wraps below the list of locations.

### Areas for Improvement
There are a lot of ways I could improve this app. To name a few: If I really wanted to I could devise a way to use the Facebook API instead of my hard-coded links to each location's Facebook page. I could also explore ways to make my Yelp API requests faster, since sometimes it takes a second or two for the rating content to load, or I could use Yelp's business search feature in their API instead of having to save the Yelp ID for each location. Finally, there are plenty of other ways I could improve the mobile-friendliness of my app. For instance, I could hide the list of locations altogether for small viewports and use a button to display the menu when users want to see it.