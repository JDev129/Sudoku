import React from "react";
import SudokuPuzzle from "./SudokuPuzzle";
import SudokuConfiguration from "./SudokuConfiguration";
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
      hardNumberStart: 35,
      canFindValidSolution: true,
      noSolutionFound: this.noSolutionFound,
      showConfiguration: false,
      showOnlyValidEntitries: true,
      allowOnlyValidEntries: true,
      setSuperEasyStart: this.setSuperEasyStart,
      setEasyNumberStart: this.setEasyNumberStart,
      setMediumNumberStart: this.setMediumNumberStart,
      setHardNumberStart: this.setHardNumberStart,
      setShowOnlyValidEntitries: this.setShowOnlyValidEntitries,
      setAllowOnlyValidEntries: this.setAllowOnlyValidEntries,
      configurationSet: this.configurationSet,
      setSudokuStart: this.setSudokuStart
    };
  }
  configurationSet() {
    this.setState({
      showConfiguration: false
    });
  }
  setSudokuStart(newVal, valName, ctx) {
    if (newVal > 0 && newVal <= 81) {
      ctx.setState({
        [valName]: newVal
      });
    }
  }
  setSuperEasyStart(newVal) {
    this.state.setSudokuStart(newVal, "superEasyStart", this);
  }
  setEasyNumberStart(newVal) {
    this.state.setSudokuStart(newVal, "easyNumberStart", this);
  }
  setMediumNumberStart(newVal) {
    this.state.setSudokuStart(newVal, "mediumNumberStart", this);
  }
  setHardNumberStart(newVal) {
    this.state.setSudokuStart(newVal, "hardNumberStart", this);
  }
  setShowOnlyValidEntitries(newVal) {
    this.setState({
      showOnlyValidEntitries: newVal
    });
  }
  setAllowOnlyValidEntries(newVal) {
    this.setState({
      allowOnlyValidEntries: newVal
    });
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
  noSolutionFound() {
    this.setState({
      difficultySelected: false,
      canFindValidSolution: false
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
        {this.state.showConfiguration ? (
          <>
            <SudokuConfiguration
              superEasyStart={this.state.superEasyStart}
              easyNumberStart={this.state.easyNumberStart}
              mediumNumberStart={this.state.mediumNumberStart}
              hardNumberStart={this.state.hardNumberStart}
              setSuperEasyStart={this.state.setSuperEasyStart.bind(this)}
              setEasyNumberStart={this.state.setEasyNumberStart.bind(this)}
              setMediumNumberStart={this.state.setMediumNumberStart.bind(this)}
              setHardNumberStart={this.state.setHardNumberStart.bind(this)}
              showOnlyValidEntitries={this.state.showOnlyValidEntitries}
              allowOnlyValidEntries={this.state.allowOnlyValidEntries}
              setShowOnlyValidEntitries={this.state.setShowOnlyValidEntitries.bind(
                this
              )}
              setAllowOnlyValidEntries={this.state.setAllowOnlyValidEntries.bind(
                this
              )}
              configurationSet={this.state.configurationSet.bind(this)}
            />
          </>
        ) : (
          <>
            {this.state.difficultySelected ? (
              <SudokuPuzzle
                numberOfStarts={this.state.numberOfStarts}
                restart={this.state.restart.bind(this)}
                noSolutionFound={this.state.noSolutionFound.bind(this)}
                allowAnyEntry={!this.state.showOnlyValidEntitries}
              />
            ) : (
              <div>
                <h2>Try solving a Sudoku puzzle</h2>
                {!this.state.canFindValidSolution ? (
                  " We're sorry but we cannot find a solution with that many " +
                  " selected starts. please try reconfiguring the allowed " +
                  " number of starts "
                ) : (
                  <></>
                )}
                <br />
                <br />
                <div>
                  Please select difficulty level
                  <button
                    className="btn btn-xs btn-info"
                    style={{ float: "right" }}
                    onClick={() => {
                      this.setState({
                        showConfiguration: true
                      });
                    }}
                  >
                    Configuration
                  </button>
                </div>
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
        )}
      </>
    );
  }
}
export default SudokuStart;
