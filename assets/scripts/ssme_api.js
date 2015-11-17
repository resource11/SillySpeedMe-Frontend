'use strict';

// api HTTP requests/responses

var ssme_api = {
  bikeWatcher: null,
  url: 'https://mighty-lowlands-8515.herokuapp.com',

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

  listAllBikes: function (callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/bikes',
      dataType: 'json'
      }, callback);
  },


  //Authenticated api actions

  logout: function(id, token, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/logout',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(id),
      dataType: 'json'
    }, callback);
  },

  createBike: function (token, data, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/bikes',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
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

  listUserBikes: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/bikes',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
      }, callback);
  },

  listFavBikes: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/favorite_bikes',
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

  favoriteBike: function (data, token, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/favorite_bikes',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },

  updateFavBike: function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.url + '/favorite_bikes/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },

  deleteBike: function (id, token, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.url + '/bikes/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(id),
      dataType: 'json'
    }, callback);
  },


  watchBike: function (id, token) {
    var url = this.url + '/bikes/' + id + '/watch';
    var auth = {
      Authorization: 'Token token=' + token
    };
    this.bikeWatcher = resourceWatcher(url, auth); //jshint ignore: line
    return this.bikeWatcher;
  }

};

