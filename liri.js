
// Take two arguments.
// The first will be the action (i.e. "my-tweets", "spotify-this-song", etc.)
// The second will be the amount that will be the searchword.
var action = process.argv[2];
var searchword = process.argv[3];
// Load the fs package to read and write
var fs = require("fs");


// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (action) {

  case "my-tweets":
    tweets();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    movie();
    break;

  case "Do-what-i-say":
    Dommy();
    break;
}

   // Writng the functions (tweets(), spotify(), movie() and Dommy();)
function tweets(){
    
       var Twitter = require('twitter');

       var keys = require("./key.js");
      
    // Getting the keys from the key.js file
        var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
         });
       
        var params = {silver_ehiwario: 'nodejs'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
          if (!error) {
                  for (i = 0; i < tweets.length; i++) {
                  console.log(tweets[i].text);
                  console.log(tweets[i].created_at);
                  fs.appendFile('log.txt', tweets[i].text + " Created on: " + tweets[i].created_at + "\n");
                  }   
                     }
    
                      else{
                          console.log(error);
                          }
                  });

              }



function spotify(){

      var Spotify = require('node-spotify-api');
      
      var keys = require("./key.js");

     // Getting the keys from the key.js file
      var spotify = new Spotify({
                               id: keys.spotifyKeys.id,
                               secret: keys.spotifyKeys.secret
                                });
 

      if(!searchword){
         spotify.search({ type: 'track', query: "The Sign", limit: 1}, function(err, data) {
             if (err) {
            return console.log('Error occurred: ' + err);
             }
 
          //console.log(data); 
            var songInfo = data.tracks.items[0];
            var songResult = console.log('Artists:'+ songInfo.artists[0].name)
                           console.log('Song Name:'+songInfo.name)
                           console.log('Album Name:'+ songInfo.album.name)
                           console.log('Spotify Preview Link:'+ songInfo.external_urls.spotify)
                           fs.appendFile('log.txt', "Artists: " + songInfo.artists[0].name + "\n" + "Song Name: " + songInfo.name + "\n" + "Spotify Preview Link: " + songInfo.external_urls.spotify + "\n" + "Album: " + songInfo.album.name  + "\n" + "=================================================================");
                           fs.appendFile('log.txt', "=================================================================");

                           console.log(songResult);


                   return;
             });

       } else {

            spotify.search({ type: 'track', query: searchword, limit: 1 }, function(err, data) {
                if (err) {
                return console.log('Error occurred: ' + err);
                       }
             
                      var songInfo = data.tracks.items[0];
                        var songResult = console.log('Artists:'+ songInfo.artists[0].name)
                                       console.log('Song Name:'+songInfo.name)
                                       console.log('Album Name:'+ songInfo.album.name)
                                       console.log('Spotify Preview Link:'+ songInfo.external_urls.spotify)
                                       fs.appendFile('log.txt', "Artists: " + songInfo.artists[0].name + "\n" + "Song Name: " + songInfo.name + "\n" + "Spotify Preview Link: " + songInfo.external_urls.spotify + "\n" + "Album: " + songInfo.album.name  + "\n" + "=================================================================");

                                      console.log(songResult);

                         return;
                   });
                }


        }
  


