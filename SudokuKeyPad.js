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
      disableclear: true,
      setNumber: props.setNumber,
      watchForClicks: props.watchForClicks,
      row: props.row,
      col: props.col,
      table: props.table,
      //disableAll: props.disableAll,
      currentActiveMoveName: props.currentActiveMoveName,
      possibleCandidates: props.possibleCandidates,
      setDisable: this.setDisable,
      buildDisableTable: this.buildDisableTable,
      alphaCol: props.alphaCol,
      currentActive: this.currentActive,
      resetHighlight: this.resetHighlight,
      addTheseRows: this.addTheseRows,
      allowAnyEntry: this.allowAnyEntry,
      sudokuTableName: props.sudokuTableName,
      transparent: false
    };
  }
  findClickPosition(e) {
    var posx = 0;
    var posy = 0;

    if (e.pageX || e.pageY) {
      var windowWidth = window.innerWidth;
      //var windowHeight = window.innerHeight;

      if (windowWidth > 991) {
        //had to customize the result with a polynomial equation to account for screen resizing
        posx =
          e.pageX -
          (-0.0000037 * windowWidth * windowWidth +
            0.5093155 * windowWidth -
            465.4196263);
      } else if (windowWidth < 992 && windowWidth > 767) {
        posx =
          e.pageX -
          (0.0004 * windowWidth * windowWidth - 0.2205 * windowWidth - 28);
      } else if (windowWidth < 768) {
        posx = e.pageX - 23;
      }
      posy = e.pageY - 79;
    } else if (e.clientX && e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
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
  buildDisableTable(
    table,
    row,
    col,
    writeIn,
    allowAnyEntry,
    theCurrentActiveMoveName
  ) {
    let theResult = {};
    if (theCurrentActiveMoveName === "complete") {
      theResult["disableclear"] = true;
      for (let j = 1; j < 10; j++) {
        theResult["disable" + j.toString()] = true;
      }
    } else if (allowAnyEntry) {
      theResult["disableclear"] = false;
      for (let j = 1; j < 10; j++) {
        theResult["disable" + j.toString()] = false;
      }
    } else {
      theResult["disableclear"] = false;
      let currentAvNumber = this.possibleCandidates(table, row, col)
        .numberArray;
      for (let j = 1; j < 10; j++) {
        let disableMe = true;
        for (let i = 0; i < currentAvNumber.length; i++) {
          if (j == currentAvNumber[i]) {
            disableMe = false;
          }
        }
        theResult["disable" + j.toString()] = disableMe;
      }
    }
    if (writeIn.length) {
      return this.addTheseRows(theResult, writeIn);
    }
    return theResult;
  }

  static getDerivedStateFromProps(props, state) {
    return props.row !== state.row &&
      props.col !== state.col &&
      props.table !== state.table &&
      props.currentActiveMoveName !== state.currentActiveMoveName
      ? state.buildDisableTable(
          props.table,
          props.row,
          props.col,
          [
            { name: "row", val: props.row },
            { name: "col", val: props.col },
            { name: "table", val: props.table }
          ],
          props.allowAnyEntry,
          props.currentActiveMoveName
        )
      : props.row !== state.row &&
        props.col !== state.col &&
        props.currentActiveMoveName !== state.currentActiveMoveName
      ? state.buildDisableTable(
          state.table,
          props.row,
          props.col,
          [{ name: "row", val: props.row }, { name: "col", val: props.col }],
          props.allowAnyEntry,
          props.currentActiveMoveName
        )
      : props.row !== state.row &&
        props.currentActiveMoveName !== state.currentActiveMoveName
      ? state.buildDisableTable(
          state.table,
          props.row,
          state.col,
          [{ name: "row", val: props.row }],
          props.allowAnyEntry,
          props.currentActiveMoveName
        )
      : props.col !== state.col &&
        props.currentActiveMoveName !== state.currentActiveMoveName
      ? state.buildDisableTable(
          state.table,
          state.row,
          props.col,
          [{ name: "col", val: props.col }],
          props.allowAnyEntry,
          props.currentActiveMoveName
        )
      : props.table !== state.table &&
        props.currentActiveMoveName !== state.currentActiveMoveName
      ? state.buildDisableTable(
          props.table,
          state.row,
          state.col,
          [{ name: "table", val: props.table }],
          props.allowAnyEntry,
          props.currentActiveMoveName
        )
      : props.row !== state.row &&
        props.col !== state.col &&
        props.table !== state.table
      ? state.buildDisableTable(
          props.table,
          props.row,
          props.col,
          [
            { name: "row", val: props.row },
            { name: "col", val: props.col },
            { name: "table", val: props.table }
          ],
          props.allowAnyEntry,
          state.currentActiveMoveName
        )
      : props.row !== state.row && props.col !== state.col
      ? state.buildDisableTable(
          state.table,
          props.row,
          props.col,
          [{ name: "row", val: props.row }, { name: "col", val: props.col }],
          props.allowAnyEntry,
          state.currentActiveMoveName
        )
      : props.row !== state.row
      ? state.buildDisableTable(
          state.table,
          props.row,
          state.col,
          [{ name: "row", val: props.row }],
          props.allowAnyEntry,
          state.currentActiveMoveName
        )
      : props.col !== state.col
      ? state.buildDisableTable(
          state.table,
          state.row,
          props.col,
          [{ name: "col", val: props.col }],
          props.allowAnyEntry,
          state.currentActiveMoveName
        )
      : props.table !== state.table
      ? state.buildDisableTable(
          props.table,
          state.row,
          state.col,
          [{ name: "table", val: props.table }],
          props.allowAnyEntry,
          state.currentActiveMoveName
        )
      : null;
  }

  highlightActiveCell(cell) {
    document.getElementById(cell).style.backgroundColor = "red";
  }
  componentDidMount() {
    var modal = document.getElementById("myModal");
    var dialog = document.getElementById("theKeyPad");
    for (let i = 0; i < this.state.watchForClicks.length; i++) {
      document.getElementById(this.state.watchForClicks[i]).onclick = (function(
        ctx
      ) {
        return function(e) {
          const pos = ctx.findClickPosition(e);
          e.target.classList.add("SudokuOptionsHighlighted");
          modal.style.display = "block";
          dialog.style.display = "block";
          dialog.style.left = "" + pos.x - 400 + "px"; //e.clientX - 750
          dialog.style.top = "" + pos.y - 575 + "px"; //pos.y - 650   //e.clientY - 650
        };
      })(this);
    }
    window.onresize = function() {
      modal.style.display = "none";
      dialog.style.display = "none";
      var elems = document.querySelectorAll(".SudokuOptionsHighlighted");
      [].forEach.call(elems, function(el) {
        el.classList.remove("SudokuOptionsHighlighted");
      });
    };
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        dialog.style.display = "none";
        var elems = document.querySelectorAll(".SudokuOptionsHighlighted");
        [].forEach.call(elems, function(el) {
          el.classList.remove("SudokuOptionsHighlighted");
        });
        return true;
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
    document.getElementById("theKeyPad").style.display = "none";
    if (this.state.table[this.state.row][this.state.col] != numberClick) {
      this.state.setNumber(numberClick, this.state.row, this.state.col);
    }
  };
  render() {
    return (
      <>
        <div id="myModal" className="modal"></div>
        <div className="keypad-content" id="theKeyPad">
          <table>
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
              <td colSpan="3">
                <button
                  className="keyPadButton"
                  onClick={e => this.handleClick(".", e)}
                  style={{ width: "90px", height: "30px" }}
                  disabled={this.state.disableclear}
                >
                  {" -clear- "}
                </button>
              </td>
            </tr>
          </table>
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
  currentActive: PropTypes.func.isRequired,
  allowAnyEntry: PropTypes.bool.isRequired,
  sudokuTableName: PropTypes.string.isRequired,
  //disableAll: PropTypes.func.isRequired
  currentActiveMoveName: PropTypes.string.isRequired
};
export default SudokuKeyPad;
