// $(document).keypress(function(e){
//   var checkWebkitandIE=(e.which==26 ? 1 : 0);
//   var checkMoz=(e.which==122 && e.ctrlKey ? 1 : 0);
//
//   if (checkWebkitandIE || checkMoz) $("body").append("<p>ctrl+z detected!</p>");
//   console.log(e.which)
// });

let targetKey = 0;
let fadeEffect;
document.onkeydown = function(evt) {
  evt = evt || window.event;

  console.log(evt.keyCode);
  clearInterval(fadeEffect);

  if ( evt.keyCode === 32 ) {
    // space
    console.log("space pressed");
    evt.preventDefault();
    targetKey = askQuestion();

  } else if ( evt.keyCode >= 48 && evt.keyCode <= 57 ) {
    // numbers
    showLetterNumber(evt.keyCode, targetKey);

  } else if ( evt.keyCode >= 65 && evt.keyCode <= 90 ) {
    // letters
    showLetterNumber(evt.keyCode, targetKey);

  } else if ( evt.keyCode >= 27 ) {
    // escape
    console.log("escape")
    reset();

  } else {

  }


};

const reset = () => {
  let letterDiv = document.getElementById("letter");
  let audioPlayer = document.getElementById("audioPlayer");
  let promptDiv = document.getElementById("prompt");
  promptDiv.innerHTML = "Press Any Key";
  letterDiv.innerHTML = "";
  console.log(promptDiv)
  targetKey = 0;
};

const showLetterNumber = (keyCode, targetKey) => {

  let win = targetKey === keyCode;
  console.log(win)

  let letterDiv = document.getElementById("letter");
  let audioPlayer = document.getElementById("audioPlayer");
  let promptDiv = document.getElementById("prompt");
  console.log(audioPlayer);

  let randomColor = Math.floor(Math.random()*16777215).toString(16);
  let pressedKey = String.fromCharCode(keyCode);

  // make it visible again
  letterDiv.style.opacity = 1;
  // set the color
  letterDiv.style.color = "#" + randomColor;
  // show the letter
  letterDiv.innerHTML = pressedKey;

  // play audio
  audioPlayer.src = `audio/${pressedKey}.mp3`;
  audioPlayer.play();

  // then fade it out
  fadeOutEffect("letter", promptDiv);

  if (win) {
    document.getElementById("prompt").innerHTML = "YOU DID IT";
  } else if (keyCode) {
    // miss
  }

};

const askQuestion = () => {
  let promptDiv = document.getElementById("prompt");
  let letterDiv = document.getElementById("letter");

  // 48-57
  // 65-90

  let targetKey = Math.floor((Math.random()*36));
  if (targetKey < 10) {
    targetKey += 48;
  } else {
    targetKey += 65 - 10;
  }

  console.log(targetKey);
  let keyToPress = String.fromCharCode(targetKey);

  // on press post the question
  promptDiv.innerHTML = `Find and press: <span class="targetKey">${keyToPress}</span>`
  letterDiv.innerHTML = keyToPress;
  letterDiv.style.opacity = 1;
  letterDiv.style.color = "black";

  return targetKey;
};


function fadeOutEffect(target, prompt) {
  let fadeTarget = document.getElementById(target);
  fadeEffect = setInterval(function () {
    if (!fadeTarget.style.opacity) {
      fadeTarget.style.opacity = 1;
    }
    if (fadeTarget.style.opacity > 0) {
      fadeTarget.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
      //prompt.innerHTML = "Press [______________] to Try Again"
    }
  }, 200);
}
