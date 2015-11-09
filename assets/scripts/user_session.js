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
    $('#result').val('status: ' + error.status + ', error: ' +error.error);
    return;
  }
  $('#result').val(JSON.stringify(data, null, 4));
};


// registration callback
var regCb = function (error, data) {
  if (error) {
    console.error(error);
    console.log('status: ' + error.status + ', error: ' +error.error);
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
    console.log('status: ' + error.status + ', error: ' +error.error);
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
  // changeLogin(data);

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
      }).done(function(bikes_data){
        console.log("My Bikes are " + bikes_data);

        var $userBikeList = $('#user-bikes');

        var bikes = bikes_data.bikes;
        console.log('bikes are ', bikes);
        console.log('bikeData 1 is ', bikes[0].id);
        bikes.forEach(function(bike){
        $userBikeList.append('<div class="bike-posts"> <h3>' + bike.name + '</h3><p>' + bike.description +'</p><p> bike id: '+ bike.id +'</p></div>');
        console.log(bike.name);
      });
      });

  console.log(JSON.stringify(data, null, 4));
}; // end of login callback;



// logout callback
var logoutCb = function (error){
  if (error) {
    console.error(error);
  }
  data.user.current_user = false;
  // changeLogout();
  console.log(JSON.stringify(data, null, 4));
  console.log("Logged out");
};
