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
			suprised
*/
module.exports = async (expression) => {

	// Prepare workflow object to store API responses

	let result = {};

	// Giphy Integration

	console.log(`Running giphy.search[@0.0.9].gifs()...`);

	// giphy test
	let giphy_search;
	if (expression != "neutral") {
		giphy_search = "dogs";
	} else {
		giphy_search = "lake";
	}
	giphy();

	result.step1 = {};
	result.step1.gifs = await lib.giphy.search['@0.0.9'].gifs({
	query: `${giphy_search}`,
	rating: `pg`
	});
	result.test = {test_key: process.env.TEST_KEY};
	return result;
};

function giphy() {
	return;
}
