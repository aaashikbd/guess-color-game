const colorBox = document.querySelector(".color-boxes");

const restart = document.getElementById("try");

const lifeText = document.getElementById("life");

let life = 3;

// random color function

function randomColor() {
  let a = "";
  let b = "";
  let c = "";

  let d = [];

  for (let i = 0; i < 6; i++) {
    a = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
    c = Math.floor(Math.random() * 255);
    const color = document.createElement("div");
    color.setAttribute("class", "color");
    color.style.backgroundColor = "rgb(" + a + "," + b + "," + c + ")";
    colorBox.appendChild(color);
    const getColor = color.style.backgroundColor;
    d.push(getColor);
  }
  const chooseColor = Math.floor(Math.random() * d.length);
  document.querySelector(".color-code").textContent = d[chooseColor];
}

randomColor();

// Colorbox Keys
colorBox.addEventListener("click", function (e) {
  const correct = document.getElementById("correct");
  const displayedColor = document.querySelector(".color-code").textContent;
  const key = e.target;

  if (key.matches(".color")) {
    // if users have enough life to play
    if (life > 0) {
      //if color matches
      if (displayedColor === key.style.backgroundColor) {
        for (let i = 0; i < colorBox.children.length; i++) {
          colorBox.children[i].style.backgroundColor = displayedColor;
        }
        if (correct.textContent === "") {
          const sound = new Audio("sound/ting.mp3");
          sound.play();
        }
        correct.textContent = "Correct!";
        correct.style.color = "green";
        restart.classList.remove("hide");
        restart.textContent = "Play Again!";
      } else {
        key.style.display = "none";
        life--;
        lifeText.textContent = life;
        //if life is less than 1
        if (life < 1) {
          correct.textContent = "You Failed!";
          correct.style.color = "red";
          const lose = new Audio("sound/lose.mp3");
          lose.play();
          restart.classList.remove("hide");
        }
      }
    }
  }
});

// Try again button
restart.addEventListener("click", function () {
  window.location.reload();
});
