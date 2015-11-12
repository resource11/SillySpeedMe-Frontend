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


  // test click handler for delete button
  $('#user-bikes').on('click', '.delete-bike', function() {
  console.log("clicked");

    // find the bike_id attached to the div
    var thisBikeId = $(this).closest('.bike-posts').attr('id');
    console.log(thisBikeId);
    $(this).closest('.bike-posts').css({'background-color': 'purple', 'font-weight': 'bold'});
    ssme_api.deleteBike(thisBikeId, session.token, deleteBikeCb);

    // wrap the id into an object

    // do an ajax DELETE request

    // update the bikes
    $(this).closest('.bike-posts').remove();


    // var bike = wrap('bike', form2object(this));
  });

// $(staticAncestors).on(eventName, dynamicChild, function() {});

 var indexMenus = function(error, data) {
    if (error) {
      console.error(error);
      return;
    }
      var menuHTML = menuTemplate({weekly_menus: data.weekly_menus});
      $('#allMenus').html(menuHTML);
  };






});
// end doc ready function
