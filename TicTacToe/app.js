let gameMode = 2;
let player1 = "bob";
let player2 = "joe";
let curPlayer = Math.round(Math.random());
let gameOver = false;
const strIntMaping = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
  };

function move(divElem) {
  let mark;

  if (curPlayer === 1) {
    mark = "X";
  } else {
    mark = "O";
  }

  let id = divElem.id;
  if (divElem.innerText.length > 0 || gameOver === true) {
    return;
  }

  divElem.innerText = mark;
  //   console.log(curPlayer + mark + id);
  checkDraw();
  if (checkWin() === true) {
    gameOver = true;
    window.alert("You win");
  }

  if (curPlayer === 1) {
    curPlayer = 0;
  } else {
    curPlayer = 1;
  }

  if (gameMode === 1 && curPlayer === 1) {
    cpuMove();
  }
}

let win = [
  ["one", "two", "three"],
  ["four", "five", "six"],
  ["seven", "eight", "nine"],
  ["one", "four", "seven"],
  ["two", "five", "eight"],
  ["three", "six", "nine"],
  ["one", "five", "nine"],
  ["three", "five", "seven"],
];

function checkWin() {
  let tempGameBoard;

  for (let i = 0; i < win.length; i++) {
    let check = "";
    for (let j = 0; j < win[i].length; j++) {
      check += document.getElementById(win[i][j]).innerText;
    }
    if (check === "XXX" || check === "OOO") {
      console.log("You win");
      return true;
    }
  }

  return false;
}

function checkDraw() {
    if(document.getElementById("one").innerText.length && 
  document.getElementById("two").innerText.length && 
  document.getElementById("three").innerText.length && 
  document.getElementById("four").innerText.length && 
  document.getElementById("five").innerText.length && 
  document.getElementById("six").innerText.length && 
  document.getElementById("seven").innerText.length && 
  document.getElementById("eight").innerText.length && 
  document.getElementById("nine").innerText.length){
    alert("game draw");
    gameOver = true;
    return true;
  }
  return false;
}

function reset() {
  document.getElementById("one").innerText = "";
  document.getElementById("two").innerText = "";
  document.getElementById("three").innerText = "";
  document.getElementById("four").innerText = "";
  document.getElementById("five").innerText = "";
  document.getElementById("six").innerText = "";
  document.getElementById("seven").innerText = "";
  document.getElementById("eight").innerText = "";
  document.getElementById("nine").innerText = "";

  curPlayer = Math.round(Math.random());
  if (gameMode === 1 && curPlayer === 1 ) {
    cpuMove();
}
  gameOver = false;
}

function onNameSubmit() {
  player1 = document.getElementById("ip1").value;
  player2 = document.getElementById("ip2").value;
  if (gameMode === 1) {
    player2 = "Computer";
  }
  document.getElementById("player1").innerText = "Player 1: " + player1;
  document.getElementById("player2").innerText = "Player 2: " + player2;
}

function cpuMove() {
  move(findAvaiableMove());
}

function findAvaiableMove() {
  
  let breakCount = 0;
  while (1) {
    let cellChoice = Math.round(Math.random() * 8) + 1;
    console.log(cellChoice);
    if (document.getElementById(strIntMaping[cellChoice]).innerText === "") {
      return document.getElementById(strIntMaping[cellChoice]);
    }
    breakCount++;
    if (breakCount === 150) {
      break;
    }
  }
  console.log("Could not find available move");
}

function switchGameMode() {
  if (gameMode === 1) {
    gameMode = 2;
    document.getElementById("player2").innerText = "Player 2:"
  } else {
    gameMode = 1;
    document.getElementById("player2").innerText = "Player 2: Computer";
    if (gameMode === 1 && curPlayer === 1 ) {
        cpuMove();
    }
    
  }
}
