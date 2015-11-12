'use strict';

var session = {
  userId: null,
  token: null,

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
  $('.user-messages').text('Welcome, user #' + data.user.id);

  // show in console for testing purposes
  console.log(session.userId);
  console.log(session.token);

  // update current_user status
  data.user.current_user = true;

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
  console.log('bikes are ', bikes);
  console.log('bikeData 1 is ', bikes[0].id);


  // iterate through the JS array of bikes,append each bike item to a div with id attribute 'all-bikes'
  bikes.forEach(function(bike){
    $('#all-bikes').append('<div id=' + bike.id + ' class="bike-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p><button class="favorite-bike">Favorite this bike</button></div>');
  });

};

// createBike callback
var createBikeCb = function (error, bike) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Bike create fail!</strong>");
    return;
  }
  console.log('data is ' + bike);


  var $newBike = $('#new-bike');
  var bikes = bike.title;

  // add the new bike next to the bike form
  $newBike.append('<div id=' + bike.id + ' class="bike-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p></div>');

  // add the new bike to the current_user's bike bucket
  var $userBikeList = $('#user-bikes');
  $userBikeList.append('<div id=' + bike.id + ' class="bike-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p><button class="delete-bike">Delete this listing</button></div>');

  // add the new bike to the 'all bikes for sale' bucker
  var $bikeList = $('#all-bikes');
  $bikeList.append('<div id=' + bike.id + ' class="bike-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p><button class="favorite-bike">Favorite this bike</button></div>');

  // console.log for testing
  console.log('bikes are ', bikes);
  bike.bikeId = bike.title;
  console.log('My new bike is ', bike.bikeId);

};
// end of createBike submit handler

// listBikes callback
var deleteBikeCb = function (error, data) {
  if (error) {
    console.error(error);
    console.log('status: ' + error.status + ', error: ' + error.error);
    $(".user-messages").html("<strong>Error! Bike deletion fail!</strong>");
    return;
  }

  // find div by id, delete that div in user bikes then in all bikes


  // grab bikes from Rails
  var bikes = data.bikes;
  console.log('bikes are ', bikes);

  console.log('bikeData 1 is ', bikes[0].id);


  // // iterate through the JS array of bikes,append each bike item to a div with id attribute 'all-bikes'
  // bikes.forEach(function(bike){
  //   $('#all-bikes').append('<div id=' + bike.id + 'class="bike-posts"><h3>' + bike.title + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p><p> user id: '+ bike.user_id +'</p><button class="favorite-bike">Favorite this bike</button></div>');
  // });

};


