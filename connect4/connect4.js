const cells = document.querySelectorAll(".cell:not(.row-top)");
const topCells = document.querySelectorAll(".cell.row-top");
const resetButton = document.querySelector(".reset");
const statusSpan = document.querySelector(".status");
const startButton = document.querySelector(".start");

const col0 = [
  cells[35],
  cells[28],
  cells[21],
  cells[14],
  cells[7],
  cells[0],
  topCells[0],
];
const col1 = [
  cells[36],
  cells[29],
  cells[22],
  cells[15],
  cells[8],
  cells[1],
  topCells[1],
];
const col2 = [
  cells[37],
  cells[30],
  cells[23],
  cells[16],
  cells[9],
  cells[2],
  topCells[2],
];
const col3 = [
  cells[38],
  cells[31],
  cells[24],
  cells[17],
  cells[10],
  cells[3],
  topCells[3],
];
const col4 = [
  cells[39],
  cells[32],
  cells[25],
  cells[18],
  cells[11],
  cells[4],
  topCells[4],
];
const col5 = [
  cells[40],
  cells[33],
  cells[26],
  cells[19],
  cells[12],
  cells[5],
  topCells[5],
];
const col6 = [
  cells[41],
  cells[34],
  cells[27],
  cells[20],
  cells[13],
  cells[6],
  topCells[6],
];
const columns = [col0, col1, col2, col3, col4, col5, col6];

const topRow = [
  topCells[0],
  topCells[1],
  topCells[2],
  topCells[3],
  topCells[4],
  topCells[5],
  topCells[6],
];
const row0 = [
  cells[0],
  cells[1],
  cells[2],
  cells[3],
  cells[4],
  cells[5],
  cells[6],
];
const row1 = [
  cells[7],
  cells[8],
  cells[9],
  cells[10],
  cells[11],
  cells[12],
  cells[13],
];
const row2 = [
  cells[14],
  cells[15],
  cells[16],
  cells[17],
  cells[18],
  cells[19],
  cells[20],
];
const row3 = [
  cells[21],
  cells[22],
  cells[23],
  cells[24],
  cells[25],
  cells[26],
  cells[27],
];
const row4 = [
  cells[28],
  cells[29],
  cells[30],
  cells[31],
  cells[32],
  cells[33],
  cells[34],
];
const row5 = [
  cells[35],
  cells[36],
  cells[37],
  cells[38],
  cells[39],
  cells[40],
  cells[41],
];
const rows = [row0, row1, row2, row3, row4, row5, topRow];

let gameStatus = false;
let playerSwitch = true;

function cellLocation(cell) {
  const classList = getArray(cell);

  const rowClass = classList.find((className) => className.includes("row"));
  const colClass = classList.find((className) => className.includes("col"));
  const rowIndex = rowClass[4];
  const colIndex = colClass[4];
  const rowNumber = parseInt(rowIndex, 10);
  const colNumber = parseInt(colIndex, 10);

  return [rowNumber, colNumber];
}

function cellColor(cell) {
  const classList = getArray(cell);
  if (classList.includes("yellow")) return "yellow";
  if (classList.includes("red")) return "red";
  return null;
}

function getFirstOpenCellForColumn(colIndex) {
  const column = columns[colIndex];
  const columnWithoutTop = column.slice(0, 6);

  for (const cell of columnWithoutTop) {
    const classList = getArray(cell);
    if (!classList.includes("yellow") && !classList.includes("red")) {
      return cell;
    }
  }

  return null;
}

function getArray(cell) {
  const classList = cell.classList;
  return [...classList];
}

function clearTop(colIndex) {
  const topCell = topCells[colIndex];
  topCell.classList.remove("yellow");
  topCell.classList.remove("red");
}

function winCheck(cells) {
  if (cells.length < 4) return false;

  gameStatus = false;
  for (const cell of cells) {
    cell.classList.add("win");
  }
  statusSpan.textContent = `${playerSwitch ? "Yellow" : "Red"} has won!`;
  return true;
}

