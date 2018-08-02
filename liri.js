// At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

// Node packages installed with modules needed to run the functions
var fs = require("fs"); //File System (FS) internal library; reads and writes files
var keys = require("./keys.js"); // liri.js loads the module keys.js
var Twitter = require("twitter"); // "twitter" module acquired through 'npm install twitter' 
var client = new Twitter(keys.twitter); // links to twitter consumer key, token, and secret codes 
var Spotify = require("node-spotify-api"); // "spotify" module acquired through 'npm install node-spotify-api'
var spotify = new Spotify(keys.spotify); // links to spotify ID and secret code
var request = require("request"); // "request" module acquired through 'npm install request'. This is needed for OMDB API.

// Make it so liri.js can take in one of the following commands:
// * `my-tweets`
// * `spotify-this-song`
// * `movie-this`
// * `do-what-it-says`

var liriCommands = process.argv[2];

switch(liriCommands) {
    case "my-tweets": 
        myTweets(); 
        break;
    case "spotify-this-song": 
        spotifyThisSong(); 
        break;
    case "movie-this": 
        movieThis(); 
        break;
    case "do-what-it-says": 
        doWhatItSays(); 
        break;
        // Instructions displayed to the user
    default: console.log("\r\n" +"Type one of the following commands after 'node liri.js' : " + "\r\n" +
        "my-tweets" + "\r\n" +
        "spotify-this-song 'any song name' " + "\r\n" +
        "movie-this 'any movie name' " + "\r\n" +
        "do-what-it-says" + "\r\n" +
        "IMPORTANT: You must use quotation marks on multi-word movie or song name");
};

// Twitter 
// `node liri.js my-tweets`
// This will show my last 20 tweets and when they were created at in your terminal/bash window.

function myTweets() {
    var params = {screen_name: "MellehReyes", count: 20};
    client.get("statuses/user_timeline", params, function(err, tweets, response){
        if(!err){
            for(var i = 0; i < tweets.length; i++){
                var twitterResults = 
                "@" + tweets[i].user.screen_name + ": " + 
                tweets[i].text + "\r\n" + 
                tweets[i].created_at + "\r\n" + 
                "------------------------------ " + i + " ------------------------------" + "\r\n";
                console.log(twitterResults);
                log(twitterResults);
             }
        }
    });
};

// Spotify API
// `node liri.js spotify-this-song '<song name here>'`
// This will show the following information about the song in your terminal/bash window
//  * Artist(s)
//  * The song's name
//  * A preview link of the song from Spotify
//  * The album that the song is from
//  * If no song is provided then your program will default to "The Sign" by Ace of Base.

function spotifyThisSong() {
    var songName = process.argv[3];
    if(!songName){
        songName = "The Sign (US Album) [Remastered]";
    }
    params = songName;
    spotify.search({ type: "track", query: params }, function(err, data) {
        if(!err){
            var songInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (songInfo[i] != undefined) {
                    var spotifyResults =
                    "Artist(s): " + songInfo[i].artists[0].name + "\r\n" +
                    "Song's Name: " + songInfo[i].name + "\r\n" +
                    "Album the song is from: " + songInfo[i].album.name + "\r\n" +
                    "Preview Url: " + songInfo[i].preview_url + "\r\n" +
                    "------------------------------ " + i + " ------------------------------" + "\r\n";
                    console.log(spotifyResults);
                    log(spotifyResults); 
                }
            }
        }	else {
            console.log("Error :"+ err);
            return;
        }
    });
};  

// OMDB API
// `node liri.js movie-this '<movie name here>'`
//  * This will output the following information to your terminal/bash window:
//      ```
//      * Title of the movie.
//      * Year the movie came out.
//      * IMDB Rating of the movie.
//      * Rotten Tomatoes Rating of the movie.
//      * Country where the movie was produced.
//      * Language of the movie.
//      * Plot of the movie.
//      * Actors in the movie.
//      ```
//  * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//  * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

function movieThis(){
    var movie = process.argv[3];
    if(!movie){
        movie = "Mr. Nobody";
    }
    params = movie;
    // request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true", function (err, response, body) {
    request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&apikey=trilogy", function (err, response, body) {        
        if (!err && response.statusCode == 200) {
            var movieObject = JSON.parse(body);
            //console.log(movieObject); // Show the text in the terminal
            var movieResults =
            // "------------------------------ begin ------------------------------" + "\r\n"
            "Movie Title: " + movieObject.Title+"\r\n"+
            "Year Released: " + movieObject.Year+"\r\n"+
            "IMDB Rating: " + movieObject.imdbRating+"\r\n"+
            "Rotten Tomatoes Rating: " + movieObject.Ratings[1].Value +"\r\n"+
            "Country: " + movieObject.Country+"\r\n"+
            "Language: " + movieObject.Language+"\r\n"+
            "Plot: " + movieObject.Plot+"\r\n"+
            "Actors: " + movieObject.Actors+"\r\n";

            console.log(movieResults);
            log(movieResults);
        } else {
            console.log("Error :"+ err);
            return;
        }
    });
};

// Do What it Says
// `node liri.js do-what-it-says`
//  * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//  * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`. 
//  * Feel free to change the text in that document to test out the feature for other commands.

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (!error) {
            doWhatItSaysResults = data.split(",");
            spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
        } else {
            console.log("Error occurred" + error);
        }
    });
};

// Do What It Says function, uses the reads and writes module to access the log.txt file and write everything that returns in terminal in the log.txt file
function log(logResults) {
    fs.appendFile("log.txt", logResults, function (error) {
        if(!error) {
            return console.log(error);
        }
    });
};