'use strict';

var user = {
  id: null,
  token: null
};

var registerSubmit = $('#register');
var loginSubmit = $('#login');
var registerMenu = $('.register-scheme');
var loginMenu = $('.login-scheme');
var listBikeMenu = $('.list-bike-scheme');
var closeMe = $('.close-me');
var closeMeCreate = $('.close-me-create');
var messagesContainer = $('.messages-container');


//$(document).ready(...
$(function() {

  // menu transition click handlers

  $('#all-bikes').on('mouseenter', '.favorite-bike', function() {
    $(this).closest('i').addClass('select-cursor');
  });

    $('#all-bikes').on('mouseleave', '.favorite-bike', function() {
    $(this).closest('i').removeClass('select-cursor');
  });

  $('#all-bikes').on('click', '.favorite-bike', function() {
    $(this).closest('i').removeClass('fa-heart-o');
    $(this).closest('i').addClass('fa-heart');
  });

  // animate on register/login/list bike containers
  $('.register-a').on('click', function() {
    registerMenu.fadeIn().removeClass('hidden');
  });

  $('.login-a').on('click', function() {
    loginMenu.fadeIn().removeClass('hidden');
  });

  $('.register-a2').on('click', function() {
    loginMenu.slideUp(300);
    registerMenu.delay(600).slideDown(300).removeClass('hidden');
  });

  $('.login-a2').on('click', function() {
    registerMenu.slideUp(300);
    loginMenu.delay(600).slideDown(300).removeClass('hidden');
  });

  $('.list-a-bike').on('click', function() {
    listBikeMenu.fadeIn().removeClass('hidden');
  });


  // click hander for closing windows
  closeMe.on('click', function(){
    $(this).closest('section').fadeOut();
  });

    // click hander for closing windows
  closeMeCreate.on('click', function(){
    $(this).closest('section').fadeOut();
    addRev.fadeIn(300);
  });


  // list all bikes for sale
  ssme_api.listAllBikes(listAllBikesCb);

  // // list all favorite bikes
  // ssme_api.listAllFavBikes(listAllFavBikesCb);

  // register event handler
  $('#register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));

    ssme_api.register(credentials, regCb);
    e.preventDefault();
    registerMenu.fadeOut(300);
  });

  // login event handler
  $('#login').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));

    ssme_api.login(credentials, loginCb);
    e.preventDefault();
    loginMenu.fadeOut(300);
  });

  // logout event handler
  $('#logout').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));

    ssme_api.login(credentials, logoutCb);
    e.preventDefault();
  });



  // handlers requiring authentication

  // create new bike handler
  $('#create-bike').on('submit', function(e) {
    var data = wrap('bike', form2object(this));

    ssme_api.createBike(session.token, data, createBikeCb);
    e.preventDefault();
    listBikeMenu.fadeOut(300);
  });



  // favorite a bike handler
  // $('#favorite_bike').on('submit', function(e) {
    $('#all-bikes').on('click', '.favorite-bike', function() {
    // var data = wrap('favorite_bike', form2object(this));

    console.log('clicked');
    var favThisBike = $(this).closest('.bike-posts').data('bike-id');
    console.log('favbikeid is: ' + favThisBike);

    var data = {
      favorite_bike: {
        favorite: true,
        user_id: session.userId,
        bike_id: favThisBike
      }
    }


    // test to see if the session.token is recognized
    console.log(session.token);

    console.log('user id is: ' + session.userId);

    console.log('the bike id is: ' + data.favorite_bike.bike_id);

    // test to see if bike was created from wrap function
    console.log(data.favorite_bike);

    ssme_api.favoriteBike(data, session.token, favoriteBikeCb);
    // e.preventDefault();
  });


  // NEW updateFavBike a bike handler
  // $('#update_favorite').on('submit', function(e) {
  $('#user-favorite-bikes').on('click', '.remove-favorite-bike', function() {
    // var data = wrap('favorite_bike', form2object(this));
    console.log("clicked");

    // find the bike_id attached to the div
    var favBikeId = $(this).closest('.usr-favs').data('fav-bike-id');
    // test to see if the data was wrapped
    // console.log(data.favorite_bike);
    console.log('fav bike id to remove is: ' + favBikeId);;

    var data = {
      favorite_bike: {
        id: favBikeId,
        favorite: false
      }
    };


    // test to see if the session.token is recognized
    console.log(session.token);
    console.log('data sent is: ' + JSON.stringify(data));

    ssme_api.updateFavBike(favBikeId, data, session.token, updateFavBikeCb);

    // update the bike list in the viewport
    $(this).closest('.usr-favs').remove();
  });



  // delete bike event handler
  $('#user-bikes').on('click', '.delete-bike', function() {

    console.log("clicked");

    // find the bike_id attached to the div
    var thisBikeId = $(this).closest('.usr-posts').data('bike-id');

    // confirmation the bike_id was captured
    console.log(thisBikeId);

    // change bg color as a test
    $(this).closest('.bike-posts').css({'background-color': 'purple', 'font-weight': 'bold'});

    // do an ajax DELETE request
    ssme_api.deleteBike(thisBikeId, session.token, deleteBikeCb);

    // update the bike list in the viewport
    $(this).closest('.usr-posts').remove();


    // var findThisBike = '[data-bikeId="' + thisBikeId + '"]';
    // // find bike in all bikes listing and remove
    // // still debugging this
    // var thisBikeInAllBikes = $('#all-bikes').find('.bike-posts').attr(findThisBike);
    // console.log('this found bike id is: ' + thisBikeInAllBikes);
    // thisBikeInAllBikes.remove();

  });


});
// end doc ready function
