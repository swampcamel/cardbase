$(function (){

  var suit = ["&spades;", "&clubs;", "&diams;", "&hearts;"];
  var num = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];
  var deck = [];
  var deck1 = [];
  var deck2 = [];
  var graveyard2 = [];
  var graveyard1 = [];

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  suit.forEach(function(suit){
  	num.forEach(function(num){
    	deck.push(num + " of " + suit);
    });
  });

  $("#shuffle").click(function() {
    shuffle(deck);
    console.log(deck);
  });

  $("#cut").click(function() {
    deck1 = deck.slice();
    deck2 = deck1.splice(0, Math.ceil(deck1.length / 2));
    console.log(deck1);
    console.log(deck2);
  });

  $("#draw1").click(function() {
    var drawn = deck1.pop();
    graveyard1.push(drawn);
    $("#card1").html(drawn);
    console.log(deck1);
    console.log(graveyard1);
    $("#discard1").append("<li>" + drawn + "</li>");

  });

  $("#draw2").click(function() {
    var drawn = deck2.pop();
    graveyard2.push(drawn);
    $("#card2").html(drawn);
    console.log(deck2);
    console.log(graveyard2);
    $("#discard2").append("<li>" + drawn + "</li>");
  });

});
