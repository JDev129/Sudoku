import React from "react";
import SudokuPuzzle from "./SudokuPuzzle";
import StateSelector from "./ReactStateSelector";
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
      configurationSet: this.configurationSet,
      setSudokuStart: this.setSudokuStart,
      host: this.host,
      stateSelectorSetup: this.stateSelectorSetup
    };
  }

  configurationSet() {
    this.setState({
      showConfiguration: false
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
  host() {
    return this;
  }

  render() {
    return (
      <>
        {this.state.showConfiguration ? (
          <>
            <StateSelector
              host={this.state.host.bind(this)}
              setup={(function configureSetup() {
                return {
                  headerTitle:
                    "Please select how many cells you want to have when starting a new sudoku puzzle. ",
                  onSubmit: "configurationSet",
                  host: "host",
                  state: {
                    values: [
                      {
                        name: "superEasyStart",
                        properties: { label: "Super Easy", type: "number" },
                        conditions: { greaterThen: 0, lessThen: 80 }
                      },
                      {
                        name: "easyNumberStart",
                        properties: { label: "Easy", type: "number" },
                        conditions: { greaterThen: 0, lessThen: 80 }
                      },
                      {
                        name: "mediumNumberStart",
                        properties: { label: "Medium", type: "number" },
                        conditions: { greaterThen: 0, lessThen: 80 }
                      },
                      {
                        name: "hardNumberStart",
                        properties: { label: "Hard", type: "number" },
                        conditions: { greaterThen: 0, lessThen: 80 }
                      },
                      {
                        name: "showOnlyValidEntitries",
                        properties: {
                          label:
                            "Provide only valid candidates when player attempts to edit a cell",
                          note:
                            "*this allow users to input invalid entries. Only" +
                            " when the player finishes the games does the system" +
                            " reveal if the player has solved the puzzle correctly.",
                          type: "boolean"
                        }
                      }
                    ]
                  }
                };
              })()}
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
                  " number of starts to a larger value"
                ) : (
                  <></>
                )}
                <br />
                <br />
                <div style={{ width: "400px" }}>
                  Please select difficulty level
                  <button
                    className="btn btn-s btn-info"
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
