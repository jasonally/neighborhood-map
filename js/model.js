// model.js - Contains the data used in the app.

// Each cafe has a title, address, city, neighborhood, location in
// geo-coordinates, and IDs for Facebook, Instagram, and Yelp. It was a
// lot of hardcoding but I wanted to guarantee the social media links
// would work properly.
var cafeLocations = [
    {
        title: "Uji Time Dessert",
        address: "2575 Telegraph Ave, Berkeley, CA 94704",
        city: "Berkeley",
        neighborhood: "Elmwood",
        location: {lat: 37.8636571, lng: -122.2582877},
        facebook: "UjiTimeDessert",
        instagramID: 933438586722369,
        yelpID: "uji-time-dessert-berkeley"
    },
    {
        title: "Fenton's Creamery",
        address: "4226 Piedmont Ave, Oakland, CA 94611",
        city: "Oakland",
        neighborhood: "Piedmont",
        location: {lat: 37.8280397, lng: -122.2500929},
        facebook: "fentonscreamery",
        instagramID: 93157,
        yelpID: "fentons-creamery-oakland-2"
    },
    {
        title: "Lala's Creamery",
        address: "134 Petaluma Blvd N, Petaluma, CA 94952",
        city: "Petaluma",
        neighborhood: "Downtown",
        location: {lat: 38.2348812, lng: -122.6405575},
        facebook: "Lalas-Creamery-122878727776661",
        instagramID: 294580,
        yelpID: "lalas-creamery-petaluma"
    },
    {
        title: "Tin Pot Creamery",
        address: "201 1st St, Los Altos, CA 94022",
        city: "Los Altos",
        neighborhood: "North Los Altos",
        location: {lat: 37.3786187, lng: -122.1182178},
        facebook: "TinPotCreamery",
        instagramID: 832907199,
        yelpID: "tin-pot-creamery-los-altos"
    },
    {
        title: "Tea Era",
        address: "271 Castro St, Mountain View, CA 94041",
        city: "Mountain View",
        neighborhood: "Downtown",
        location: {lat: 37.39295610000001, lng: -122.0792811},
        facebook: "pages/Tea-Era/182983888488847",
        instagramID: 559176,
        yelpID: "tea-era-mountain-view-2"
    },
    {
        title: "Gelato Classico",
        address: "435 Emerson St, Palo Alto, CA 94301",
        city: "Palo Alto",
        neighborhood: "Downtown",
        location: {lat: 37.4451625, lng: -122.1633587},
        facebook: "pages/Gelato-Classico/137237989650606",
        instagramID: 822838,
        yelpID: "gelato-classico-palo-alto"
    },
    {
        title: "Rick's Ice Cream",
        address: "3946 Middlefield Rd, Palo Alto, CA",
        city: "Palo Alto",
        neighborhood: "Greenmeadow",
        location: {lat: 37.418584, lng: -122.1092156},
        facebook: "Ricks-Rather-Rich-Ice-Cream-111316175619840",
        instagramID: 314552181,
        yelpID: "ricks-ice-cream-palo-alto"
    },
    {
        title: "Boba Guys (San Carlos)",
        address: "872 Laurel St, San Carlos, CA 94070",
        city: "San Carlos",
        neighborhood: "Downtown",
        location: {lat: 37.5026808, lng: -122.2570576},
        facebook: "bobaguys",
        instagramID: 1500547193309669,
        yelpID: "boba-guys-san-carlos-2"
    },
    {
        title: "Bi-Rite Creamery (Mission)",
        address: "3692 18th St, San Francisco, CA 94110",
        city: "San Francisco",
        neighborhood: "Mission District",
        location: {lat: 37.76159, lng: -122.425717},
        facebook: "biritecreamery",
        instagramID: 401,
        yelpID: "bi-rite-creamery-san-francisco"
    },
    {
        title: "Bi-Rite Creamery (NoPa)",
        address: "550 Divisadero St, San Francisco, CA 94117",
        city: "San Francisco",
        neighborhood: "North of the Panhandle",
        location: {lat: 37.774798, lng: -122.437463},
        facebook: "biritecreamery",
        instagramID: 73168236,
        yelpID: "bi-rite-market-san-francisco-3"
    },
    {
        title: "Boba Guys (Fillmore)",
        address: "1522 Fillmore St, San Francisco, CA 94115",
        city: "San Francisco",
        neighborhood: "Fillmore",
        location: {lat: 37.7836676, lng: -122.4325729},
        facebook: "bobaguys",
        instagramID: 602460303281110,
        yelpID: "boba-guys-san-francisco-10"
    },
    {
        title: "Boba Guys (Hayes Valley)",
        address: "8 Octavia St #308, San Francisco, CA 94102",
        city: "San Francisco",
        neighborhood: "Hayes Valley",
        location: {lat: 37.77286429999999, lng: -122.4234767},
        facebook: "bobaguys",
        instagramID: 1705982506356332,
        yelpID: "boba-guys-san-francisco-7"
    },
    {
        title: "Garden Creamery",
        address: "3566 20th St, San Francisco, CA 94110",
        city: "San Francisco",
        neighborhood: "Mission District",
        location: {lat: 37.7587987, lng: -122.4205086},
        facebook: "gardencreamery",
        instagramID: 116049255097890,
        yelpID: "garden-creamery-san-francisco-3"
    },
    {
        title: "The Ice Cream Bar",
        address: "815 Cole St, San Francisco, CA 94117",
        city: "San Francisco",
        neighborhood: "Cole Valley",
        location: {lat: 37.76645490000001, lng: -122.4502432},
        facebook: "icecreambarsf",
        instagramID: 5882549,
        yelpID: "the-ice-cream-bar-san-francisco"
    },
    {
        title: "Humphry Slocombe",
        address: "1 San Francisco Ferry Bldg, San Francisco, CA 94111",
        city: "San Francisco",
        neighborhood: "Embarcadero",
        location: {lat: 37.79569, lng: -122.393693},
        facebook: "humphryslocombe",
        instagramID: 231628533,
        yelpID: "humphry-slocombe-ice-cream-san-francisco-4"
    },
    {
        title: "Mr. and Mrs. Miscellaneous",
        address: "699 22nd St, San Francisco, CA",
        city: "San Francisco",
        neighborhood: "Dogpatch",
        location: {lat: 37.7578322, lng: -122.3881254},
        facebook: "Mr-and-Mrs-Miscellaneous-126193770733086",
        instagramID: 14420,
        yelpID: "mr-and-mrs-miscellaneous-san-francisco"
    },
    {
        title: "Salt & Straw",
        address: "2201 Fillmore St, San Francisco, CA 94115",
        city: "San Francisco",
        neighborhood: "Pacific Heights",
        location: {lat: 37.7899812, lng: -122.4342061},
        facebook: "SaltandStraw",
        instagramID: 1024685049,
        yelpID: "salt-and-straw-san-francisco-4"
    },
    {
        title: "San Francisco's Hometown Creamery",
        address: "1290 9th Ave, San Francisco, CA 94122",
        city: "San Francisco",
        neighborhood: "Sunset District",
        location: {lat: 37.7644063, lng: -122.4661628},
        facebook: "sanfranshometowncreamery",
        instagramID: 699484133562949,
        yelpID: "san-franciscos-hometown-creamery-san-francisco"
    },
    {
        title: "Smitten Ice Cream",
        address: "904 Valencia St, San Francisco, CA",
        city: "San Francisco",
        neighborhood: "Mission District",
        location: {lat: 37.7583044, lng: -122.4215343},
        facebook: "SmittenIceCream",
        instagramID: 1274733285897549,
        yelpID: "smitten-ice-cream-san-francisco-10"
    },
    {
        title: "Icicles",
        address: "1275 Lincoln Ave #1, San Jose, CA 95125",
        city: "San Jose",
        neighborhood: "Willow Glen",
        location: {lat: 37.3052139, lng: -121.8993203},
        facebook: "icicles.creamroll",
        instagramID: 1735547070022785,
        yelpID: "icicles-san-jose-7"
    },
    {
        title: "JT Express",
        address: "170 Jackson St, San Jose, CA 95112",
        city: "San Jose",
        neighborhood: "Japantown",
        location: {lat: 37.34852559999999, lng: -121.8948555},
        facebook: "JT-Express-1209701299114693",
        instagramID: 1209701299114693,
        yelpID: "jt-express-san-jose-2"
    },
    {
        title: "Sweet Rendezvous",
        address: "668 Blossom Hill Rd, San Jose, CA 95123",
        city: "San Jose",
        neighborhood: "South San Jose",
        location: {lat: 37.2492919, lng: -121.8457816},
        facebook: "SanJoseSweetRendezvous",
        instagramID: 216722576,
        yelpID: "sweet-rendezvous-san-jose"
    },
    {
        title: "Tea Lyfe",
        address: "989 Story Rd #8018, San Jose, CA",
        city: "San Jose",
        neighborhood: "Vietnam Town",
        location: {lat: 37.33243, lng: -121.857771},
        facebook: "tealyfedrinks",
        instagramID: 298425707268049,
        yelpID: "tea-lyfe-drinks-san-jose-3"
    }
];