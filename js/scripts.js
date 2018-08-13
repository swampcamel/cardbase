$(function (){
//declare global variables
  var suits = ["&spades;", "&clubs;", "&diams;", "&hearts;"];
  var nums = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];
  var deck = [];
  var deck1 = [];
  var deck2 = [];
  var graveyard2 = [];
  var graveyard1 = [];
//shuffle
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
//make deck
  suits.forEach(function(suit){
    var counter = 2;
  	nums.forEach(function(num) {
    	deck.push({
        card: num + " of " + suit,
        value: counter
      });
      counter ++;
    });
  });

//call shuffle function
  $("#start").click(function() {
    shuffle(deck);
    deck1 = deck.slice();
    deck2 = deck1.splice(0, Math.ceil(deck1.length / 2));

});



//deck one
  $("#draw").click(function() {

    if (deck1 === undefined || deck1.length == 0) {
      deck1 = graveyard1.slice();
      graveyard1 = [];
      shuffle(deck1);
    }
    if (deck2 === undefined || deck2.length == 0) {
      deck2 = graveyard2.slice();
      graveyard2 = [];
      shuffle(deck2);
    }

    var userDraw = deck1.pop();
    var compDraw = deck2.pop();

    if (compDraw.value > userDraw.value) {
      console.log("lose");
      graveyard2.push(userDraw);
      graveyard2.push(compDraw);

    } else if ( userDraw.value > compDraw.value ) {
      graveyard1.push(userDraw);
      graveyard1.push(compDraw);

      console.log("win");
    } else {
      console.log("tie");
    }
    
    $("#card1").html(userDraw.card);
    $("#card2").html(compDraw.card);
    console.log(deck1);
    console.log(deck2);
    console.log(graveyard1);
    console.log(graveyard2);
  });
});
