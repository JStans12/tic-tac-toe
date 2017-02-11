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
  socket.emit('whatsYourName');
});

socket.on('takeTurn', function(move){
  marker = move.slice(0,1)
  cell = move.slice(2,4)
  $('#' + cell).html(marker);
  myTurn = marker != player.marker ? true:false;
  var boardState = getBoardState();
  var game = new Game(boardState);
  var winner = game.checkForWinner();
  if(winner != 'none'){
    showWinner(winner);
    myTurn = false;
  } else {
    showPlayerTurn();
  }
});

socket.on('myNameIs', function(name){
  if(player == undefined || name != player.name){
    enemyName = name;
    if(player != undefined){
      formatGameHeader();
    }
  }
});

socket.on('whatsYourName', function(){
  if(player != undefined){
    socket.emit('myNameIs', player.name);
  }
});

function getBoardState(){
  state = [];
  cells = ['t1', 't2', 't3',
           't4', 't5', 't6',
           't7', 't8', 't9']
  for (var i = 0; i < cells.length; i++) {
    var cellState = $('#' + cells[i]).html();
    state.push(cellState);
  }
  return state;
}

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

function showWinner(winner){
  $('#turn-indicator').html('');
  var outcome = player.marker == winner ? "You Win!":"You Lose!";
  $('#turn-indicator').html(outcome)
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
