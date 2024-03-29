/**
* An HTTP endpoint that acts as a webhook for HTTP or Webhook request event
* @param {string} expression
* @returns {object} result The result of your workflow steps
*/


const request = require ("./await-request")

module.exports = async function spotify (expression){

  //var token = process.env.SPOTIFY_TOKEN

  var options = { method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers:
     { Authorization: 'Basic '+process.env.SPOTIFY_KEY_ENCODED,
       'Content-Type': 'application/x-www-form-urlencoded' },
    form: { grant_type: 'client_credentials' } };

	try {body = await request(options)}
	  catch(e){return "error"}

	var token = JSON.parse(body).access_token;

var arr = []; //emptry array that will store name of playlist and id of playlist
 options = { method: 'GET',
  url: 'https://api.spotify.com/v1/search',
  qs: { q: expression, type: 'playlist', limit: '50' },
  headers:
   { Authorization: 'Bearer '+ token } };

try {body = await request(options)}
  catch(e){return "error"} //so code below won't execute until request options has executed

var parsedData = JSON.parse(body); //body contains playlists
//console.log(parsedData);//50 playlist objects
//console.log(parsedData.playlists.items[0])//prints first playlist
//var playlist_id = parsedData.playlists.items[0].playlist_id

for(var i =0; i<50; i++){
  var name = parsedData.playlists.items[i].name //RETURNS NAME OF PLAYLIST
  var playlist_id = parsedData.playlists.items[i].id
  //console.log(playlist_id)
  arr.push({
      playlist_id: playlist_id,
      name: name
    })
}

//console.log(arr)
//console.log(arr[0].playlist_id)

var a = Math.floor((Math.random() * 50)); //a is a random number between 0 and 49

var options = { method: 'GET',
  url: `https://api.spotify.com/v1/playlists/${arr[a].playlist_id}/tracks`,
  headers:
   { Authorization: 'Bearer '+ token } };

try {body = await request(options)}
  catch(e){return "error"}

var parsedSongs = JSON.parse(body);

// console.log(parsedSongs);

//random integer generator

const b = Math.floor((Math.random() * parsedSongs.items.length) );


//console.log(parsedSongs.items[a].track.album.name); //returns songs from single playlist
//console.log(parsedSongs.items[a].track.album);

const selectedTrack = parsedSongs.items[b].track;

console.log('Artists: ', selectedTrack.artists.map(artist=>artist.name));
console.log('Song: ', selectedTrack.name);
console.log('Song: ', selectedTrack.id);



//console.log('AVailable MArkets: ', selectedTrack.available_markets)

//console.log(arr);
return {Artists:selectedTrack.artists.map(artist=>artist.name),
  Song: selectedTrack.name,
  id:selectedTrack.id,
Image_url:selectedTrack.album.images[0].url} //id gives ID
}
