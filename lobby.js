var $ = require('jquery');
var socket = io();
var Player = require('./player');
var Game = require('./game');
var playerRole;

socket.on('connectCount', function(connectCount){
  if(playerRole == undefined){
    setPlayerRole(connectCount);
  }
  console.log(connectCount);
});

function setPlayerRole(role){
  var roles = {1: 'o player', 2: 'x player',};
  playerRole = roles[role] || 'spectating';
  $('#game-state').html(playerRole);
}

$(document).ready(function(){
  $('td').click(function(){
    $(this).html('x');
  });
});
