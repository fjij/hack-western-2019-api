const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
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

	//result.test = {test_key: process.env.TEST_KEY};
	return result;
};

async function giphy(expression) {

	console.log(`Running giphy.search[@0.0.9].gifs()...`);

	let giphy_search;

	if (expression != "neutral") {
		giphy_search = "dogs";
	} else {
		giphy_search = "lake";
	}

	gifs = await lib.giphy.search['@0.0.9'].gifs({
		query: `${giphy_search}`,
		rating: `pg`
	});

	return gifs;
}
