var buttonSound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var buttonSound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var buttonSound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var buttonSound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var playInterval;
var delay;
var colors = {
  red: "",
  redHover: "",
  green: "",
  greenHover: "",
  yellow: "",
  yellowHover: "",
  blue: "",
  blueHover: ""
};
var game = {
  power : false,
  start : false,
  strict : false,
  count : 0,
  rounds : 5,
  pattern : '',
  userPattern: '',
};
console.log(game);
$("#power").on('click',function(){
  if(!game.power) {
    game.power = true;
    $("#power").css('background-color','#35A32C');
    $("#screen-log").html("- -");
  } else {
    $("#power").css('background-color','#92140C');
    game.power = false;
    reset();
  }
});
$("#start").on('click',function(){
  if(game.power) {
    if(game.start){
      clearInterval(playInterval);
      clearTimeout(delay);
      userUiOff();
      setDefaultColor();
      $("#screen-log").html("Starting");
      setTimeout(function(){
        game.count = 0;
        game.pattern = "";
        game.userPattern = "";
        generatePattern(); //start the game.
      },2000);
    } else {
      game.start = true;
    //console.log(game);
      $("#screen-log").html("Starting");
      setTimeout(function(){
        generatePattern(); //start the game.
      },1000);
      }
    }
});
$("#strict").on('click',function(){
  if(game.power && !game.start) game.strict?game.strict = false:game.strict = true;
  if(game.strict) $("#strict").css('background-color','#35A32C');
  else $("#strict").css('background-color','#92140C');
});

function generatePattern(){
  if(game.start){
    game.count++;
    $("#screen-log").html(game.count);
    if(game.count <= game.rounds) {
      game.pattern += generateRandomNumber().toString();
      //console.log(game.pattern);
      console.log("When generatePattern is called:   ");
      console.log(game);
      animatePattern();
    }
  }
}

function onUserClick(){
  if(game.power && game.start){ //check if power is on.
    var id = $(this).attr('id');
    id = id.charAt(id.length-1);
    var audio = setButtonSound(id);
    audio.play();
    game.userPattern += id;
    if(game.userPattern.length === game.pattern.length){
       userUiOff(); //Remove the click handler.
       setDefaultColor();
       //console.log(game.userPattern);
      if(game.userPattern === game.pattern) {
        if(game.count === game.rounds){
          $("#screen-log").html("You Won");
        } else {
          game.userPattern = "";
          delay = setTimeout(function(){
            generatePattern();
          },1000);
        }
      }
      else {
        if(!game.strict) {
          game.userPattern = "";
          console.log("trouble");
          animatePattern();
        }
        else {
          $("#screen-log").html("Wrong");
          game.pattern = "";
          game.userPattern = "";
          game.count = 0;
          userUiOff();
          delay = setTimeout(function(){
            $("#screen-log").html("Starting");
            delay = setTimeout(function(){
              generatePattern();
            },1000);
          },1000);
        }
      }
    }
  }
}

function animatePattern(){
  var j = 0;
  var pattern = game.pattern.split('');
  console.log("Pattern passed to animate:  "+pattern);
  playInterval = setInterval(function(){
    if(j < pattern.length){
      console.log("value of j in interval:  "+j);
      //console.log("audio id:  "+pattern[j]);
      var audio = setButtonSound((pattern[j]));
      //console.log("after audio :"+pattern[j]);
      setDefaultColor();
      j++;
      setTimeout(function(){
        //console.log("color id:  "+pattern[j]);
        //console.log("value of j before increment:  "+j);
        setButtonColor(pattern[j-1]);
        //j++;
        audio.play();
      },500);
    } else {
      console.log("Pattern animated:  "+pattern);
      setDefaultColor();
      clearInterval(playInterval);
      userUiOn();  //Allows the user to click.
      j = 0;
    }
  },1000);
}

function generateRandomNumber(){
  var max = 5;
  var min = 1;
  return Math.floor(Math.random()*(max-min))+min;
}
function setButtonSound(id){
  if(id === '1'){
    return buttonSound1;
  } else if(id === '2'){
    return buttonSound2;
  } else if(id === '3'){
    return buttonSound3;
  } else return buttonSound4;
}
function setDefaultColor(){
  $("#button-1").css('background-color','#355419');
  $("#button-2").css('background-color','#7B0828');
  $("#button-3").css('background-color','#027BCE');
  $("#button-4").css('background-color','#DCC002');
}
function setButtonColor(id){
  if(id === '1'){
    $("#button-1").css('background-color','#60992D');
  } else if(id === '2'){
    $("#button-2").css('background-color','#C42017');
  } else if(id === '3'){
    $("#button-3").css('background-color','#4BB3FD');
  } else $("#button-4").css('background-color','#F3DB30');
}
function hoverIn(){
  $("#button-1").on({
    mouseover:function(){
      $("#button-1").css('background-color','#60992D');
    },
    mouseout:function(){
      $("#button-1").css('background-color','#355419');
    }
  });
  $("#button-2").on({
    mouseover:function(){
      $("#button-2").css('background-color','#C42017');
    },
    mouseout:function(){
      $("#button-2").css('background-color','#7B0828');
    }
  });
  $("#button-3").on({
    mouseover:function(){
      $("#button-3").css('background-color','#4BB3FD');
    },
    mouseout:function(){
      $("#button-3").css('background-color','#027BCE');
    }
  });
  $("#button-4").on({
    mouseover:function(){
      $("#button-4").css('background-color','#F3DB30');
    },
    mouseout:function(){
      $("#button-4").css('background-color','#DCC002');
    }
  });
}
function userUiOn(){
  $(".game-button").on('click',onUserClick);
  hoverIn();
}
function userUiOff(){
  $(".game-button").off('click');
  $("#button-1").off('mouseover');
  $("#button-1").off('mouseout');
  $("#button-2").off('mouseover');
  $("#button-2").off('mouseout');
  $("#button-3").off('mouseover');
  $("#button-3").off('mouseout');
  $("#button-4").off('mouseover');
  $("#button-4").off('mouseout');
}
function reset(){
  clearInterval(playInterval);
  clearTimeout(delay);
  userUiOff();
  game.start = false;
  game.count = 0;
  game.pattern = "";
  game.userPattern = "";
  $("#screen-log").html("");
  setDefaultColor();
  setTimeout(function(){
    setDefaultColor();
  },1000);
}
function restart(){
  clearInterval(playInterval);
  userUiOff();
  game.pattern = "";
  game.userPattern = "";
  game.count = 0;
  setTimeout(function(){
    $("#screen-log").html("Starting");
    setTimeout(function(){
      generatePattern();
    },1000);
  },1000);
}
