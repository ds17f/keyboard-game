// $(document).keypress(function(e){
//   var checkWebkitandIE=(e.which==26 ? 1 : 0);
//   var checkMoz=(e.which==122 && e.ctrlKey ? 1 : 0);
//
//   if (checkWebkitandIE || checkMoz) $("body").append("<p>ctrl+z detected!</p>");
//   console.log(e.which)
// });

document.onkeydown = function(evt) {
  evt = evt || window.event;

  let letterDiv = document.getElementById("letter");
  let audioPlayer = document.getElementById("audioPlayer");
  console.log(audioPlayer);

  let randomColor = Math.floor(Math.random()*16777215).toString(16);
  let pressedKey = String.fromCharCode(evt.keyCode);

  // make it visible again
  letterDiv.style.opacity = 1;
  // set the color
  letterDiv.style.color = "#" + randomColor;
  // show the letter
  letterDiv.innerText = pressedKey;

  // play audio
  audioPlayer.src = `audio/${pressedKey}.mp3`;
  audioPlayer.play();

  // then fade it out
  fadeOutEffect("letter");

};



function fadeOutEffect(target) {
  let fadeTarget = document.getElementById(target);
  let fadeEffect = setInterval(function () {
    if (!fadeTarget.style.opacity) {
      fadeTarget.style.opacity = 1;
    }
    if (fadeTarget.style.opacity > 0) {
      fadeTarget.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
    }
  }, 200);
}
