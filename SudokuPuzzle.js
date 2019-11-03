import React from "react";
import Sudoku from "./Sudoku";
import PropTypes from "prop-types";
class SudokuPuzzle extends React.Component {
  constructor(props) {
    super(props);
    let myNewPuzzle = this.findAValidSudoku(props.numberOfStarts);
    if (myNewPuzzle == undefined) {
      props.noSolutionFound();
      myNewPuzzle = {};
      myNewPuzzle.start = this.emptyTable();
    }
    myNewPuzzle.solution = this.emptyTable();
    const solutionTable = this.convertToSudoku(myNewPuzzle.solution);
    const currentPos = this.convertToSudoku(myNewPuzzle.start);
    this.state = {
      solution: solutionTable,
      startTable: myNewPuzzle.start,
      solutionTable: myNewPuzzle.solution,
      currentPositionTable: myNewPuzzle.start,
      currentPosition: currentPos,
      numberOfStarts: props.numberOfStarts,
      difficultyLevel: this.findDifficultyLevel(props.numberOfStarts),
      elapsed: 0,
      timerID: 0,
      start: Date.now(),
      moves: [
        {
          name: "start",
          id: 0,
          puzzle: this.cloneNestedArray(myNewPuzzle.start)
        }
      ],
      cellChange: this.cellChange,
      starts: this.getStarts(myNewPuzzle.start),
      moveID: 0,
      currentActiveMove: 0,
      solved: false,
      redirectToNewGame: false,
      restart: props.restart,
      candidates: this.candidates,
      alphaColumnConvert: this.alphaCol,
      alphaCol: this.alphaCol,
      inValidSolution: false,
      allowAnyEntry: props.allowAnyEntry
    };
  }
  setInValidSolution() {
    this.setState({
      inValidSolution: true
    });
  }
  setValidSolution() {
    this.setState({
      inValidSolution: false
    });
  }
  componentDidMount() {
    this.setState({
      timerID: setInterval(this.tick.bind(this), 50)
    });
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({ elapsed: new Date() - this.state.start });
  }
  alphaCol(col, isLower) {
    switch (col) {
      case 0:
        return !isLower ? "A" : "a";
      case 1:
        return !isLower ? "B" : "b";
      case 2:
        return !isLower ? "C" : "c";
      case 3:
        return !isLower ? "D" : "d";
      case 4:
        return !isLower ? "E" : "e";
      case 5:
        return !isLower ? "F" : "f";
      case 6:
        return !isLower ? "G" : "g";
      case 7:
        return !isLower ? "H" : "h";
      case 8:
        return !isLower ? "I" : "i";
      default:
        return "";
    }
  }
  findDifficultyLevel(numberofstarts) {
    return numberofstarts < 40
      ? "hard"
      : numberofstarts >= 40 && numberofstarts < 50
      ? "medium"
      : numberofstarts >= 70
      ? "super easy "
      : numberofstarts >= 50 && numberofstarts < 81
      ? "easy"
      : "";
  }
  getStarts(theTable) {
    const result = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (theTable[i][j] != ".") {
          result.push(
            this.alphaCol(j, true).toUpperCase() + (i + 1).toString()
          );
        }
      }
    }
    return result;
  }

  cellChange(newNumber, row, col) {
    const newPuzzle = this.state.currentPositionTable;
    let emptyBlockFound = false;
    let validPuzzle = true;
    for (let prow = 0; prow < 9; prow++) {
      for (let pcol = 0; pcol < 9; pcol++) {
        if (prow == row && pcol == col) {
          let theCandidates = this.candidates(
            this.state.currentPositionTable,
            row,
            col
          ).numberArray;
          let isValidOption = false;
          for (let i = 0; i < theCandidates.length; i++) {
            if (theCandidates[i] == newNumber) {
              isValidOption = true;
            }
          }
          validPuzzle = isValidOption;
          newPuzzle[prow][pcol] = newNumber;
        }
        if (newPuzzle[prow][pcol] == ".") {
          emptyBlockFound = true;
        }
      }
    }
    if (!emptyBlockFound) {
      if (!validPuzzle) {
        this.setInValidSolution();
      }
      clearInterval(this.state.timerID);
    }
    const currentMoveName = !emptyBlockFound
      ? "complete"
      : this.alphaCol(col, true) + (row + 1).toString();
    this.state.currentActiveMove == this.state.moveID
      ? this.setState({
          moves: [
            ...this.state.moves,
            {
              name: currentMoveName,
              id: this.state.moveID + 1,
              puzzle: this.cloneNestedArray(newPuzzle)
            }
          ],
          currentPosition: this.convertToSudoku(
            this.cloneNestedArray(newPuzzle)
          ),
          currentPositionTable: this.cloneNestedArray(newPuzzle),
          moveID: this.state.moveID + 1,
          currentActiveMove: this.state.moveID + 1,
          solved: !emptyBlockFound
        })
      : this.setState({
          moves: this.buildArray(
            i => i <= this.state.currentActiveMove,
            this.state.moves,
            {
              name: currentMoveName,
              id: this.state.currentActiveMove + 1,
              puzzle: this.cloneNestedArray(newPuzzle)
            }
          ),
          currentPosition: this.convertToSudoku(
            this.cloneNestedArray(newPuzzle)
          ),
          currentPositionTable: this.cloneNestedArray(newPuzzle),
          moveID: this.state.currentActiveMove + 1,
          currentActiveMove: this.state.currentActiveMove + 1,
          solved: !emptyBlockFound,
          timerID:
            emptyBlockFound && this.state.solved
              ? setInterval(this.tick.bind(this), 50)
              : this.state.timerID,
          inValidSolution: !emptyBlockFound && !validPuzzle
        });
  }

  buildArray(condition, theArray, additionalPush) {
    let theResult = [];
    for (let i = 0; i < theArray.length; i++) {
      if (condition(i)) {
        theResult.push(theArray[i]);
      }
    }
    theResult.push(additionalPush);
    return theResult;
  }
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  candidates(table, row, col) {
    let result = {
      stringArray: "",
      numberArray: []
    };
    for (let c = "1"; c <= "9"; c++) {
      let collision = false;
      for (let i = 0; i < 9; i++) {
        if (
          table[row][i] == c ||
          table[i][col] == c ||
          table[row - (row % 3) + Math.floor(i / 3)][
            col - (col % 3) + (i % 3)
          ] == c
        ) {
          collision = true;
          break;
        }
      }
      if (!collision) {
        result.numberArray.push(parseInt(c, 10));
        result.stringArray += c;
      }
    }
    return result;
  }
  solveAnotherWayPuzzle(table, stepsCount, firstSolution) {
    let solved = false;
    let row = -1;
    let col = -1;
    let candidates = null;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (table[i][j] == ".") {
          //let newCandidates = this.candidates(table, i, j).stringArray;
          let newCandidates = this.candidates(table, i, j).numberArray;
          let validNewCands = [];
          for (var k = 0; k < newCandidates.length; k++)
            if (newCandidates[k].toString() != firstSolution[i][j])
              validNewCands.push(newCandidates[k]);
          if (row < 0 || validNewCands.length < candidates.length) {
            row = i;
            col = j;
            //candidates = newCandidates;
            candidates = validNewCands.toString();
          }
        }
      }
    }
    if (row < 0) {
      solved = true;
    } else {
      for (let i = 0; i < candidates.length; i++) {
        table[row][col] = candidates[i];
        if (stepsCount >= 10000000) {
          return false;
        }
        stepsCount++;
        if (this.solveAnotherWayPuzzle(table, stepsCount, firstSolution)) {
          solved = true;
          break;
        }
        table[row][col] = ".";
      }
    }
    return solved;
  }
  solvePuzzle(table, stepsCount) {
    let solved = false;
    let row = -1;
    let col = -1;
    let candidates = null;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (table[i][j] == ".") {
          let newCandidates = this.candidates(table, i, j).stringArray;
          if (row < 0 || newCandidates.length < candidates.length) {
            row = i;
            col = j;
            candidates = newCandidates;
          }
        }
      }
    }
    if (row < 0) {
      solved = true;
    } else {
      for (let i = 0; i < candidates.length; i++) {
        table[row][col] = candidates[i];
        if (stepsCount >= 10000000) {
          return false;
        }

        stepsCount++;
        if (this.solvePuzzle(table, stepsCount)) {
          solved = true;
          break;
        }
        table[row][col] = ".";
      }
    }
    return solved;
  }

  convertToSudoku(table) {
    let result = {};
    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
        if (table[i - 1][j - 1] === ".") continue;
        result[this.alphaCol(j - 1, true) + i.toString()] = table[i - 1][j - 1];
      }
    }
    return result;
  }

  emptyTable() {
    return [
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."]
    ];
  }

  cloneNestedArray(table) {
    return JSON.parse(JSON.stringify(table));
  }

  findAValidSudoku(numberofstarts) {
    let tries = 4;
    let result = {};
    while (tries > 0) {
      let table = this.randomSudoku(this.emptyTable(), 24);
      let stepsCount = 0;
      if (this.solvePuzzle(table, stepsCount)) {
        result.start = this.cloneNestedArray(
          this.getRandomStart(this.cloneNestedArray(table), numberofstarts)
        );
        if (
          this.solveAnotherWayPuzzle(
            this.cloneNestedArray(result.start),
            stepsCount,
            this.cloneNestedArray(table)
          )
        ) {
          if (tries > 0) {
            tries--;
            continue;
          }
        }
        result.solution = table;
        return result;
      } else {
        if (tries > 0) {
          tries--;
          continue;
        }
      }
    }
  }
  getRandomStart(completedTable, numberOfStarts) {
    let clearedPosistions = [];
    let emptyCells = 0;
    while (emptyCells < 81 - numberOfStarts) {
      let row = this.getRndInteger(0, 9);
      let col = this.getRndInteger(0, 9);
      let foundClearedPosition = clearedPosistions.find(x => {
        return x.Key == row && x.Value == col;
      });
      if (foundClearedPosition != undefined) continue;
      completedTable[row][col] = ".";
      emptyCells++;
      clearedPosistions.push({ Key: row, Value: col });
    }
    return completedTable;
  }
  randomSudoku(theTable, numberOfStarts) {
    let setPositions = [];
    while (numberOfStarts > 0) {
      let randomRow = this.getRndInteger(0, 9);
      let randomCol = this.getRndInteger(0, 9);
      let usedPositions = setPositions.find(position => {
        return position.row == randomRow && position.col == randomCol;
      });
      if (usedPositions != undefined) {
        continue;
      }
      let possibleCandidates = this.candidates(theTable, randomRow, randomCol)
        .stringArray;
      if (possibleCandidates != undefined && possibleCandidates.length > 0) {
        theTable[randomRow][randomCol] =
          possibleCandidates[this.getRndInteger(0, possibleCandidates.length)];
        numberOfStarts--;
        setPositions.push({ randomRow, randomCol });
      }
    }
    return theTable;
  }

  render() {
    let seconds = (Math.round(this.state.elapsed / 100) / 10).toFixed(1);
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = (seconds - minutes * 60).toFixed(1);
    return (
      <>
        <div className="row">
          <button
            onClick={() => {
              this.state.restart();
            }}
          >
            New Game
          </button>

          <h3
            style={{
              position: "relative",
              left: minutes > 0 ? "155px" : "350px"
            }}
          >
            {minutes > 0 ? <>{minutes} minutes and</> : <></>}{" "}
            {remainingSeconds} seconds
          </h3>
        </div>

        <br />
        <label>Diffiulty Level: {this.state.difficultyLevel}</label>

        {this.state.inValidSolution ? (
          <>
            <br />
            <div className="jumbotron">
              Sorry but this is NOT a valid sudoku solution!{" "}
              <p>
                Please back up to a previous step and retry to find the correct
                solution
              </p>
            </div>
          </>
        ) : (
          <>
            {this.state.solved ? (
              <div className="jumbotron">
                Congratulations!! You solved the puzzle in{" "}
                {minutes > 0 ? <>{minutes} minutes and</> : <></>}
                {remainingSeconds} seconds
              </div>
            ) : (
              <></>
            )}
          </>
        )}

        <Sudoku
          positions={this.state.currentPosition}
          table={this.state.currentPositionTable}
          possibleCandidates={this.state.candidates.bind(this)}
          cellChange={this.state.cellChange.bind(this)}
          starts={this.state.starts}
          alphaColumnConvert={this.state.alphaColumnConvert}
          allowAnyEntry={this.state.allowAnyEntry}
        />
        <br></br>
        <label>Go to Move</label>
        <div>
          {this.state.moves.map(move => (
            <>
              {move.id % 24 == 0 ? <br /> : <></>}
              <a
                style={{
                  paddingLeft: "5px",
                  paddingBottom: "20px",
                  fontWeight:
                    move.id == this.state.currentActiveMove ? "bold" : ""
                }}
                key={move.id}
                onClick={() => {
                  this.setState({
                    currentPosition: this.convertToSudoku(
                      this.cloneNestedArray(move.puzzle)
                    ),
                    currentPositionTable: this.cloneNestedArray(move.puzzle),
                    currentActiveMove: move.id
                  });
                }}
              >
                {move.name}
              </a>
            </>
          ))}
        </div>
      </>
    );
  }
}

SudokuPuzzle.propTypes = {
  numberOfStarts: PropTypes.number.isRequired,
  restart: PropTypes.func.isRequired,
  noSolutionFound: PropTypes.func.isRequired,
  allowAnyEntry: PropTypes.bool.isRequired
};

export default SudokuPuzzle;
