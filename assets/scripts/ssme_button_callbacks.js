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

var bikes = {};

var favorite_bike = {
  id: null,
  favorite: false,
  user_id: null,
  bike_id: null
};

var countBikeFavs = [];

var favCountResetter = function(countBikeFavs){
  for(var i=0; i < countBikeFavs.length; i++) {
    if (countBikeFavs === 0) {
      countBikeFavs[i] = "";
    }
  }
};

// locations to append bikes
var allBikesList = $('#all-bikes');
var userBikesList = $('#user-bikes');
var userFavoriteList = $('#user-favorite-bikes');



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
  messagesContainer.fadeIn().removeClass('hidden');
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
  messagesContainer.fadeIn().removeClass('hidden');
  $('.user-messages').text('Welcome, user #' + session.userId);

  // display current_user status
  data.user.current_user = true;

  // list current user bikes for sale
  ssme_api.listUserBikes(session.token, listUserBikesCb);

  // list current user favorited bikes
  ssme_api.listFavBikes(session.token, listFavBikesCb);

}; // end of login callback;




// logout callback
var logoutCb = function (error){
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Whoops! You're still logged in.</strong>");
  }
  data.user.current_user = false;
  // changeLogout();
  // console.log(JSON.stringify(data, null, 4));
  console.log("Logged out");
};




// listBikes callback
var listAllBikesCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike listing fail!</strong>");
    return;
  }

  var template = Handlebars.compile($("#all-bikes-index").html());

  var newHTML = template({bikes: data.bikes});

  $("#all-bikes").html(newHTML);

    // list all favorite bikes
  ssme_api.listAllFavBikes(listAllFavBikesCb);

};




// listAllFavBikes callback
var listAllFavBikesCb = function (error, data) {
    if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike favorite listing fail!</strong>");
    return;
  }

  var favBikes = data.favorite_bikes;

  favBikes.forEach(function(favBike){
    // listFavBikeHTML(favBike);

    // console.log('all fav bikes are: ' + JSON.stringify(favBike.bike_id) + ' with favorite: '+ JSON.stringify(favBike.favorite));

  });
};




// createBike callback
var createBikeCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike create fail!</strong>");
    return;
  }

  ssme_api.listUserBikes(session.token, listUserBikesCb);
  ssme_api.listAllBikes(listAllBikesCb);


  $('.user-messages').text('New bike ' + data.bike.id + ' created by user ' + data.bike.user_id);

};
// end of createBike submit handler




// listUserBikes callback
var listUserBikesCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike listing fail!</strong>");
    return;
  }

  var template = Handlebars.compile($("#user-bikes-index").html());

  var newHTML = template({bikes: data.bikes});

  $("#user-bikes").html(newHTML);

};




// listFavBikes callback
var listFavBikesCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike favorite fail!</strong>");
    return;
  }

  var favBikes = data.favorite_bikes;

  // define your custom handlebars helper
  Handlebars.registerHelper('ifvalue', function (conditionalVariable, options){
    if (conditionalVariable === options.hash.value) {
      return options.fn(this); // who the 'ifvalue' content
    } else {
      return options.inverse(this); // show the 'else'content, if it exists
    }
  });

  var template = Handlebars.compile($("#user-favorite-bikes-index").html());

  var newHTML = template({favorite_bikes: data.favorite_bikes});

  $("#user-favorite-bikes").html(newHTML);

};




// favoriteBike callback
var favoriteBikeCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike favorite fail!</strong>");
    return;
  }

  var favBike = data;

  var template = Handlebars.compile($("#favorite-a-bike").html());

  var newHTML = template(data);

  $("#user-favorite-bikes").append(newHTML);

  $(".user-messages").html("<strong>Favorite added!</strong>");
};
// end of favoriteBike submit handler




// updateFavBike callback
var updateFavBikeCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Unfavorite fail!</strong>");
    return;
  }

  $(".user-messages").html("<strong>Favorite removed!</strong>");
  ssme_api.listAllBikes(listAllBikesCb);

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
  ssme_api.listAllBikes(listAllBikesCb);

  $(".user-messages").html("<strong>Bike deletion success!</strong>");

};




