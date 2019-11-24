/**
* An HTTP endpoint that acts as a webhook for HTTP or Webhook request event
* @param {string} title
* @returns {string} result The result of your workflow steps
*/

var request = require("./await-request");

/*var options = { method: 'GET',
  url: 'https://www.googleapis.com/youtube/v3/search',
  access_token: CLIENT_ID,
  key = };*/

module.exports = async function getTrailer(title) {

  var url = '';
  var q = title;
  var max = 1;

  var response = await request('https://www.googleapis.com/youtube/v3/search/?access_token='+process.env.CLIENT_ID+'&key='+process.env.YOUTUBE_API_KEY+'&part=snippet&maxResults='+max+'&q='+''+q);
  url = 'https://www.youtube.com/watch?v='+JSON.parse(response).items[0].id.videoId;
  return url;
}

/*async function test() {
  var final = await getTrailer("Frozen Trailer");
  console.log(final);
}

test();*/
