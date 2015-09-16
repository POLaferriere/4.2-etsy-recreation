/*
  (url: String, callback: Function) -> undefined

  Execute a callback function with the JSON results from the url specified.

  Examples
      var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=tacos&includes=Images,Shop";

      fetchJSONP(url, function(data) {
        // do something with data
      });

      // OR

      function logData(data) {
        console.log(data);
      }

      fetchJSONP(url, logData);
*/
function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

var videoGameURL = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=video+games&includes=Images,Shop";

fetchJSONP(videoGameURL, function(response) {
  var itemResults = response.results;
  itemResults.forEach(displayResult);
});

fetchJSONP(videoGameURL, function (response){
  document.querySelector(".results-count").textContent = String(response.count) + ' Results';
});

function displayResult(result) {
  var source = document.querySelector('#result-template').innerHTML;

  var template = Handlebars.compile(source);
  var outputHTML = template(result);

  var resultsUL = document.querySelector('.results');
  resultsUL.insertAdjacentHTML('beforeend', outputHTML);
}
