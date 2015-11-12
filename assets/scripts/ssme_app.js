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


//   $('.bike-posts').on('click', function() {
//     // $(this).parent(div)
// console.log('button clicked');
//     // var message = $('<span>Call 1-555-jquery-air to book this tour</span>');
//     // $(this).append(message);
//     // $(this).find('button').hide();
//   });

  // $('#pg_menu_content').on('click', '#btn_a', function(){
  //   console.log(this.value);
  // });

  $('#user-bikes').on('click', '.delete-bike', function() {
    console.log("clicked");
    var thisBikeId = $(this).closest('.bike-posts').attr('id');
    console.log(thisBikeId);

    // console.log(data);


    var bike = wrap('bike', form2object(this));
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






});
// end doc ready function
