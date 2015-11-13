'use strict';

var session = {
  userId: null,
  token: null,

};

// locations to append bikes
// var newBike = $('#new-bike');
var userBikesList = $('#user-bikes');
var allBikesList = $('#all-bikes');
var userFavoriteList = $('#user-favorite-bikes');

// html to for each bike div
var bkHTML = '<div id=' + bike.id + ' class="bike-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p></div>';

var usrBkHTML = '<div id=' + bike.id + ' class="bike-posts usr-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p><button class="delete-bike">Delete this listing</button></div>';


// create function for append new bikes
var appendNewBike = function(data, data2, location1, location2) {
  location1.append(data);
  location2.append(data2);
};

// create function for append favorite bikes
var appendFavBike = function(data, location) {
  location.append(data);
};

var removeBikes = function(data, location1, location2) {
  location1.find.location2.remove();
};


// create object from form data
var form2object = function(form) {
  var data = {};
  $(form).children().each(function(index, element) {
    var type = $(this).attr('type');
    if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
      data[$(this).attr('name')] = $(this).val();
    }
  });
  return data;
};


// wrap function
var wrap = function wrap(root, formData) {
  var wrapper = {};
  wrapper[root] = formData;
  return wrapper;
};


// callback function
var callback = function callback(error, data) {
  if (error) {
    console.error(error);
    $('#result').val('status: ' + error.status + ', error: ' + error.error);
    return;
  }
  $('#result').val(JSON.stringify(data, null, 4));
};


// registration callback
var regCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Registration fail!</strong>");
    return;
  }
  console.log(JSON.stringify(data, null, 4));
    $('.user-messages').text('Welcome,  new user #' + data.user.id);
};



// login callback
var loginCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Login fail!</strong>");
    return;
  }

  // assign data.user.id and data.user.token
  // to user.id and user.token
  session.userId = data.user.id;
  session.token = data.user.token;
  $('.user-messages').text('Welcome, user #' + session.userId);

  // show in console for testing purposes
  console.log(session.userId);
  console.log(session.token);

  // display current_user status
  data.user.current_user = true;

  // grab current_user bikes
  $.ajax({
      method: 'GET',
      url: ssme_api.url + '/bikes',
      headers: {
          Authorization: 'Token token=' + session.token
        },
      dataType: 'json'
      }).done(function(data){
        console.log("My Bikes are " + data);

        var userBikeList = $('#user-bikes');
        var bikes = data.bikes;

        bikes.forEach(function(bike){
        userBikeList.append('<div id=' + bike.id + ' class="bike-posts usr-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p><button class="delete-bike">Delete this listing</button></div>');


      });
      // console.log for testing
      console.log('bikes are ', bikes);


    });

  /// display current_user favorite_bikes
  $.ajax({
    method: 'GET',
    url: ssme_api.url + '/favorite_bikes',
    headers: {
        Authorization: 'Token token=' + session.token
      },
    dataType: 'json'
    }).done(function(data){
      // console.log test
      console.log('favorite bike data is ' + data.favorite_bikes);

      var userFavoriteList = $('#user-favorite-bikes');
      var favBikes = data.favorite_bikes;

      favBikes.forEach(function(favBike){
        userFavoriteList.append(
          '<div id=' + favBike.id + ' class="bike-posts usr-favs"><h3> Favorite bike id ' + favBike.id + '</h3><p> bike id: ' + favBike.bike_id  + '</p><p> user id: ' + favBike.user_id  + '</p><button class="remove-favorite-bike">remove this Favorite</button></div>');

      });
      // console.log for testing
      console.log('bikes are ', favBikes);


  });
  console.log(JSON.stringify(data, null, 4));

}; // end of login callback;



// logout callback
var logoutCb = function (error){
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Whoops! You're still logged in.</strong>");
  }
  data.user.current_user = false;
  // changeLogout();
  console.log(JSON.stringify(data, null, 4));
  console.log("Logged out");
};

// listBikes callback
var listBikesCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike listing fail!</strong>");
    return;
  }
  // grab bikes from Rails
  var bikes = data.bikes;

  // console.log tests
  console.log('bikes are ', bikes);
  console.log('bikeData 1 is ', bikes[0].id);


  // list all the bikes
  // // create append each function
  // bikes.forEach(function(bike, bkHTML, allBikesList){
  //   bike.appendNewBike(bkHTML, allBikesList);
  // });


  bikes.forEach(function(bike){
    $('#all-bikes').append('<div id=' + bike.id + ' class="bike-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p><button class="favorite-bike">Favorite this bike</button></div>');
  });

};

// createBike callback
var createBikeCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike create fail!</strong>");
    return;
  }
  // console.log test
  console.log('data is ' + data);


  var bike = data.bike;
  // appendNewBike(bkHTML, usrBkHTML, allBikesList, usrBikesList);


  // add the new bike next to the bike form
  var newBike = $('#new-bike');
  newBike.append('<div id=' + bike.id + ' class="bike-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p></div>');

  // add the new bike to the current_user's bike bucket
  var userBikeList = $('#user-bikes');
  userBikeList.append('<div id=' + bike.id + ' class="bike-posts usr-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p><button class="delete-bike">Delete this listing</button></div>');

  // add the new bike to the 'all bikes for sale' bucket
  var bikeList = $('#all-bikes');
  bikeList.append('<div id=' + bike.id + ' class="bike-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p></div>');

  // console.log for testing
  console.log('bikes are ', data.bikes);

  $('.user-messages').text('New bike ' + bike_id + ' created by user ' + data.user.id);

};
// end of createBike submit handler



// favoriteBike callback
var favoriteBikeCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike favorite fail!</strong>");
    return;
  }

  // console.log test
 console.log('favorite bike data is ' + data);

  var userFavoriteList = $('#user-favorite-bikes');
  var favBike = data.favorite_bike;

  // append created favorite bike to div
  userFavoriteList.append('<div id=' + favBike.id + ' class="bike-posts usr-favs"><h3> Favorite bike id ' + favBike.id + '</h3><p> favorite: ' + favBike.favorite  + '</p><p> bike id: ' + favBike.bike_id  + '</p><p> user id: ' + favBike.user_id  + '</p></div>');

};
// end of favoriteBike submit handler

// updateFavBike callback
var updateFavBikeCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike favorite fail!</strong>");
    return;
  }
  // console.log test
  console.log('favorite bike favorite is ' + data);

  var userFavoriteList = $('#user-favorite-bikes');
  var favBike = data.favorite_bike;

  // console.log(data.favorite_bike);
  console.log('favorite status is' + favBike.id);
  $(".user-messages").html("<strong>Favorite removed!</strong>");

};
// end of updateFavBike submit handler



// deleteBikes callback
var deleteBikeCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike deletion fail!</strong>");
    return;
  }

  // find div by id, delete that div in user bikes then in all bikes

  $(".user-messages").html("<strong>Bike deletion success!</strong>");



};




