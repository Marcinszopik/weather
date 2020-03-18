$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    asyncApiCall();

    (() => {
      try {
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=21a6e9c2037c97b8495a71b97b081a4f`);
        let jsonifiedResponse;
        if (response.ok && response.status == 200) {
          jsonifiedResponse = await response.json();
        } else {
          jsonifiedResponse = false;
        }
        getElements(jsonifiedResponse);
      } catch {
        getElements(false);
      }
    })()

    const getElements = function(response) {
      if (response) {
        $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
        $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
      } else {
        $('.showHumidity').text(`There was an error handling your request.`);
        $('.showTemp').text(`Please check your inputs and try again!`);
      }
    }
  });
});