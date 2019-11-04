import React from "react";
import PropTypes from "prop-types";
class SudokuConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      superEasyStart: props.superEasyStart,
      easyNumberStart: props.easyNumberStart,
      mediumNumberStart: props.mediumNumberStart,
      hardNumberStart: props.hardNumberStart,
      setSuperEasyStart: props.setSuperEasyStart,
      setEasyNumberStart: props.setEasyNumberStart,
      setMediumNumberStart: props.setMediumNumberStart,
      setHardNumberStart: props.setHardNumberStart,
      showOnlyValidEntitries: props.showOnlyValidEntitries,
      allowOnlyValidEntries: props.allowOnlyValidEntries,
      setShowOnlyValidEntitries: props.setShowOnlyValidEntitries,
      setAllowOnlyValidEntries: props.setAllowOnlyValidEntries,
      configurationSet: props.configurationSet
    };
  }
  render() {
    return (
      <>
        <div>
          <p>
            <em>
              Please select how many cells you want to have when starting a new
              sudoku puzzle.
            </em>
          </p>
        </div>
        <div>
          <input
            value={this.state.superEasyStart}
            style={{ maxWidth: "35px" }}
            onChange={e => {
              this.setState({
                superEasyStart: e.target.value
              });
            }}
          />
          &nbsp;&nbsp;
          <label>Super Easy</label>
        </div>
        <div>
          <input
            value={this.state.easyNumberStart}
            style={{ maxWidth: "35px" }}
            onChange={e => {
              this.setState({
                easyNumberStart: e.target.value
              });
            }}
          />
          &nbsp;&nbsp;
          <label>Easy</label>
        </div>
        <div>
          <input
            value={this.state.mediumNumberStart}
            onChange={e => {
              this.setState({
                mediumNumberStart: e.target.value
              });
            }}
            style={{ maxWidth: "35px" }}
          />
          &nbsp;&nbsp;
          <label>Medium</label>
        </div>
        <div>
          <input
            value={this.state.hardNumberStart}
            onChange={e => {
              this.setState({
                hardNumberStart: e.target.value
              });
            }}
            style={{ maxWidth: "35px" }}
          />
          &nbsp;&nbsp;
          <label>Hard</label>
          <div>
            <input
              checked={this.state.showOnlyValidEntitries}
              onChange={e => {
                this.setState({
                  showOnlyValidEntitries: e.target.checked
                });
              }}
              type="checkbox"
            />
            &nbsp;&nbsp;
            <label>
              Provide only valid candidates when player attempts to edit a cell
            </label>
          </div>
          <div>
            <input
              checked={this.state.allowOnlyValidEntries}
              onChange={e => {
                this.setState({
                  allowOnlyValidEntries: e.target.checked
                });
              }}
              type="checkbox"
            />
            &nbsp;&nbsp;
            <label>Allow for invalid puzzles*</label>
            <br />
            <em>
              *this allow users to input invalid entries. Only when the player
              finishes the games does the system reveal if the player has solved
              the puzzle correctly.
            </em>
          </div>
          <button
            style={{ float: "right" }}
            className="btn btn-sm btn-primary"
            onClick={() => {
              this.state.setEasyNumberStart(this.state.easyNumberStart);
              this.state.setMediumNumberStart(this.state.mediumNumberStart);
              this.state.setHardNumberStart(this.state.hardNumberStart);
              this.state.setSuperEasyStart(this.state.superEasyStart);
              this.state.setShowOnlyValidEntitries(
                this.state.showOnlyValidEntitries
              );
              this.state.setAllowOnlyValidEntries(
                this.state.allowOnlyValidEntries
              );
              this.state.configurationSet();
            }}
          >
            Commit
          </button>
        </div>
      </>
    );
  }
}
SudokuConfiguration.propTypes = {
  superEasyStart: PropTypes.number.isRequired,
  easyNumberStart: PropTypes.number.isRequired,
  mediumNumberStart: PropTypes.number.isRequired,
  hardNumberStart: PropTypes.number.isRequired,
  setSuperEasyStart: PropTypes.func.isRequired,
  setEasyNumberStart: PropTypes.func.isRequired,
  setMediumNumberStart: PropTypes.func.isRequired,
  setHardNumberStart: PropTypes.func.isRequired,
  showOnlyValidEntitries: PropTypes.func.isRequired,
  allowOnlyValidEntries: PropTypes.func.isRequired,
  setShowOnlyValidEntitries: PropTypes.func.isRequired,
  setAllowOnlyValidEntries: PropTypes.func.isRequired,
  configurationSet: PropTypes.func.isRequired
};
export default SudokuConfiguration;
