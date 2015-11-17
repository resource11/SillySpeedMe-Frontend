'use strict';

var session = {
  userId: null,
  token: null,
};

var bike = {
  id: null,
  title: null,
  description: null,
  user_id: null
};

var favorite_bike = {
  id: null,
  favorite: false,
  user_id: null,
  bike_id: null
};

// locations to append bikes
var allBikesList = $('#all-bikes');
var userBikesList = $('#user-bikes');
var userFavoriteList = $('#user-favorite-bikes');

var removeBikes = function(data, location1, location2) {
  location1.find.location2.remove();
};

var listBikeHTML = function (bike) {
  allBikesList.append('<div id=' + bike.id + ' class="bike-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p><button class="favorite-bike">Favorite this bike</button></div>');
};

var listUserBikeHTML = function(bike) {
  userBikesList.append('<div id=' + bike.id + ' class="bike-posts usr-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p><button class="delete-bike">Delete this listing</button></div>');
 };

var listFavBikeHTML = function(favBike) {
  userFavoriteList.append('<div id=' + favBike.id + ' class="bike-posts usr-favs"><h3> Favorite bike id ' + favBike.id + '</h3><p> bike id: ' + favBike.bike_id  + '</p><p> user id: ' + favBike.user_id  + '</p><button class="remove-favorite-bike">remove this Favorite</button></div>');
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

  // assign current_user.id and session.token
  session.userId = data.user.id;
  session.token = data.user.token;
  $('.user-messages').text('Welcome, user #' + session.userId);

  // show in console for testing purposes
  console.log(session.userId);
  console.log(session.token);

  // display current_user status
  data.user.current_user = true;

  // list current user bikes for sale
  ssme_api.listUserBikes(session.token, listUserBikesCb);

  // list current user favorited bikes
  ssme_api.listFavBikes(session.token, listFavBikesCb);


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
var listAllBikesCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike listing fail!</strong>");
    return;
  }
  // grab bikes from Rails
  var bikes = data.bikes;

  bikes.forEach(function(bike){
    listBikeHTML(bike);
  });

};

// createBike callback
var createBikeCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike create fail!</strong>");
    return;
  }

  var bike = data.bike;
  listBikeHTML(bike);
  listUserBikeHTML(bike);
  $('.user-messages').text('New bike ' + bike.id + ' created by user ' + data.user.id);

};
// end of createBike submit handler

// listUserBikes callback
var listUserBikesCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike listing fail!</strong>");
    return;
  }

  // grab bikes from Rails
  var bikes = data.bikes;

  bikes.forEach(function(bike){
    listUserBikeHTML(bike);
  });

};

// listFavBikes callback
var listFavBikesCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike favorite fail!</strong>");
    return;
  }

  // console.log test
  console.log('favorite bike data is ' + data.favorite_bikes);

  var favBikes = data.favorite_bikes;

  favBikes.forEach(function(favBike){
    listFavBikeHTML(favBike);
  });

  // console.log for testing
  console.log('bikes are ', favBikes);

};


// favoriteBike callback
var favoriteBikeCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike favorite fail!</strong>");
    return;
  }

  // console.log test
 console.log('favorite bike data is ' + data);

  var favBike = data.favorite_bike;
  listFavBikeHTML(favBike);
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

  var favBike = data.favorite_bike;

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




