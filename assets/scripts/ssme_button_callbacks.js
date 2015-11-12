'use strict';

var session = {
  userId: null,
  token: null,

};

var $bikeList = $('#all-bikes');

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
  // changeRegister();
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

  // update current_user status
  data.user.current_user = true;

  // grab current_user bikes
  // send a ajax request to /bikes
  // send the session.token
  $.ajax({
      method: 'GET',
      // TODO: Replace hardcoded URL
      url: 'http://localhost:3000' + '/bikes',
      headers: {
          Authorization: 'Token token=' + session.token
        },
      dataType: 'json'
      }).done(function(data){
        console.log("My Bikes are " + data);

        var $userBikeList = $('#user-bikes');
        var bikes = data.bikes;

        // add user name to 'your bikes for sale'
        // stretch goal
        // $('#profile h2').append(bike.user_id + '\'s bikes for sale')
        bikes.forEach(function(bike){
        $userBikeList.append('<div id=' + bike.id + ' class="bike-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p><button class="delete-bike">Delete this listing</button></div>');


      });
      // console.log for testing
      console.log('bikes are ', bikes);


    });

  /// grab current_user favorite_bikes
  // send a ajax request to /favorite_bikes
  // send the session.token
  $.ajax({
    method: 'GET',
    // TODO: Replace hardcoded URL
    url: 'http://localhost:3000' + '/favorite_bikes',
    headers: {
        Authorization: 'Token token=' + session.token
      },
    dataType: 'json'
    }).done(function(data){
      // console.log test
      console.log('favorite bike data is ' + data.favorite_bikes);

      var $userFavoriteList = $('#user-favorite-bikes');
      var favBikes = data.favorite_bikes;

      favBikes.forEach(function(favBike){
        $userFavoriteList.append('<div id=' + favBike.id + ' class="bike-posts"><h3> Favorite bike </h3><p> bike id: '+ favBike.bike_id  +'</p><p> user id: '+ favBike.user_id  +'</p><button class="remove-favorite-bike">remove this Favorite</button></div>');

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


  // iterate through the JS array of bikes,append each bike item to a div with id attribute 'all-bikes'
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


  var $newBike = $('#new-bike');
  var bike = data.bike;

  // add the new bike next to the bike form
  $newBike.append('<div id=' + bike.id + ' class="bike-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p></div>');

  // add the new bike to the current_user's bike bucket
  var $userBikeList = $('#user-bikes');
  $userBikeList.append('<div id=' + bike.id + ' class="bike-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p><button class="delete-bike">Delete this listing</button></div>');

  // add the new bike to the 'all bikes for sale' bucker
  var $bikeList = $('#all-bikes');
  $bikeList.append('<div id=' + bike.id + ' class="bike-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p><button class="favorite-bike">Favorite this bike</button></div>');

  // console.log for testing
  console.log('bikes are ', data.bikes);

};
// end of createBike submit handler



// favoriteBike callback
var favoriteBikeCb = function (error, favorite_bike) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike favorite fail!</strong>");
    return;
  }

  // console.log test
 console.log('favorite bike data is ' + favorite_bike);

  var $userFavoriteList = $('#user-favorite-bikes');
  var favBike = favorite_bike;

  // append created favorite bike to div
  $userFavoriteList.append('<div id=' + favBike.id + ' class="bike-posts"><h3> Favorite bike </h3><p> bike id: '+ favBike.bike_id  +'</p><p> user id: '+ favBike.user_id  +'</p><button class="remove-favorite-bike">remove this Favorite</button></div>');

};
// end of favoriteBike submit handler

// updateFavBike callback
var updateFavBikeCb = function (error, favorite) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike favorite fail!</strong>");
    return;
  }

  // console.log test
  console.log('favorite bike favorite is ' + favorite);

  var $userFavoriteList = $('#user-favorite-bikes');
  var favBike = favorite_bike;

  // remove created favorite bike from div
  $userFavoriteList.append('<div id=' + favBike.id + ' class="bike-posts"><h3> Favorite bike </h3><p> bike id: '+ favBike.bike_id  +'</p><p> user id: '+ favBike.user_id  +'</p><button class="remove-favorite-bike">remove this Favorite</button></div>');

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




