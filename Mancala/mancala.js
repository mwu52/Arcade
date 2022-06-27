let gameMode = 1;
let player1;
let player2 = "computer";
let curPlayer = 0;
let gameOver = false;
const intStrMaping = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
};

const strIntMaping = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
};

const initGameBoard = {
  0: 0,
  1: 4,
  2: 4,
  3: 4,
  4: 4,
  5: 4,
  6: 4,
  7: 0,
  8: 4,
  9: 4,
  10: 4,
  11: 4,
  12: 4,
  13: 4,
};

let gameBoard = initGameBoard;

function move(divElem) {
  if (!moveValidation(divElem)) {
    return;
  }

  let currentStoneCount = Number(divElem.innerText);

  gameBoard[strIntMaping[divElem.id]] = 0;
  let index = (strIntMaping[divElem.id] + 1) % 14;

  //Start Moving Around Board
  for (let i = currentStoneCount; i > 0; i--) {
    gameBoard[index] += 1;
    index = (index + 1) % 14;
    if (curPlayer === 1 && index === 7) {
      index = 8;
    }
    if (curPlayer === 0 && index === 0) {
      index = 1;
    }
  }

  index = index - 1;

  oppositeSideCheck(index);
  checkGameEnd();

  //Check Extra Turn Conditions
  if (curPlayer === 1 && index === 0) {
    //Go again
    console.log("Go again");
  } else if (curPlayer === 0 && index === 7) {
    //Go again
    console.log("GO again");
  } else {
    if (curPlayer === 1) {
      curPlayer = 0;
    } else {
      curPlayer = 1;
    }
  }

  if (gameMode === 1 && curPlayer === 1) {
    cpuMove();
  }
  renderGameBoard();
}

function moveValidation(divElem) {
  if (divElem.innerText === "") {
    return false;
  }

  if (gameOver) {
    return false;
  }

  if (curPlayer === 0 && strIntMaping[divElem.id] > 7) {
    return false;
  }

  if (curPlayer === 1 && strIntMaping[divElem.id] < 7) {
    return false;
  }
  return true;
}

function oppositeSideCheck(index) {
  //Check if landed in player mancala
  if (index === 0 || index === 7) {
    return;
  }
  //Check if landed on player side
  if ((curPlayer === 0 && index > 7) || (curPlayer === 1 && index < 7)) {
    return;
  }

  const pairMatching = {
    1: 13,
    13: 1,
    2: 12,
    12: 2,
    3: 11,
    11: 3,
    4: 10,
    10: 4,
    5: 9,
    9: 5,
    6: 8,
    8: 6,
  };

  if (gameBoard[pairMatching[index]] > 0) {
    console.log("opposite side empty");
    if (curPlayer === 0) {
      gameBoard[7] += 1;
      gameBoard[7] += gameBoard[pairMatching[index]];
      gameBoard[pairMatching[index]] = 0;
      gameBoard[index] = 0;
    } else {
      gameBoard[0] += 1;
      gameBoard[0] += gameBoard[pairMatching[index]];
      gameBoard[pairMatching[index]] = 0;
      gameBoard[index] = 0;
    }
  }
}

function checkGameEnd() {
  let p1Finished = true;
  let p2Finished = true;

  for (let i = 1; i < 7; i++) {
    if (gameBoard[i] > 0) {
      p1Finished = false;
    }
  }

  for (let i = 8; i < 14; i++) {
    if (gameBoard[i] > 0) {
      p2Finished = false;
    }
  }

  console.log(`game state: p1:${p1Finished} p2:${p2Finished}`);

  if (p1Finished) {
    for (let i = 8; i < 8; i++) {
      gameBoard[0] += gameBoard[i];
      gameBoard[i] = 0;
    }
  } else if (p2Finished) {
    for (let i = 1; i < 7; i++) {
      gameBoard[7] += gameBoard[i];
      gameBoard[i] = 0;
    }
  }

  if (p1Finished || p2Finished) {
    gameOver = true;

    if (gameBoard[0] > gameBoard[7]) {
      document.getElementById("gameOver").innerText = "Player 2 Wins!";
    } else if (gameBoard[0] < gameBoard[7]) {
      document.getElementById("gameOver").innerText = "Player 1 Wins!";
    } else {
      document.getElementById("gameOver").innerText = "It's a Tie!";
    }
  }
}

function reset() {
  curPlayer = Math.round(Math.random());
  for (let i = 0; i < 14; i++) {
    gameBoard[i] = 4;
  }
  gameBoard[0] = 0;
  gameBoard[7] = 0;
  gameOver = false;
  document.getElementById("gameOver").innerText = "";
  renderGameBoard();
}

function switchGameMode() {
  if (gameMode === 1) {
    gameMode = 2;
    document.getElementById("gameMode").innerText = "Mode: Two Player";
    document.getElementById("player2").innerText = "";
  } else {
    gameMode = 1;
    document.getElementById("gameMode").innerText = "Mode: Single Player";
  }
}

function renderGameBoard() {
  renderPlayerLabels();
  for (let i = 0; i < 14; i++) {
    document.getElementById(intStrMaping[i]).innerText = gameBoard[i];
  }
}

function onNameSubmit() {
  player1 = document.getElementById("ip1").value;
  player2 = gameMode === 2 ? document.getElementById("ip2").value : "Computer";

  document.getElementById("player1").innerText = "Player 1: " + player1;
  if (gameMode !== 1) {
    document.getElementById("player2").innerText = "Player 2: " + player2;
  }
  renderPlayerLabels();
}

function renderPlayerLabels() {
  if (curPlayer === 0) {
    document.getElementById("player1Label").innerText = player1 + "'s Turn";
  } else {
    document.getElementById("player1Label").innerText = player1;
  }
  if (curPlayer === 1) {
    document.getElementById("player2Label").innerText = player2 + "'s Turn";
  } else {
    document.getElementById("player2Label").innerText = player2;
  }
}

function cpuMove() {
  let chosenCell;

  for (let i = 8; i < 14; i++) {
    if (gameBoard[i] > 0) {
      chosenCell = i;
      break;
    }
  }

  if (!chosenCell) {
    console.log("CPU has no valid move");
  }

  move(document.getElementById(intStrMaping[chosenCell]));
}
