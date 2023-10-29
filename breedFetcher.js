const request = require('request');
const breedName = process.argv.slice(2);

const fetchBreedDescription = (breedName, callback) =>
  request(`https://api.thecatapi.com/v1/breeds/search?q=${breedName}`, (error, response, body) =>  {
  //this is the syntax for request library
  //console.error('error:', error); // Print the error if one occurred //if it comes with an error
    if (error) {
      return callback(`Failed request: ${error}`, null); //the callback function will console this
    }
    const data = JSON.parse(body); //this converts string --> object
    const breed = data[0];

    if (breed) {
      return callback(null, breed.description); //dot description b/c object
    } else {
      return callback(`Failed to find breed ${breedName}`, null);
    }
  });

fetchBreedDescription(breedName, (error, description) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    console.log(description);
  }
});
