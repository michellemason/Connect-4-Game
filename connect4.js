/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let i = 0; i < HEIGHT; i++) {
    board.push(Array.from({length: WIDTH}));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  //creating new table rows for the clickable area named top & setting their IDs to 'column-top'
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  //When this top row gets clicked, invoke handleClick func.
  top.addEventListener("click", handleClick);

  //loop over the width of the board
  for (let x = 0; x < WIDTH; x++) {
    //for each iteration, creade a new cell with an ID set to its numerical index, then append them to the row 'top' you created
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  //append this newly created top row with cells to the HTML page
  htmlBoard.append(top);

  // TODO: add comment for this code
  //This will be the main board play area
  //loop over the height of the board and create new rows
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    //then, for each row added, loop over the width to add new cells to create columns
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      //set ID to be current index of the row loop 'dash' current index of column loop
      cell.setAttribute("id", `${y}-${x}`);
      //append the new columns to each row
      row.append(cell);
    }
    //append the new rows (which now includes the cells) to the HTML page
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT - 1; y >= 0; y--) {
    if(!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const newDiv = document.createElement('div');
  newDiv.classList.add('piece');
  newDiv.classList.add(`p${currPlayer}`);

  const position = document.getElementById(`${y}-${x}`);
  position.append(newDiv);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  setTimeout(() => {
    alert(msg);
  }, 500);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  //stop the game from continuing if game is over
  if (checkForWin()) {
    setTimeout(() => {
      alert("Game is over, please refresh the page to start a new game!");
    }, 800);
    return;
  }
  // get x from ID of clicked cell
  const x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }
 
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  //loop over the rows, then loop over each cell in the column. 
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      //these are the coordinates needed to win horizontally
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      //to win vertically
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      //to win diagonally right
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      //to win diagonally left
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //if any of these are true, a winner will be called
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
