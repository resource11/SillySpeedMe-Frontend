'use strict';

var bike = {
  bikeId: null,
  board: ['','','','','','','','',''],
  bikeOver: false,

  getListOfBikes: function(){
    ssme_api.listBikes(session.token, function(err, data){
      if (err) {console.error(err);}
      console.log(data);
    });
  },

  loadBike: function(bikeId, cb){
    ssme_api.showBike(bikeId, session.token, function(err, data){
      if (err) { console.error(err); }
      bike.board = data.bike.cells;
      bike.bikeId = data.bike.id;
      bike.bikeOver = data.bike.over;
      cb();
    });
  },

  createBike: function(cb){
    ssme_api.createBike(session.token, function(err, data){
      if (err) { console.error(err); }
      console.log(data);
      bike.board = data.bike.cells;
      bike.bikeId = data.bike.id;
      bike.bikeOver = data.bike.over;
      if(cb) {cb();}
    });
  },

  makeMove: function(index, player, cb){
    if (bike.board[index] !== '' || bike.bikeOver) {return;}
    bike.board[index] = player;
    if (bike.getWinner() !== null) { bike.bikeOver = true; }
    var moveData = {
      "bike": {
        "cell": {
          "index": index,
          "value": player
        },
        "over": bike.bikeOver
      }
    };
    ssme_api.markCell(bike.bikeId, moveData, session.token, function(err, data){
      cb();
    });
  }

};
