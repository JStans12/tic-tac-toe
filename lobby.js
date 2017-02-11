var $ = require('jquery');
var socket = io();
var Player = require('./player');
var Game = require('./game');
var player;
var playerRole;
var enemyName;
var myTurn;

socket.on('connectCount', function(connectCount){
  if(playerRole == undefined){
    setPlayerRole(connectCount);
  }
  console.log(connectCount);
});

socket.on('takeTurn', function(move){
  marker = move.slice(0,1)
  cell = move.slice(2,4)
  $('#' + cell).html(marker);
  myTurn = marker != player.marker ? true:false;
  showPlayerTurn();
});

socket.on('myNameIs', function(name){
  if(player == undefined || name != player.name){
    enemyName = name;
    if(player != undefined){
      formatGameHeader();
    }
  }
});

function setPlayerRole(role){
  var roles = {1: 'x player', 2: 'o player',};
  playerRole = roles[role] || 'spectating';
  $('#game-state').html(playerRole);
  if(playerRole != 'spectating'){
    $('#name-picker').removeClass('hidden');
  }
}

function formatGameHeader(){
  $('#game-state').html('');
  var enemy = enemyName == undefined ? '...':enemyName;
  if(player.marker == 'x'){
    $('#game-state').html('x: ' + player.name + ' -vs- o: ' + enemy + '');
  } else {
    $('#game-state').html('x: ' + enemy + ' -vs- o: ' + player.name + '');
  }
  $('#name-picker').addClass('hidden');
  if(enemyName != undefined){ showPlayerTurn() }
}

function showPlayerTurn(){
  $('#turn-indicator').html('')
  var name = myTurn == true ? player.name:enemyName;
  $('#turn-indicator').html('' + name + '`s turn');
}

$(document).ready(function(){
  $('#name-picker').submit(function(){
    var marker = playerRole[0];
    var name = $('#player-name').val();
    player = new Player(marker, name);
    myTurn = player.marker == 'x' ? true:false
    formatGameHeader(marker);
    socket.emit('myNameIs', player.name);
  });

  $('td').click(function(){
    if(myTurn == true && enemyName != undefined && $(this).html() == ''){
      var move = '' + player.marker + '-' + $(this).attr('id')
      socket.emit('takeTurn', move);
      myTurn = false;
    }
  });

  $('form').submit(function(e){
    e.preventDefault();
  })
});
