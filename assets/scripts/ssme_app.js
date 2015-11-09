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





  // after page loads, populate all bikes for sale
  var $bikeList = $('#all-bikes');
    var bikes_url = ssme_api.url +'/bikes'; // grab the list of bikes from Rails
  // var bikes_url = 'http://localhost:3000/bikes'; // grab the list of bikes from Rails

  // begin click handler, disabled for now
  // $('#bikes_button').on('click', function(event) {

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
        $bikeList.append('<div class="bike-posts"> <h3>' + bike.name + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p></div>');
        console.log(bike.name);
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


  // begin load user's bikes
  // if user logged in, load bikes created by that user

  // var $userBikeList = $('#user-bikes');
  // var usrBikes_url = ssme_api.url +'/bikes/1'; // grab the list of bikes from Rails

  // // begin click handler, disabled for now
  // // $('#bikes_button').on('click', function(event) {

  //   // the AJAX request to return a responsePromise
  //   var responsePromise = $.ajax({
  //     method: 'GET',
  //     url: usrBikes_url,
  //     dataType: 'json'
  //   });

  //   // begin .done() method handler

  //   // pass in the bikes.json file formatted into a string
  //   var bikesResponseHandler = function(data) {

  //     // grab bikes from Rails
  //     var usrBikes = data.bikes;
  //     console.log('bikes are ', bikes);
  //     console.log('bikeData 1 is ', bikes.id);

  //     // iterate through the JS array of bikes and
  //     // append each bike item to a block of html
  //     bikes.forEach(function(bike){
  //       $bikeList.append('<div class="bike-posts"> <h3>' + bike.name + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p></div>');
  //       console.log(bike.name);
  //     });

  //   };
  //   // end .done() method handler

  //   // the requestPromise .done() method
  //   responsePromise.done(bikesResponseHandler);

  //   // the requestPromise .fail() method
  //   responsePromise.fail(function(data){
  //         var errorMsg = 'Error: Accessing the URL' + bikes_url;
  //         alert(errorMsg);
  //         console.log(errorMsg);
  //   });


  // // });
  // // end disabled click handler

  // // end load user's bikes





});
// end doc ready function
