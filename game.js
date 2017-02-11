var Game = function(boardState){
  this.boardState = boardState;
}

Game.prototype.checkForWinner = function(){
  var state = this.boardState
  if (hasWon('o', state)) {
    return "o";
  } else if (hasWon('x', state)) {
    return "x";
  } else {
    return "none";
  }
}

function hasWon(marker, state){
  if (
    (state[0] == marker && state[1] == marker && state[2] == marker) ||
    (state[3] == marker && state[4] == marker && state[5] == marker) ||
    (state[6] == marker && state[7] == marker && state[8] == marker) ||
    (state[0] == marker && state[3] == marker && state[6] == marker) ||
    (state[1] == marker && state[4] == marker && state[7] == marker) ||
    (state[2] == marker && state[5] == marker && state[8] == marker) ||
    (state[0] == marker && state[4] == marker && state[8] == marker) ||
    (state[6] == marker && state[4] == marker && state[2] == marker)
  ){
    return true;
  } else {
    return false;
  }
}

module.exports = Game;
