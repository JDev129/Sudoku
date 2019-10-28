import React from "react";
import SudokuPuzzle from "./SudokuPuzzle";
class SudokuStart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfStarts: 0,
      difficultySelected: false,
      notSelected: true,
      difficultyLevel: "",
      handleSelection: this.handleSelection,
      getNumberOfStarts: this.getNumberOfStarts,
      restart: this.restart,
      superEasyStart: 75,
      easyNumberStart: 55,
      mediumNumberStart: 45,
      hardNumberStart: 35
    };
  }

  handleSelection(e) {
    this.setState({
      difficultyLevel: e.target.value,
      notSelected: false
    });
  }
  restart() {
    this.setState({
      difficultySelected: false
    });
  }
  getNumberOfStarts(difficulty) {
    switch (difficulty) {
      case "supereasy":
        return this.superEasyStart;
      case "easy":
        return this.easyNumberStart;
      case "medium":
        return this.mediumNumberStart;
      case "hard":
        return this.hardNumberStart;
    }
  }
  render() {
    return (
      <>
        {this.state.difficultySelected ? (
          <SudokuPuzzle
            numberOfStarts={this.state.numberOfStarts}
            restart={this.state.restart.bind(this)}
          />
        ) : (
          <div>
            <h2>Try solving a Sudoku puzzle</h2>
            Please select difficulty level
            <div style={{ paddingLeft: "10px" }}>
              <div>
                <div>
                  <input
                    type="radio"
                    name="difficulty"
                    value="supereasy"
                    checked={this.state.difficultyLevel === "supereasy"}
                    onChange={this.state.handleSelection.bind(this)}
                  />
                  &nbsp;
                  <label>Super easy</label>
                </div>
                <input
                  type="radio"
                  name="difficulty"
                  value="easy"
                  checked={this.state.difficultyLevel === "easy"}
                  onChange={this.state.handleSelection.bind(this)}
                />
                &nbsp;
                <label>Easy</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="difficulty"
                  value="medium"
                  checked={this.state.difficultyLevel === "medium"}
                  onChange={this.state.handleSelection.bind(this)}
                />
                &nbsp;
                <label>Medium</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="difficulty"
                  value="hard"
                  checked={this.state.difficultyLevel === "hard"}
                  onChange={this.state.handleSelection.bind(this)}
                />
                &nbsp;
                <label>Hard</label>
              </div>
            </div>
            <br />
            <button
              disabled={this.state.notSelected}
              onClick={() =>
                this.setState({
                  difficultySelected: true,
                  numberOfStarts: this.state.getNumberOfStarts(
                    this.state.difficultyLevel
                  )
                })
              }
            >
              Start
            </button>
          </div>
        )}
      </>
    );
  }
}
export default SudokuStart;
