'use strict';

var session = {
  userId: null,
  token: null,

  makeCredentials: function(email, pw, pwconf){
    var credentials =  {"credentials": {
      "email": email,
      "password": pw
    }};
    if (pwconf) {  // Adds pwconf if passed in.
      credentials.credentials.password_confirmation = pwconf;
    }
    return credentials;
  },

  register: function(email, pw, pwconf){
    ssme_api.register(this.makeCredentials(email, pw, pwconf), function(err, data){
      if (err) { console.error(err); }
      console.log(data);
    });
  },

  login: function(email, pw, callback){
    ssme_api.login(session.makeCredentials(email, pw), function(err, data){
      if (err) { console.error(err); }
      console.log(data);
      session.userId = data.user.id;
      session.token = data.user.token;
      callback();
    });
  }
};