function gameStatusCheck(cell) {
  const color = cellColor(cell);
  if (!color) return;
  const [rowIndex, colIndex] = cellLocation(cell);

  let winningCells = [cell];
  let rowCheck = rowIndex;
  let colCheck = colIndex - 1;
  while (colCheck >= 0) {
    const cellCheck = rows[rowCheck][colCheck];
    if (cellColor(cellCheck) === color) {
      winningCells.push(cellCheck);
      colCheck--;
    } else {
      break;
    }
  }
  colCheck = colIndex + 1;
  while (colCheck <= 6) {
    const cellCheck = rows[rowCheck][colCheck];
    if (cellColor(cellCheck) === color) {
      winningCells.push(cellCheck);
      colCheck++;
    } else {
      break;
    }
  }
  let isWinningCombo = winCheck(winningCells);
  if (isWinningCombo) return;

  winningCells = [cell];
  rowCheck = rowIndex - 1;
  colCheck = colIndex;
  while (rowCheck >= 0) {
    const cellCheck = rows[rowCheck][colCheck];
    if (cellColor(cellCheck) === color) {
      winningCells.push(cellCheck);
      rowCheck--;
    } else {
      break;
    }
  }
  rowCheck = rowIndex + 1;
  while (rowCheck <= 5) {
    const cellCheck = rows[rowCheck][colCheck];
    if (cellColor(cellCheck) === color) {
      winningCells.push(cellCheck);
      rowCheck++;
    } else {
      break;
    }
  }
  isWinningCombo = winCheck(winningCells);
  if (isWinningCombo) return;

  winningCells = [cell];
  rowCheck = rowIndex + 1;
  colCheck = colIndex - 1;
  while (colCheck >= 0 && rowCheck <= 5) {
    const cellCheck = rows[rowCheck][colCheck];
    if (cellColor(cellCheck) === color) {
      winningCells.push(cellCheck);
      rowCheck++;
      colCheck--;
    } else {
      break;
    }
  }
  rowCheck = rowIndex - 1;
  colCheck = colIndex + 1;
  while (colCheck <= 6 && rowCheck >= 0) {
    const cellCheck = rows[rowCheck][colCheck];
    if (cellColor(cellCheck) === color) {
      winningCells.push(cellCheck);
      rowCheck--;
      colCheck++;
    } else {
      break;
    }
  }
  isWinningCombo = winCheck(winningCells);
  if (isWinningCombo) return;

  winningCells = [cell];
  rowCheck = rowIndex - 1;
  colCheck = colIndex - 1;
  while (colCheck >= 0 && rowCheck >= 0) {
    const cellCheck = rows[rowCheck][colCheck];
    if (cellColor(cellCheck) === color) {
      winningCells.push(cellCheck);
      rowCheck--;
      colCheck--;
    } else {
      break;
    }
  }
  rowCheck = rowIndex + 1;
  colCheck = colIndex + 1;
  while (colCheck <= 6 && rowCheck <= 5) {
    const cellCheck = rows[rowCheck][colCheck];
    if (cellColor(cellCheck) === color) {
      winningCells.push(cellCheck);
      rowCheck++;
      colCheck++;
    } else {
      break;
    }
  }
  isWinningCombo = winCheck(winningCells);
  if (isWinningCombo) return;

  const rowsWithoutTop = rows.slice(0, 6);
  for (const row of rowsWithoutTop) {
    for (const cell of row) {
      const classList = getArray(cell);
      if (!classList.includes("yellow") && !classList.includes("red")) {
        return;
      }
    }
  }

  gameStatus = false;
  statusSpan.textContent = "Game is a tie!";
}

function handleCellMouseOver(e) {
  if (!gameStatus) return;
  const cell = e.target;
  const [rowIndex, colIndex] = cellLocation(cell);

  const topCell = topCells[colIndex];
  topCell.classList.add(playerSwitch ? "yellow" : "red");
}

function handleCellMouseOut(e) {
  const cell = e.target;
  const [rowIndex, colIndex] = cellLocation(cell);
  clearTop(colIndex);
}

function handleCellClick(e) {
  if (!gameStatus) return;
  const cell = e.target;
  const [rowIndex, colIndex] = cellLocation(cell);

  const openCell = getFirstOpenCellForColumn(colIndex);

  if (!openCell) return;

  openCell.classList.add(playerSwitch ? "yellow" : "red");
  gameStatusCheck(openCell);

  playerSwitch = !playerSwitch;

  clearTop(colIndex);
  if (gameStatus) {
    const topCell = topCells[colIndex];
    topCell.classList.add(playerSwitch ? "yellow" : "red");
  }
}

// Adding Event Listeners
for (const row of rows) {
  for (const cell of row) {
    cell.addEventListener("mouseover", handleCellMouseOver);
    cell.addEventListener("mouseout", handleCellMouseOut);
    cell.addEventListener("click", handleCellClick);
  }
}

resetButton.addEventListener("click", () => {
  for (const row of rows) {
    for (const cell of row) {
      cell.classList.remove("red");
      cell.classList.remove("yellow");
      cell.classList.remove("win");
    }
  }
  gameStatus = false;
  playerSwitch = true;
  statusSpan.textContent = "";
});

startButton.addEventListener("click", () => {
  gameStatus = true;
});
