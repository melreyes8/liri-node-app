# LIRI = Language_ Interpretation and Recognition Interface

LIRI is a command line node app that takes in parameters and gives you back data. It is powered by the following NPM packages:

   * [Twitter](https://www.npmjs.com/package/twitter)
   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
   * [Request](https://www.npmjs.com/package/request)
   	    *  Request is used to grab data from the [OMDB API](http://www.omdbapi.com).
   * [DotEnv](https://www.npmjs.com/package/dotenv)

The liri.js takes in one of the following commands:

    * `node liri.js my-tweets`
       * Displays in the terminal/bash window the last 20 tweets and when each one was created 
    
    * `node liri.js spotify-this-song <song name here>`. If no song name entered, program defaults to "The Sign" by Ace of Base.
       * Displays the following data:
            * Artist Name(s)
            * The Song's Name
            * The album that the song is from
            * A preview link of the song from Spotify

    * `node liri.js movie-this <movie name here>`. If no movie name entered, program defaulst to "Mr. Nobody".
       * Displays the following data: 
            * Title of the movie
            * Year the movie came out
            * IMDB Rating of the movie
            * Rotten Tomatoes Rating of the movie
            * Country where the movie was produced
            * Language of the movie
            * Plot of the movie
            * Actors in the movie

    * `node liri.js do-what-it-says`
        * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands

## BONUS

    In addition to logging the data to the terminal/bash window, output the data to `log.txt`, and append each command ran into the `log.txt` file. Do not overwrite the file each time a command is ran.




