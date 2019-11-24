const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const movie = require('./movie');
/**
* An HTTP endpoint that acts as a webhook for HTTP or Webhook request event
* @param {object} expression
* @returns {object} result The result of your workflow steps
*/

/*
	expressions:
			angry,
			disgusted,
			fearful,
			happy,
			neutral,
			sad,
			surprised
*/
module.exports = async (expression) => {

	let result = {};

	// giphy
	result.giphy = await giphy(expression);
	result.movie = await movie(expression, process.env.MOVIE_KEY);

	//result.test = {test_key: process.env.TEST_KEY};
	return result;
};

async function giphy(expression) {

	console.log(`Running giphy.search[@0.0.9].gifs()...`);

	let giphy_search = expression;

	gifs = await lib.giphy.search['@0.0.9'].gifs({
		query: `${giphy_search}`,
		rating: `pg`
	});
	var i = Math.floor(Math.random() * 17);
	return gifs.slice(i, i+3).map(x => x.images.original.url);
}
