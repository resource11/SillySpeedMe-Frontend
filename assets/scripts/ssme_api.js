'use strict';

// api HTTP requests/responses

var ssme_api = {
  gameWatcher: null,
  url: 'http://localhost:3000',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function(credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.url + '/register',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  login: function(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  //Authenticated api actions

  // we don't need to authenticate to show bikes, yes?
  //listBikes: function (token, callback)
  listBikes: function (callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/bikes',
      // headers: {
      //   Authorization: 'Token token=' + token
      // },
      dataType: 'json'
      }, callback);
  },

  createBike: function (token, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/bikes',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json',
      data: JSON.stringify({}),
      dataType: 'json',
    }, callback);
  },

    createGame: function(cb){

    tttapi.createGame(session.token, function(err, data){
      if (err) { console.error(err); }
      console.log(data);
      game.board = data.game.cells;
      game.gameId = data.game.id;
      game.gameOver = data.game.over;
      if(cb) {cb();}
    });
  },

  showBike: function (id, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/bikes/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  editBike: function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.url + '/bikes/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },

  favoriteBike: function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.url + '/favorites/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },

  unFavoriteBike: function (id, data, token, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.url + '/favorites/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },


  watchGame: function (id, token) {
    var url = this.url + '/games/' + id + '/watch';
    var auth = {
      Authorization: 'Token token=' + token
    };
    this.gameWatcher = resourceWatcher(url, auth); //jshint ignore: line
    return this.gameWatcher;
  }

};

