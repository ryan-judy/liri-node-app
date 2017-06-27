//terminal commands
//node liri.js my-tweets
//node liri.js spotify-this-song hello
//node liri.js movie-this spy


var keys = require("./keys.js");
var require = require("require");
var fs = require("fs");
var twitter = require("twitter");
var spotify = require("spotify");

var command = process.argv[2];
var input = process.argv[3];
var output = "";


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
		    console.log(response);
		  }
		else {
			console.log("Error:"+ error);
			return;
		}
	});
};

function spotifyThis() {	
	spotify.search({ type: 'track', query: input }, function(err, data, response) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	 	else{
	 		console.log(data);
	 	}
	});
};

function getMovie() {
	request("http://www.omdbapi.com/&key=40e9cece?t=" + input + "&y=&plot=short&r=json", function(err, response, body) {
		if (!error) {
		    console.log(response);
		  }
		else {
			console.log("Error: Failed");
			return;
		}
	});
};

	if (command === "my-tweets") {
		myTweets();
	}

	else if (command === "spotify-this-song") {
		spotifyThis();
	}

	else if (command === "movie-this") {
		getMovie();
	}

	else if (command === "do-what-it-says") {
		fs.readFile( "random.txt", "utf8", function(error, data){

			if (error) {
				//log error
			}
			else {
				console.log(data)
			}

		});
	}

	else {
		console.log("Command Not Found!");
	}
