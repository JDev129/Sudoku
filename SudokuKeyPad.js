import React from "react";
import PropTypes from "prop-types";
class SudokuKeyPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disable1: true,
      disable2: true,
      disable3: true,
      disable4: true,
      disable5: true,
      disable6: true,
      disable7: true,
      disable8: true,
      disable9: true,
      setNumber: props.setNumber,
      watchForClicks: props.watchForClicks,
      row: props.row,
      col: props.col,
      table: props.table,
      possibleCandidates: props.possibleCandidates,
      setDisable: this.setDisable,
      buildDisableTable: this.buildDisableTable,
      alphaCol: props.alphaCol,
      currentActive: this.currentActive,
      resetHighlight: this.resetHighlight,
      addTheseRows: this.addTheseRows
    };
  }
  currentActive() {
    return this.alphaCol(this.col) + (this.row + 1).toString();
  }
  addTheseRows(theResult, writeIn) {
    for (let i = 0; i < writeIn.length; i++) {
      theResult[writeIn[i].name] = writeIn[i].val;
    }
    return theResult;
  }
  buildDisableTable(table, row, col, writeIn) {
    let theResult = {};
    let currentAvNumber = this.possibleCandidates(table, row, col).numberArray;
    for (let j = 1; j < 10; j++) {
      let disableMe = true;
      for (let i = 0; i < currentAvNumber.length; i++) {
        if (j == currentAvNumber[i]) {
          disableMe = false;
        }
      }
      theResult["disable" + j.toString()] = disableMe;
    }
    if (writeIn.length) {
      return this.addTheseRows(theResult, writeIn);
    }
    return theResult;
  }

  static getDerivedStateFromProps(props, state) {
    return props.row !== state.row &&
      props.col !== state.col &&
      props.table !== state.table
      ? state.buildDisableTable(props.table, props.row, props.col, [
          { name: "row", val: props.row },
          { name: "col", val: props.col },
          { name: "table", val: props.table }
        ])
      : props.row !== state.row && props.col !== state.col
      ? state.buildDisableTable(state.table, props.row, props.col, [
          { name: "row", val: props.row },
          { name: "col", val: props.col }
        ])
      : props.row !== state.row
      ? state.buildDisableTable(state.table, props.row, state.col, [
          { name: "row", val: props.row }
        ])
      : props.col !== state.col
      ? state.buildDisableTable(state.table, state.row, props.col, [
          { name: "col", val: props.col }
        ])
      : props.table !== state.table
      ? state.buildDisableTable(props.table, state.row, state.col, [
          { name: "table", val: props.table }
        ])
      : null;
  }

  highlightActiveCell(cell) {
    document.getElementById(cell).style.backgroundColor = "red";
  }
  componentDidMount() {
    var modal = document.getElementById("myModal");
    var dialog = document.getElementById("theKeyPad");
    for (let i = 0; i < this.state.watchForClicks.length; i++) {
      document.getElementById(this.state.watchForClicks[i]).onclick = function(
        e
      ) {
        e.target.classList.add("SudokuOptionsHighlighted");
        modal.style.display = "block";
        const newLeft = e.pageX + 20 - Math.floor(window.innerWidth / 2.0); /// e.pageX - 254;
        const newTop =
          e.pageY - 450 + Math.floor((window.innerHeight - 40) / 2.0); //e.pageY - 110;
        dialog.style.left = "" + newLeft + "px";
        dialog.style.top = "" + newTop + "px";
        window.scrollTo(0, 0 + 65);
      };
    }
    window.onresize = function() {
      var elems = document.querySelectorAll(".SudokuOptionsHighlighted");
      [].forEach.call(elems, function(el) {
        el.classList.remove("SudokuOptionsHighlighted");
      });
      modal.style.display = "none";
    };
    window.onclick = function(event) {
      if (event.target == modal) {
        var elems = document.querySelectorAll(".SudokuOptionsHighlighted");
        [].forEach.call(elems, function(el) {
          el.classList.remove("SudokuOptionsHighlighted");
        });
        modal.style.display = "none";
      }
    };
  }
  resetHighlight() {
    var elems = document.querySelectorAll(".SudokuOptionsHighlighted");
    [].forEach.call(elems, function(el) {
      el.classList.remove("SudokuOptionsHighlighted");
    });
  }
  handleClick = numberClick => {
    this.resetHighlight();
    document.getElementById("myModal").style.display = "none";
    if (this.state.table[this.state.row][this.state.col] != numberClick) {
      this.state.setNumber(numberClick, this.state.row, this.state.col);
    }
  };
  render() {
    return (
      <>
        <div id="myModal" className="modal">
          <div className="keypad-content" id="theKeyPad">
            <table style={{ position: "relative", left: "-6px", top: "-5px" }}>
              <tr>
                <td>
                  <button
                    className="keyPadButton"
                    onClick={e => this.handleClick(1, e)}
                    disabled={this.state.disable1}
                  >
                    1
                  </button>
                </td>
                <td>
                  <button
                    className="keyPadButton"
                    onClick={e => this.handleClick(2, e)}
                    disabled={this.state.disable2}
                  >
                    2
                  </button>
                </td>
                <td>
                  <button
                    className="keyPadButton"
                    onClick={e => this.handleClick(3, e)}
                    disabled={this.state.disable3}
                  >
                    3
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    className="keyPadButton"
                    onClick={e => this.handleClick(4, e)}
                    disabled={this.state.disable4}
                  >
                    4
                  </button>
                </td>
                <td>
                  <button
                    className="keyPadButton"
                    onClick={e => this.handleClick(5, e)}
                    disabled={this.state.disable5}
                  >
                    5
                  </button>
                </td>
                <td>
                  <button
                    className="keyPadButton"
                    onClick={e => this.handleClick(6, e)}
                    disabled={this.state.disable6}
                  >
                    6
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    className="keyPadButton"
                    onClick={e => this.handleClick(7, e)}
                    disabled={this.state.disable7}
                  >
                    7
                  </button>
                </td>
                <td>
                  <button
                    className="keyPadButton"
                    onClick={e => this.handleClick(8, e)}
                    disabled={this.state.disable8}
                  >
                    8
                  </button>
                </td>
                <td>
                  <button
                    className="keyPadButton"
                    onClick={e => this.handleClick(9, e)}
                    disabled={this.state.disable9}
                  >
                    9
                  </button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button
                    className="keyPadButton"
                    onClick={e => this.handleClick(".", e)}
                  >
                    {" - "}
                  </button>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </>
    );
  }
}
SudokuKeyPad.propTypes = {
  setNumber: PropTypes.func.isRequired,
  watchForClicks: PropTypes.array.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  table: PropTypes.array.isRequired,
  possibleCandidates: PropTypes.func.isRequired,
  setDisable: PropTypes.func.isRequired,
  alphaCol: PropTypes.func.isRequired,
  currentActive: PropTypes.func.isRequired
};
export default SudokuKeyPad;
