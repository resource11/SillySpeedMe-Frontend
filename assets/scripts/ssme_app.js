'use strict';

var user = {
  id: null,
  token: null
};

//$(document).ready(...
$(function() {

  $('#register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    ssme_api.register(credentials, regCb);
    e.preventDefault();
    console.log(JSON.stringify(credentials, null, 4));
  }); // end of register submit handler

  $('#login').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    ssme_api.login(credentials, loginCb);
    e.preventDefault();
  }); // end of login subtmit handler

  $('#logout').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    ssme_api.login(credentials, logoutCb);
    e.preventDefault();
  }); // end of logout click handler


  // get DOM element for ul with id attribute 'bikes'
  var $bikeList = $('#bikes');

  // grab the list of bikes from Rails
  var bikes_url = 'http://localhost:3000/bikes';

  // begin click handler
  $('#bikes_button').on('click', function(event) {


    // ssme_api.listBikes(callback);

    // the AJAX request to return a responsePromise
    var responsePromise = $.ajax({
      method: 'GET',
      url: bikes_url,
      dataType: 'json'
    });

    // begin .done() method handler

    // the http response handler, which will pass in
    // the bikes.json file formatted into a string
    var bikesResponseHandler = function(data) {

      // console log the stringified JSON file
      // returned from the AJAX request
      console.log('data is ', data.bikes[0].title + data.bikes[0].description + data.bikes.all);

      // take the stringified JSON file and
      // convert it to a JS object named 'bikes'
      // var bikes = JSON.parse(data);

      // grab bikes from Rails
      var bikes = data.bikes;
      console.log('bikes are ', bikes);
      console.log('bikeData 1 is ', bikes.title);
      $('.bike-posts').text('The list of bikes are ' + data.bikes[0].title);

      // iterate through the JS array of bikes and
      // append each bike to an individual li in
      // the ul with the id attribute 'bikes'
      // using the title property value for each
      // bike object in the bikes array

      // so the 'bike' parameter is a reminder that
      // the argument passed in is an element in the
      // bikes array
      bikes.forEach(function(bike){
        $bikeList.append('<li>' + bike.title + '</li>');
      });

    };
    // end .done() method handler

    // the requestPromise .done() method
    responsePromise.done(bikesResponseHandler);



    // the requestPromise .fail() method
    responsePromise.fail(function(data){
          var errorMsg = 'Error: Accessing the URL' + bikes_url;
          alert(errorMsg);
          console.log(errorMsg);
    });


  });
  // end click handler


});
