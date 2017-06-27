var liri = require('liri');


var command = process.argv[2];
var input = process.argv[3];
var output = "";

if (command === "my-tweets") {
	output = liri.twitter;
}

else if (command === "spotify-this-song") {
	output = liri.spotify;
}

else if (command === "movie-this") {
	output = liri.ombd;
}

else if (command === "do-what-it-says") {

}

else {
	console.log("Command Not Found!");
}