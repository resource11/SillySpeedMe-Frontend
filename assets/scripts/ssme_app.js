'use strict';

var user = {
  id: null,
  token: null
};


//$(document).ready(...
$(function() {

  // list all bikes for sale
  ssme_api.listAllBikes(listAllBikesCb);

  // register event handler
  $('#register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));

    ssme_api.register(credentials, regCb);
    e.preventDefault();
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
    var data = wrap('bike', form2object(this));

    ssme_api.createBike(session.token, data, createBikeCb);
    e.preventDefault();
  });



  // favorite a bike handler
  $('#favorite_bike').on('submit', function(e) {
    var data = wrap('favorite_bike', form2object(this));

    // test to see if the session.token is recognized
    console.log(session.token);

    // test to see if bike was created from wrap function
    console.log(data.favorite_bike);

    ssme_api.favoriteBike(data, session.token, favoriteBikeCb);
    e.preventDefault();
  });


  // NEW updateFavBike a bike handler
  $('#update_favorite').on('submit', function(e) {
    var data = wrap('favorite_bike', form2object(this));
    console.log("clicked");
    // test to see if the data was wrapped
    console.log(data.favorite_bike);

    console.log(data.favorite_bike.id);
    var id = data.favorite_bike.id;
    // test to see if the session.token is recognized
    console.log(session.token);

    ssme_api.updateFavBike(id, data, session.token, updateFavBikeCb);
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

    // do an ajax DELETE request
    ssme_api.deleteBike(thisBikeId, session.token, deleteBikeCb);

    // update the bike list in the viewport
    $(this).closest('.bike-posts').remove();


    // find bike in all bikes listing and remove
    // still debugging this
    var thisBikeInAllBikes = $('#all-bikes').find('.bike-posts').attr(thisBikeId)
    thisBikeInAllBikes.remove();

  });


});
// end doc ready function
