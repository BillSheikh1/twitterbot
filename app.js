var TwitterPackage = require('twitter');

var secret = {

  consumer_key: '',

  consumer_secret: '',

  access_token_key: '',

  access_token_secret: ''

}

//make a new twitter object

var Twitter = new TwitterPackage(secret);
var tweets = [];

/**
 * Generates jokes.
 */
var makeJokes = function() {
  var jokes = require('one-liner-joke');
  var getRandomJoke = jokes.getRandomJoke();
  var all = JSON.stringify(getRandomJoke);
  var allArray = all.split(":");
  var final = allArray[1].split('"');
  return final[1];
}

/**
 * Removes @'s.
 */
var makeTweet = function(tweet) {
  var finalTweet = "";
  for(var i = 0; i<tweet.length; i++) {
    if(tweet[i] != "@") {
      finalTweet += tweet[i];
    }
  }
  return finalTweet;
}

/**
 * Tests the sentiment of the statement.
 */
var testSentiment = function(text) {
  var tweet = makeTweet(text);
  var sentiment = require('sentiment');
  var r1 = sentiment(tweet);

  if(r1 > 0) {
    Twitter.post('statuses/update', {status: tweet}, function(error, tweets, response) {
      console.log(tweet);
      if(error) {
        console.log(error);
      }
      tweets = [];
    });
  }
  else {
    testSentiment(makeJokes());
  }
}

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback

Twitter.stream('statuses/filter', {track: '#peaceday'}, function(stream) {

  stream.on('data', function(tweet) {

    console.log(tweet.text);
    tweets.push(tweet);

    stream.on('error', function(error) {

      console.log(error);

    });

  });

});

var time = setInterval(function() {
  if(tweets.length != 0) {
    var random = Math.floor(Math.random() * tweets.length) + 0;
    testSentiment(tweets[random].text);
  }
  else {
    testSentiment(makeJokes());
  }
}, 3600000);