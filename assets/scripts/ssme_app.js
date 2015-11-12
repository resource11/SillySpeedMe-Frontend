'use strict';

var user = {
  id: null,
  token: null
};

//$(document).ready(...
$(function() {

  // list all bikes for sale
  ssme_api.listBikes(listBikesCb);

  // register event handler
  $('#register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    ssme_api.register(credentials, regCb);
    e.preventDefault();
    console.log(JSON.stringify(credentials, null, 4));
  });

  // login event handler
  $('#login').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    ssme_api.login(credentials, loginCb);
    e.preventDefault();
  });

  // logout event handler
  $('#logout').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    ssme_api.login(credentials, logoutCb);
    e.preventDefault();
  });



  // handlers requiring authentication

  // create new bike handler
  $('#bike').on('submit', function(e) {
    var bike = wrap('bike', form2object(this));

    // test to see if the session.token is recognized
    console.log(session.token);

    // test to see if bike was created from wrap function
    console.log(bike);

    ssme_api.createBike(session.token, bike, createBikeCb);
    e.preventDefault();
  });


  // delete bike event handler
  $('#user-bikes').on('click', '.delete-bike', function() {
  console.log("clicked");

    // find the bike_id attached to the div
    var thisBikeId = $(this).closest('.bike-posts').attr('id');

    // confirmation the bike_id was captured
    console.log(thisBikeId);

    // change bg color as a test
    $(this).closest('.bike-posts').css({'background-color': 'purple', 'font-weight': 'bold'});

    // $('#all-bikes').find('.bike-posts').attr(thisBikeId);
    // $thisBike.css({'background-color': 'purple', 'font-weight': 'bold'});

      // do an ajax DELETE request
      ssme_api.deleteBike(thisBikeId, session.token, deleteBikeCb);

    // update the bike list in the viewport
    // find bike in all bikes listing


    $(this).closest('.bike-posts').remove();
    $('#all-bikes').find('bike-posts').remove();
    // var findAllBikes = $('#all-bikes').find('.bike-posts')
    // findAllBikes.remove();
    // ssme_api.listBikes(listBikesCb);


  });

  // favorite a bike handler
  $('#favorite_bike').on('submit', function(e) {
    var favorite_bike = wrap('favorite_bike', form2object(this));

    // test to see if the session.token is recognized
    console.log(session.token);

    // test to see if bike was created from wrap function
    console.log(favorite_bike);

    ssme_api.favoriteBike(favorite_bike, session.token, favoriteBikeCb);
    e.preventDefault();
  });



// var credentials = wrap('credentials', form2object(this));


});
// end doc ready function
