var assert = require('chai').assert;
var Player = require('../player.js');

describe("players have a marker", function(){
  it("returns it's marker when asked", function(){
    var player = new Player("o", "joey");
    assert.equal(player.marker, "o");
  });
});

describe("players have a name", function(){
  it("returns it's name when asked", function(){
    var player = new Player("o", "joey");
    assert.equal(player.name, "joey");
  });
});
