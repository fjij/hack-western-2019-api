const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
/**
* An HTTP endpoint that acts as a webhook for HTTP or Webhook request event
* @param {string} mood
* @returns {object} result The result of your workflow steps
*/
module.exports = async (mood) => {

  // Prepare workflow object to store API responses

  let result = {};

  // [Workflow Step 1]

  console.log(`Running giphy.search[@0.0.9].gifs()...`);

  result.step1 = {};
  result.step1.gifs = await lib.giphy.search['@0.0.9'].gifs({
    query: `${mood}`,
    rating: `pg`
  });

  return result;
};