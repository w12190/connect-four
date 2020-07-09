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
  let tempArray = []
  for(let i = 0; i < WIDTH; i++){
    tempArray.push(null)
  }
  for(let i = 0; i < HEIGHT; i++){
    board.push([...tempArray])
  }
  //console.log(board) //DEBUG
}


//Prompt:
//This function is missing the first line, that sets the board variable to the HTML board DOM node. Fix this.
//Add comments to the code that dynamically creates the HTML table.

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  let htmlBoard = document.getElementById('board')

  // Creates, populates, and attaches the row of buttons above the board & apply on-click listeners
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // Constructs the HTML board out of tr and td elements
  // Reference: javachain.com/wp-content/uploads/2014/08/html-table.jpg
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // Create div and set class to 'piece'
  let createDiv = document.createElement("div");
  // making sure class assigned correctly
  createDiv.className = `piece p${currPlayer}`;
  //console.log("checking piece", createDiv, "checking element", document.getElementById(`${y}-${x}`));

  /** TODO: curently all adds to same cell, change to dynamically calculate correct cell */
  // Access cell by its ID and add a piece as a child to that cell
  document.getElementById(`${y}-${x}`).appendChild(createDiv)
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece
 * Takes click event
*/

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
   //check if there is an available spot
   let spotAvailable = false
   console.log(board)
   for(let i = 0;  i < WIDTH; i++){
     for(let j = 0; j < HEIGHT; j++){
         if (!(board[j][i] === 1 || board[j][i] === 2)){
           spotAvailable = true
         }
     }
   }
   if (!spotAvailable){
    endGame("It's a tie guys :(")
   }

  // switch players
  currPlayer = (currPlayer === 1) ? 2 : 1
  
  console.log(currPlayer)
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

  // Checks all cells to see if a win starts there.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
