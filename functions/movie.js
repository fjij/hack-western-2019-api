const request = require('./await-request');

/*let wreck = require("@hapi/wreck")
let querystring = require("querystring")*/

function getGenres(expression) {
  var genres = '';
  if (expression == 'angry') {
    genres = '28, 12, 14, 80, 99, 9648';
  } else if (expression == 'disgusted') {
    genres = '10402, 27, 53, 80, 99';
  } else if (expression == 'fearful') {
    genres = '27, 53, 9648';
  } else if (expression == 'happy') {
    genres = '35, 10751, 16, 28, 10749, 18';
  } else if (expression == 'neutral') {
    genres = '';
  } else if (expression == 'sad') {
    genres = '10749, 10751, 18, 10402, 16';
  } else if (expression == 'surprised') {
    genres = '18, 9648, 80, 99, 10752';
  }
  return genres;
}

module.exports = async function getMovie(expression, api_key) {
  var genres = getGenres(expression);
  var page = Math.floor(Math.random() * 50) + 1;

  var options = { method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie',
  qs:
   { page: ''+page,
     with_genres: genres,
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
