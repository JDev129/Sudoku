import React, { useState } from "react";
//import PropTypes from "prop-types";
const SudokuCell = () => {
  return (
    <div className="SudokuOptions">
      <table>
        <tr style={{ position: "relative", top: "8px" }}>
          <td>1</td>
          <td></td>
          <td>&nbsp;</td>
          <td></td>
          <td>2</td>
          <td></td>
          <td>&nbsp;</td>
          <td></td>
          <td>3</td>
        </tr>
        <tr style={{ position: "relative", top: "3px" }}>
          <td>4</td>
          <td></td>
          <td></td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td></td>
          <td></td>
          <td></td>
          <td>7</td>
        </tr>
        <tr style={{ position: "relative", bottom: "3px" }}>
          <td>5</td>
          <td></td>
          <td></td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td></td>
          <td></td>
          <td></td>
          <td>8</td>
        </tr>
        <tr style={{ position: "relative", bottom: "8px" }}>
          <td>6</td>
          <td></td>
          <td></td>
          <td></td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td></td>
          <td></td>
          <td>9</td>
        </tr>
      </table>
      {/* <div className="row">
        <div className="col-xs-4">1</div>
        <div className="col-xs-4">2</div>
        <div className="col-xs-4">3</div>
      </div>
      <div className="row">
        <div className="col-xs-4">4</div>
        <div className="col-xs-4"></div>
        <div className="col-xs-4">5</div>
      </div>
      <div className="row">
        <div className="col-xs-4">6</div>
        <div className="col-xs-4"></div>
        <div className="col-xs-4">7</div>
      </div>
      <div className="row">
        <div className="col-xs-4">8</div>
        <div className="col-xs-4"></div>
        <div className="col-xs-4">9</div>
      </div>*/}
    </div>
  );
};
SudokuCell.propTypes = {};
export default SudokuCell;
