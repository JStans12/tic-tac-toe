var $ = require('jquery');
var socket = io();
var Player = require('./player');
var Game = require('./game');
var player;
var playerRole;
var enemyName;

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
  if(playerRole != 'spectating'){
    $('#name-picker').removeClass('hidden');
  }
}

function formatGameHeader(){
  $('#game-state').html('');
  var enemy = enemyName == undefined ? '...':enemyName;
  if(player.marker == 'o'){
    $('#game-state').html('o: ' + player.name + ' - x: ' + enemy + '');
  } else {
    $('#game-state').html('o: ' + enemy + ' - x: ' + player.name + '');
  }
  $('#name-picker').addClass('hidden');
}

$(document).ready(function(){
  $('#name-picker').submit(function(){
    var marker = playerRole[0];
    var name = $('#player-name').val();
    player = new Player(marker, name);
    formatGameHeader(marker);
  });

  $('td').click(function(){
    $(this).html('x');
  });

  $('form').submit(function(e){
    e.preventDefault();
  })
});
