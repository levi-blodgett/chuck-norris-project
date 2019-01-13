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
    let output = '';
    // If it is a success
    if (this.status === 200 && number > 0) {
      console.log(true);
      
      // Then get the response from the API and have it be JSON parsed to be an actual object we can manipulate
      const response = JSON.parse(this.responseText);

      if (response.type === 'success') {
        // Don't loop through the response, you have to loop through the VALUE, log it if you are confused here
        // This is API-specific
        response.value.forEach(function(valueIteration) {
          output += `<li>${valueIteration.joke}</li>`;
        });
      } else {
        // If something goes wrong, display only an error
        output += '<li class="red">Something went wrong.</li>';
      }
    } else {
      // If something goes wrong, display only an error
      output += '<p class="red">Something went wrong, please try again later or with valid inputs.</p>';
    }
    // Set all the jokes inside of output to the div we created with the class of jokes
    document.querySelector('.jokes').innerHTML = output;
  }

  // Send off the data
  xhr.send();

  // Prevent the default functionality of buttons
  e.preventDefault();
}