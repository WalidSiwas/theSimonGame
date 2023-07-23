let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level  = 0;
let started = false;

// press a kay to start
$(document).keydown(function(e) {
    if (!started && e.key === "a"){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// button got clicked
$(".boxs").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
   
    makeSound(userChosenColour);
    buttonAnmieti(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
});

// check answer
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
        let wrongSound = new Audio("./sounds/wrong.mp3")
        wrongSound.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press A Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

// lnext lvl up
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
    }
  
// animiton for buttons
function buttonAnmieti(e) {
    $("#" + e).addClass("clicked");
    setTimeout(function () {
    $("#" + e).removeClass("clicked");
    }, 100);
}

// sounds for buttons
function makeSound(name) {
    let audio = new Audio("./sounds/"+ name +".mp3");
    audio.play();
}

// add sounds to buttons    another way XDDD my hard way
// $(".greenBox").on("click", function() {
//     let greenSound = new Audio("./sounds/green.mp3");
//     greenSound.play();
//     userChosenColour =  $("#green");
// })
// $(".redBox").on("click", function() {
//     let redSound = new Audio("./sounds/red.mp3");
//     redSound.play();
//     userChosenColour =  $("#red");
// })
// $(".yellowBox").on("click", function() {
//     let yellowSound = new Audio("./sounds/yellow.mp3");
//     yellowSound.play();
//     userChosenColour =  $("#yellow");
// })
// $(".bluebox").on("click", function() {
//     let blueSound = new Audio("./sounds/blue.mp3");
//     blueSound.play();
//     userChosenColour =  $("#blue");
// })


// game over
  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
  