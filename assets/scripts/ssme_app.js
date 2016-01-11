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
  $('#all-bikes').on('click', '.favorite-bike', function() {

    var favThisBike = $(this).closest('.bike-posts').data('bike-id');

    var data = {
      favorite_bike: {
        favorite: true,
        user_id: session.userId,
        bike_id: favThisBike
      }
    }

    ssme_api.favoriteBike(data, session.token, favoriteBikeCb);
  });


  // updateFavBike a bike handler
  $('#user-favorite-bikes').on('click', '.remove-favorite-bike', function() {
    var favBikeId = $(this).closest('.usr-favs').data('fav-bike-id');

    var data = {
      favorite_bike: {
        id: favBikeId,
        favorite: false
      }
    };

    ssme_api.updateFavBike(favBikeId, data, session.token, updateFavBikeCb);

    $(this).closest('.usr-favs').remove();
  });



  // delete bike event handler
  $('#user-bikes').on('click', '.delete-bike', function() {

    var thisBikeId = $(this).closest('.usr-posts').data('bike-id');

    ssme_api.deleteBike(thisBikeId, session.token, deleteBikeCb);

    $(this).closest('.usr-posts').remove();
  });


});
// end doc ready function
