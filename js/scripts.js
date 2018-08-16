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

  var tiebreaker = function tieBreaker() {
    var userPot = deck1.splice(0,4);
    var compPot = deck2.splice(0,4);
    console.log(userPot);
    console.log(compPot);

    for ( var draw = 0; draw < 4; draw++ ) {
      $("#player-pile").append('<li class="list-group-item">' + userPot[draw].card + '</li>');
      $("#comp-pile").append('<li class="list-group-item">' + compPot[draw].card + '</li>');
      if(deck1.length == 0 || deck2.length1 == 0) {
          $("title").text("You broke the game!  What the odds!?!");
          break;
      }
    }

    if ( userPot[userPot.length - 1].value > compPot[compPot.length - 1].value ) {
      var highCard = userPot[3].card;
      $("#winner").html("Computer wins with " + highCard + ".");
      var combinedPot = userPot.concat(compPot);
      graveyard1 = graveyard1.concat(combinedPot);

    } else if ( compPot[userPot.length - 1].value > userPot[compPot.length - 1].value ) {
      var highCard = compPot[3].card;
      $("#winner").html("Computer wins with " + highCard + ".");
      var combinedPot = userPot.concat(compPot);
      graveyard2 = graveyard2.concat(combinedPot);

    } else {
      tieBreaker();
      }
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
  $("#draw").show();
  $("#start").hide();
  $("#title").text("TO WAR!");
});



//deck one
$("#draw").click(function() {
  $("#player-pile").empty();
  $("#comp-pile").empty();

  if (deck1.length == 0 && graveyard1.length == 0 ) {
    $("#draw").hide();
    $("#start").show();
    $("#title").text("You lost.")
  }

  if (deck2.length == 0 && graveyard2.length == 0 ) {
    $("#draw").hide();
    $("#start").show();
    $("#title").text("You won.")
  }


  if (deck1.length < 10) {
    deck1 = deck1.concat(graveyard1);
    graveyard1 = [];
    shuffle(deck1);
  }
  if (deck2.length < 10) {
    deck2 = deck2.concat(graveyard2);
    graveyard2 = [];
    shuffle(deck2);
  }

  var userDraw = deck1.pop();
  var compDraw = deck2.pop();

  if (compDraw.value > userDraw.value) {
    console.log("lose");
    $("#winner").html("Computer wins with " + compDraw.card + ".");
    graveyard2.push(userDraw);
    graveyard2.push(compDraw);

  } else if ( userDraw.value > compDraw.value ) {
    $("#winner").html("Player 1 wins with " + userDraw.card + ".");
    graveyard1.push(userDraw);
    graveyard1.push(compDraw);

    console.log("win");
  } else {
    console.log("tie");
    tiebreaker();
  }

  $("#card1").html(userDraw.card);
  $("#card2").html(compDraw.card);
  console.log(deck1);
  console.log(deck2);
  console.log(graveyard1);
  console.log(graveyard2);
  });
});
