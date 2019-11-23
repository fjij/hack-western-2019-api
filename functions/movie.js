const request = require('./await-request');

/*let wreck = require("@hapi/wreck")
let querystring = require("querystring")*/

function excludeGenres(expression) {
  var exclude = '';
  if (expression == 'angry') {
    exclude = '16,35,18,10751,36,27,10402,9648,10749,878,10770,53,10752,37';
  } else if (expression == 'disgusted') {
    exclude = '28,12,16,35,18,10751,14,36,9648,10749,878,10770,10752,37';
  } else if (expression == 'fearful') {
    exclude = '28,12,80,99,18,10751,14,36,10402,10749,878,10770,10752,37';
  } else if (expression == 'happy') {
    exclude = '12,80,99,14,36,27,10402,9648,878,10770,53,10752,37';
  } else if (expression == 'neutral') {
    exclude = '';
  } else if (expression == 'sad') {
    exclude = '28,12,35,80,99,18,14,36,27,9648,878,10770,53,10752,37';
  } else if (expression == 'surprised') {
    exclude = '28,12,16,35,10751,14,36,27,10402,10749,878,10770,53,37';
  }
  return exclude;
}

module.exports = async function getMovie(expression, api_key) {
  var exclude = excludeGenres(expression);

  var options = { method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie',
  qs:
   { page: '1',
     without_genres: exclude,
     include_adult: 'false',
     sort_by: 'popularity.desc',
     language: 'en-US',
     api_key: api_key},
  body: '{}' };

  var data = [];
  var unique_index = [];
  try {
    var response = await request(options);
    var movies = JSON.parse(response).results
    var j = 0;

    while (data.length < 3) {
      i = Math.floor(Math.random() * 10) + 1;
      if (!unique_index.includes(i)) {
        unique_index.push(i);
        data.push({Title: movies[i].original_title, Poster: "https://image.tmdb.org/t/p/w370_and_h556_bestv2/"+movies[i].poster_path, Summary: movies[i].overview});
      }
    }
  } catch(e) {
    console.log(e);
    return "error";
  }

  return data;

}
