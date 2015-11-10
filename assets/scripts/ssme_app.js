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


  // if logged in, create a new bike
  $('#bike').on('submit', function(e) {
    var bike = wrap('bike', form2object(this));

    // test to see if the session.token is recognized
    console.log(session.token);

    // test to see if bike was created from wrap function
    console.log(bike);

    // do the createBike function
    ssme_api.createBike(session.token, bike, createBikeCb);
    e.preventDefault();
  });






  // after page loads, populate all bikes for sale
  var $bikeList = $('#all-bikes');
  var bikes_url = ssme_api.url +'/bikes';

    // the AJAX request to return a responsePromise
    var responsePromise = $.ajax({
      method: 'GET',
      url: bikes_url,
      dataType: 'json'
    });

    // begin .done() method handler
    // pass in the bikes.json file formatted into a string
  var bikesResponseHandler = function(data) {

    // grab bikes from Rails
    var bikes = data.bikes;
    console.log('bikes are ', bikes);
    console.log('bikeData 1 is ', bikes[0].id);

    // iterate through the JS array of bikes and
    // append each bike item to a block of html
    bikes.forEach(function(bike){
      $bikeList.append('<div class="bike-posts"> <h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p></div>');
      // console.log(bike.title);
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


  // });
  // end disabled click handler



});
// end doc ready function
