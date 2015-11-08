'use-strict';

'use strict';

var game = {
  id: null,
  board: [],
  token: null,
  over: false
};

//$(document).ready(...
$(function() {
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

  var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };

  var callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
  };

  $('#register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    tttapi.register(credentials, callback);
    e.preventDefault();
  });

  $('#login').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
      // $('.token').val(data.user.token);
      game.token = data.user.token;
      console.log(game.token);
      $('.player-messages').text('Welcome, user #' + data.user.id);
    };
    e.preventDefault();
    tttapi.login(credentials, cb);
  });

});


// var session = {
//   userId: null,
//   token: null,

//   makeCredentials: function(email, pw, pwconf){
//     var credentials =  {'credentials': {
//       'email': email,
//       'password': pw
//     }};
//     if (pwconf) {  // Adds pwconf if passed in.
//       credentials.credentials.password_confirmation = pwconf;
//     }
//     return credentials;
//   },

//   register: function(email, pw, pwconf){
//     tttapi.register(this.makeCredentials(email, pw, pwconf), function(err, data){
//       if (err) { console.error(err); }
//       console.log(data);
//     });
//   },

//   login: function(email, pw, callback){
//     tttapi.login(session.makeCredentials(email, pw), function(err, data){
//       if (err) { console.error(err); }
//       console.log(data);
//       session.userId = data.user.id;
//       session.token = data.user.token;
//       callback();
//     });
//   }
// };
