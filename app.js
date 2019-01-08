// Add event listener for the button
document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
  // How many jokes the user wants
  const number = document.querySelector('input[type="number"]').value;

  // Initialize object
  const xhr = new XMLHttpRequest();

  // Get x amount of random jokes, get is type of request, url is where to go for it, and true makes it async
  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

  //
  xhr.onload = function() {
    // If it is a success
    if (this.status === 200) {
      // Then get the response from the API and have it be JSON parsed to be an actual object we can manipulate
      const response = JSON.parse(this.responseText);

      let output = '';

      if (response.type === 'success') {
        // Don't loop through the response, you have to loop through the VALUE, log it if you are confused here
        // This is API-specific
        response.value.forEach(function(valueIteration) {
          output += `<li>${valueIteration.joke}</li>`;
        });
      } else {
        output += '<li>Something went wrong.</li>';
      }

      
      document.querySelector('.jokes').innerHTML = output;
    }
  }

  // Send off the data
  xhr.send();

  e.preventDefault();
}