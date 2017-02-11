var assert = require('chai').assert;
var Game = require('../game.js');

describe("games have a state", function(){
  it("returns it's state when asked", function(){
    var game = new Game(['o','x','o','x','o','x','n','n','n']);
    assert.deepEqual(game.boardState, ['o','x','o','x','o','x','n','n','n']);
  });
});
