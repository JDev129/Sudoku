import React from "react";
import Sudoku from "./Sudoku";
import PropTypes from "prop-types";
class SudokuPuzzle extends React.Component {
  constructor(props) {
    super(props);
    const myNewPuzzle = this.findAValidSudoku(props.numberOfStarts);
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
      candidates: this.candidates
    };
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
  findDifficultyLevel(numberofstarts) {
    if (numberofstarts < 40) return "hard";
    if (numberofstarts >= 40 && numberofstarts < 50) return "medium";
    if (numberofstarts >= 50 && numberofstarts < 81) return "easy";
  }
  getStarts(theTable) {
    const result = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (theTable[i][j] != ".") {
          result.push(
            this.getColPosition(j).toUpperCase() + (i + 1).toString()
          );
        }
      }
    }
    return result;
  }

  cellChange(newNumber, row, col) {
    const newPuzzle = this.state.currentPositionTable;
    let emptyBlockFound = false;
    for (let prow = 0; prow < 9; prow++) {
      for (let pcol = 0; pcol < 9; pcol++) {
        //todo check its valid
        // const candidiates = this.getCandidates(
        //   this.state.currentPositionTable,
        //   prow,
        //   pcol
        // );
        // const currentCandidate = newNumber;
        if (prow == row && pcol == col) {
          newPuzzle[prow][pcol] = newNumber;
        }
        if (newPuzzle[prow][pcol] == ".") {
          emptyBlockFound = true;
        }
      }
    }
    if (!emptyBlockFound) {
      clearInterval(this.state.timerID);
    }
    if (this.state.currentActiveMove == this.state.moveID) {
      const currentMoveName = !emptyBlockFound
        ? "complete"
        : this.getColPosition(col) + (row + 1).toString();
      this.setState({
        moves: [
          ...this.state.moves,
          {
            name: currentMoveName,
            id: this.state.moveID + 1,
            puzzle: this.cloneNestedArray(newPuzzle)
          }
        ],
        currentPosition: this.convertToSudoku(this.cloneNestedArray(newPuzzle)),
        currentPositionTable: this.cloneNestedArray(newPuzzle),
        moveID: this.state.moveID + 1,
        currentActiveMove: this.state.moveID + 1,
        solved: !emptyBlockFound
      });
    } else {
      const currentMoveName = !emptyBlockFound
        ? "complete"
        : this.getColPosition(col) + (row + 1).toString();
      if (emptyBlockFound && this.state.solved) {
        this.setState({
          timerID: setInterval(this.tick.bind(this), 50)
        });
      }
      let theMoves = [];
      for (let i = 0; i < this.state.moves.length; i++) {
        if (i <= this.state.currentActiveMove) {
          theMoves.push(this.state.moves[i]);
        }
      }
      theMoves.push({
        name: currentMoveName,
        id: this.state.currentActiveMove + 1,
        puzzle: this.cloneNestedArray(newPuzzle)
      });
      this.setState({
        moves: theMoves,
        currentPosition: this.convertToSudoku(this.cloneNestedArray(newPuzzle)),
        currentPositionTable: this.cloneNestedArray(newPuzzle),
        moveID: this.state.currentActiveMove + 1,
        currentActiveMove: this.state.currentActiveMove + 1,
        solved: !emptyBlockFound
      });
    }
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

  getColPosition(col) {
    switch (col) {
      case 0:
        return "a";
      case 1:
        return "b";
      case 2:
        return "c";
      case 3:
        return "d";
      case 4:
        return "e";
      case 5:
        return "f";
      case 6:
        return "g";
      case 7:
        return "h";
      case 8:
        return "i";
      default:
        return "";
    }
  }

  convertToSudoku(table) {
    let result = {};
    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
        if (table[i - 1][j - 1] === ".") continue;
        result[this.getColPosition(j - 1) + i.toString()] = table[i - 1][j - 1];
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
      //result.start = this.cloneNestedArray(table);
      let stepsCount = 0;
      if (this.solvePuzzle(table, stepsCount)) {
        result.start = this.cloneNestedArray(
          this.getRandomStart(this.cloneNestedArray(table), numberofstarts)
        );
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
        {this.state.solved ? (
          <div>
            Congratulations!! You solved the puzzle in{" "}
            {minutes > 0 ? <>{minutes} minutes and</> : <></>}
            {remainingSeconds} seconds
          </div>
        ) : (
          <></>
        )}
        <Sudoku
          positions={this.state.currentPosition}
          table={this.state.currentPositionTable}
          possibleCandidates={this.state.candidates.bind(this)}
          cellChange={this.state.cellChange.bind(this)}
          starts={this.state.starts}
        />
        <br></br>
        <label>Goto Move</label>
        <div>
          {this.state.moves.map(move => (
            <>
              {move.id % 24 == 0 ? <br /> : <></>}
              <a
                style={{
                  paddingLeft: "5px",
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
  restart: PropTypes.func.isRequired
};

export default SudokuPuzzle;