function movie() {

  var request = require("request");

 // Grab the searchname which will always be the third node argument.

 // Then run a request to the OMDB API with the search specified

    if(!searchword){
      var queryUrl = "http://www.omdbapi.com/?t=" + "Mr. Nobody" + "&y=&plot=short&apikey=40e9cece";
      console.log(queryUrl);

      request(queryUrl, function(error, response, body) {

         // If the request is successful
          if (!error && response.statusCode === 200) {
          console.log("Since you don't have an input we have one for you, Check out Mr. Nobody It is on Netflix");
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Release Year: " + JSON.parse(body).Year);
          console.log("Rating: " + JSON.parse(body).imdbRating);
          console.log("Country: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Actors: " + JSON.parse(body).Actors);
          console.log("URL: " + JSON.parse(body).tomatoURL);
          fs.appendFile('log.txt', "Title: " + JSON.parse(body).Title + "\n" + "Year: " + JSON.parse(body).Year + "\n" + "IMDB Rating: " + JSON.parse(body).imdbRating + "\n" + "Country: " + JSON.parse(body).Country + "\n" + "Language: " + JSON.parse(body).Language+ "\n" + "Plot: " + JSON.parse(body).Plot + "\n" + "Actors: " + JSON.parse(body).Actors + "\n"  + "Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL + "\n" + "=================================================================");
          fs.appendFile('log.txt', "=================================================================");
           }
        });
     }
      else{
           var queryUrl = "http://www.omdbapi.com/?t=" + searchword + "&y=&plot=short&apikey=40e9cece";

           // This line is just to help us debug against the actual URL.
            console.log(queryUrl);

            request(queryUrl, function(error, response, body) {

            // If the request is successful
            if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("URL: " + JSON.parse(body).tomatoURL);
            fs.appendFile('log.txt', "Title: " + JSON.parse(body).Title + "\n" + "Year: " + JSON.parse(body).Year + "\n" + "IMDB Rating: " + JSON.parse(body).imdbRating + "\n" + "Country: " + JSON.parse(body).Country + "\n" + "Language: " + JSON.parse(body).Language+ "\n" + "Plot: " + JSON.parse(body).Plot + "\n" + "Actors: " + JSON.parse(body).Actors + "\n"  + "Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL + "\n" + "=================================================================");
            }
         });
       }
 }


function Dommy() {

   var fs = require("fs");

   fs.writeFile("random.txt", "movie-this, spiderman", function(error) {

     // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
        }

      //Otherwise, it will print: "random.txt was updated!"
     console.log("random.txt was updated!");

     });


     // This block of code will read from the "random.txt" file.
     // The code will store the contents of the reading inside the variable "data"
     fs.readFile("random.txt", "utf8", function(error, data) {



     // If the code experiences any errors it will log the error to the console.
     if (error) {
        return console.log(error);
      }

        else{
          var dataArray = data.split(",");
          var action = dataArray[0];
          var searchword = dataArray[1];

          // cases
          switch(action) {
          case "my-tweets":
          tweets();
          break;
          case "spotify-this-song":

          function spotify() {
              var Spotify = require('node-spotify-api');
              
              var keys = require("./key.js");

              var spotify = new Spotify({
                 id: keys.spotifyKeys.id,
                 secret: keys.spotifyKeys.secret
               });
 

              if(!searchword){
                 spotify.search({ type: 'track', query: "The Sign", limit: 1}, function(err, data) {
                  if (err) {
                      return console.log('Error occurred: ' + err);
                      }
 
                  //console.log(data); 
                 var songInfo = data.tracks.items[0];
                 var songResult =console.log('Artists:'+ songInfo.artists[0].name)
                                 console.log('Song Name:'+songInfo.name)
                                 console.log('Album Name:'+ songInfo.album.name)
                                 console.log('Preview:'+ songInfo.preview_url)
                                 fs.appendFile('log.txt', "Artists: " + songInfo.artists[0].name + "\n" + "Song Name: " + songInfo.name + "\n" + "Spotify Preview Link: " + songInfo.external_urls.spotify + "\n" + "Album: " + songInfo.album.name  + "\n" + "=================================================================");
                                 fs.appendFile('log.txt', "=================================================================");

                                 console.log(songResult);

                                return;
                              }); 
                            } 
                               else {

                                     spotify.search({ type:'track', query: searchword, limit: 2 }, function(err, data) {
                                        if (err) {
                                        return console.log('Error occurred: ' + err);
                                        }
                                 
                                        var songInfo = data.tracks.items[0];
                                        var songResult = console.log('Artists:'+ songInfo.artists[0].name)
                                                     console.log('Song Name:'+songInfo.name)
                                                     console.log('Album Name:'+ songInfo.album.name)
                                                     console.log('Preview:'+ songInfo.preview_url)
                                                     fs.appendFile('log.txt', "Artists: " + songInfo.artists[0].name + "\n" + "Song Name: " + songInfo.name + "\n" + "Spotify Preview Link: " + songInfo.external_urls.spotify + "\n" + "Album: " + songInfo.album.name  + "\n" + "=================================================================");

                                                      console.log(songResult);

                                                     return;
                                                   });
                                       }

                         }
              spotify();
              break;

          case "movie-this":
          function movie() {
          var request = require("request");
            if(!searchword){
               var queryUrl = "http://www.omdbapi.com/?t=" + "Mr. Nobody" + "&y=&plot=short&apikey=40e9cece";
               console.log(queryUrl);

              request(queryUrl, function(error, response, body) {

              // If the request is successful
              if (!error && response.statusCode === 200) {
              console.log("Since you don't have an input we have one for you, Check out Mr. Nobody It is on Netflix");
              console.log("Title: " + JSON.parse(body).Title);
              console.log("Release Year: " + JSON.parse(body).Year);
              console.log("Rating: " + JSON.parse(body).imdbRating);
              console.log("Country: " + JSON.parse(body).Country);
              console.log("Language: " + JSON.parse(body).Language);
              console.log("Plot: " + JSON.parse(body).Plot);
              console.log("Actors: " + JSON.parse(body).Actors);
              console.log("URL: " + JSON.parse(body).tomatoURL);
              fs.appendFile('log.txt', "Title: " + JSON.parse(body).Title + "\n" + "Year: " + JSON.parse(body).Year + "\n" + "IMDB Rating: " + JSON.parse(body).imdbRating + "\n" + "Country: " + JSON.parse(body).Country + "\n" + "Language: " + JSON.parse(body).Language+ "\n" + "Plot: " + JSON.parse(body).Plot + "\n" + "Actors: " + JSON.parse(body).Actors + "\n"  + "Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL + "\n" + "=================================================================");
              fs.appendFile('log.txt', "=================================================================");

                     }

              });
           }
           else{
                var queryUrl = "http://www.omdbapi.com/?t=" + searchword + "&y=&plot=short&apikey=40e9cece";

                // This line is just to help us debug against the actual URL.
                console.log(queryUrl);

                request(queryUrl, function(error, response, body) {

                // If the request is successful
               if (!error && response.statusCode === 200) {

              // Parse the body of the site and recover just the imdbRating
              // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
               console.log("Title: " + JSON.parse(body).Title);
              console.log("Release Year: " + JSON.parse(body).Year);
              console.log("Rating: " + JSON.parse(body).imdbRating);
              console.log("Country: " + JSON.parse(body).Country);
              console.log("Language: " + JSON.parse(body).Language);
              console.log("Plot: " + JSON.parse(body).Plot);
              console.log("Actors: " + JSON.parse(body).Actors);
              console.log("URL: " + JSON.parse(body).tomatoURL);
              fs.appendFile('log.txt', "Title: " + JSON.parse(body).Title + "\n" + "Year: " + JSON.parse(body).Year + "\n" + "IMDB Rating: " + JSON.parse(body).imdbRating + "\n" + "Country: " + JSON.parse(body).Country + "\n" + "Language: " + JSON.parse(body).Language+ "\n" + "Plot: " + JSON.parse(body).Plot + "\n" + "Actors: " + JSON.parse(body).Actors + "\n"  + "Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL + "\n" + "=================================================================");


                }
           });
       }
  }
  movie();
  break;
  }
}
});
}

 


