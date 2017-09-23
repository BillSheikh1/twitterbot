var TwitterPackage = require('twitter');



// importing my secret.json file

var secret = {
  consumer_key: '3Btk3hzMYKFEWH5Upg0MQ7RR0',
  consumer_secret: 'qD0wxoK6oFaXWCuzhl3X3MmdcQ1VDQQ4WUCWJGrkmpzrvbMonJ',
  access_token_key: '911361446675656704-Ncx4qOlTXFLfYa3ptwTinYgawkCev9k',
  access_token_secret: 'K8Mc9iEiEeS33Si9fJwf9qdm0tBka67SfefLPsyDIqQUO'
}

//make a new Twitter object

var Twitter = new TwitterPackage(secret);


var post = Twitter.post('statuses/update', {status: 'Tech'}, function(error, tweet, response) {
  if(error) {
    console.log(error);
  }
  else {
    console.log(tweet);
    console.log(response);
  }
});


Twitter.stream('statuses/filter', {track: '#peaceday'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});