var assert = require('chai').assert;
var Game = require('../game.js');

describe("games have a state", function(){
  it("returns it's state when asked", function(){
    var game = new Game(['o','x','o','x','o','x','n','n','n']);
    assert.deepEqual(game.boardState, ['o','x','o','x','o','x','n','n','n']);
  });
});

describe("games can find winner first condition", function(){
  it("returns the winner", function(){
    var game = new Game(['o','o','o','x','n','x','x','n','n']);
    var winner = game.checkForWinner();
    assert.equal(winner, "o");
  });
});

describe("games can find winner second condition", function(){
  it("returns the winner", function(){
    var game = new Game(['o','x','o','x','x','x','o','o','n']);
    var winner = game.checkForWinner();
    assert.equal(winner, "x");
  });
});

describe("games can find winner third condition", function(){
  it("returns the winner", function(){
    var game = new Game(['o','n','o','x','o','o','x','x','x']);
    var winner = game.checkForWinner();
    assert.equal(winner, "x");
  });
});

describe("games can find winner fourth condition", function(){
  it("returns the winner", function(){
    var game = new Game(['o','n','o','o','x','n','o','x','x']);
    var winner = game.checkForWinner();
    assert.equal(winner, "o");
  });
});

describe("games can find winner fifth condition", function(){
  it("returns the winner", function(){
    var game = new Game(['o','x','o','o','x','n','n','x','n']);
    var winner = game.checkForWinner();
    assert.equal(winner, "x");
  });
});

describe("games can find winner sixth condition", function(){
  it("returns the winner", function(){
    var game = new Game(['o','x','o','x','x','o','n','n','o']);
    var winner = game.checkForWinner();
    assert.equal(winner, "o");
  });
});

describe("games can find winner seventh condition", function(){
  it("returns the winner", function(){
    var game = new Game(['o','n','n','n','o','n','n','n','o']);
    var winner = game.checkForWinner();
    assert.equal(winner, "o");
  });
});

describe("games can find winner eigth condition", function(){
  it("returns the winner", function(){
    var game = new Game(['o','n','x','n','x','n','x','n','o']);
    var winner = game.checkForWinner();
    assert.equal(winner, "x");
  });
});

describe("games can find no winner", function(){
  it("returns the winner", function(){
    var game = new Game(['o','n','x','n','n','n','x','n','o']);
    var winner = game.checkForWinner();
    assert.equal(winner, "none");
  });
});
