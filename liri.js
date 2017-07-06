//terminal commands
//node liri.js my-tweets
//node liri.js spotify-this-song
//node liri.js movie-this
//node liri.js do-what-it-says


var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var twitter = require("twitter");
var SpotifyWebApi = require('spotify-web-api-node');

var nodeArgs = process.argv;
var command = process.argv[2];
var input = process.argv[3];

function myTweets() {
	var client = new twitter({
			consumer_key: keys.twitterKeys.consumer_key,
			consumer_secret: keys.twitterKeys.consumer_secret,
			access_token_key: keys.twitterKeys.access_token_key,
			access_token_secret: keys.twitterKeys.access_token_secret, 
		});
	var params = {screen_name: "10outof10cat"};
	client.get("statuses/user_timeline", params, function(error, data, response) {
		if (!error) {
			for (var i = 0; i < data.length; i++) {
		    console.log(data[i].created_at)
		    console.log(data[i].text)
		    console.log("-----------------------")
		  }
		}
		else {
			console.log("Error:"+ error);
			return;
		}
	});
};

function spotifyThis() {


var scopes = ['user-read-private', 'user-read-email'],
    redirectUri = keys.spotifyKeys.redirectUri,
    clientId = keys.spotifyKeys.clientId,
    state = 'some-state-of-my-choice';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
  redirectUri : redirectUri,
  clientId : clientId
});

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

// https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
console.log(authorizeURL);

spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', {limit: 10, offset: 20})
  .then(function(data) {
    console.log('Album information', data.body);
  }, function(err) {
    console.error(err);
  });

};

function getMovie() {

	for (var i = 3; i < nodeArgs.length; i++) {
	  if (i > 3 && i < nodeArgs.length) {
	    input = input + "+" + nodeArgs[i];
	  }

	}
	console.log(input)
	var queryURL = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&r=json&apikey=40e9cece";

	console.log(queryURL)
	request(queryURL, function(err, response, body) {
		if (!err && response.statusCode === 200) {
		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("Rating: " + JSON.parse(body).imdbRating);
		    console.log("Country: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		    console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
		  }

		else {
			console.log("Error: Failed");
		}
	});
};

function writeFile() {
  fs.appendFile("log.txt", command + ",", function(err) {
    if (err) {
      return console.log(err);
    }
  });	
};


	if (command === "my-tweets") {
		myTweets();
		writeFile();
	}

	else if (command === "spotify-this-song") {
		if (typeof input !== "undefined" ) {
			spotifyThis();
			writeFile();

		} else {
			input = "The Sign";
			spotifyThis();
			writeFile();
		}
	}

	else if (command === "movie-this") {
		if (typeof input !== "undefined" ) {
			getMovie();
			writeFile();

		} else {
			input = "Mr.+Nobody";
			getMovie();
			writeFile();
		}
	}

	else if (command === "do-what-it-says") {
		fs.readFile( "random.txt", "utf8", function(error, data){

			if (error) {
				//log error
			}
			else {
				console.log(data)
				input = data.split(",");
				command = input[0];
				input = input[1];
				if (command = "movie-this") {
					getMovie();

				} 
				else {
					spotifyThis();
				}
			}

		});
	}

	else {
		console.log("Command Not Found!");
	}

