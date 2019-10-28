import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SudokuKeyPad from "./SudokuKeyPad";
//import SudokuCell from "./SudokuCell";
const Sudoku = ({ positions, table, possibleCandidates, cellChange, starts, alphaColumnConvert }) => {
  const [currentActiveRow, setCurrentActiveRow] = useState(0);
  const [currentActiveCol, setCurrentActiveCol] = useState(0);
  const [currentChild, setCurrentChild] = useState(1);
  const [alphaCol] = useState(alphaColumnConvert);
  const watchForClicks = () =>{
    const arrayOfClickElements = [];
    for(let i = 0; i < 9; i ++){
      for(let j = 0; j < 9; j++){
        if(table[i][j] == '.'){
          arrayOfClickElements.push(alphaColumnConvert(j) + (i + 1).toString());
        }
      }
    }
    return arrayOfClickElements;
  }
  useEffect(() => {
    if(starts != undefined){
      for(let i = 0; i < starts.length; i ++){
        document.getElementById(starts[i]).style.fontWeight = "bold";
      }
    }
  });
 
  const handleCellChange = (row, col) => {
    setCurrentActiveCol(col);
    setCurrentActiveRow(row);
    setCurrentChild(currentChild + 1);
  };
  return (
    <>
      <br />
      <SudokuKeyPad 
        possibleCandidates={possibleCandidates}
        row={currentActiveRow}
        col={currentActiveCol}
        table={table}
        setNumber={cellChange}
        watchForClicks={watchForClicks()}
        alphaCol={alphaCol} />
      
                      
      <div style={{ position: "relative", left: "30px" }}>
        <table>
          <tr>
            <td className="blockgroup">
              <table className="block blockright blockbottom">
                <tr>
                  <td className="cell">
                    <div className="square" id="A1" onClick={() => handleCellChange(0, 0)}>
                    {positions.a1}
                      {/* {positions.a1 == undefined || positions.a1.length == 0 ?
                       <SudokuCell /> : positions.a1} */}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="B1" onClick={() => handleCellChange(0, 1)}>
                    {positions.b1}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="C1" onClick={() => handleCellChange(0, 2)}>
                    {positions.c1}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="A2" onClick={() => handleCellChange(1, 0)}>
                    {positions.a2}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="B2" onClick={() => handleCellChange(1, 1)}>
                    {positions.b2}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="C2" onClick={() => handleCellChange(1, 2)}>
                    {positions.c2}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="A3" onClick={() => handleCellChange(2, 0)}>
                      {positions.a3}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="B3" onClick={() => handleCellChange(2, 1)}>
                      {positions.b3}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="C3" onClick={() => handleCellChange(2, 2)}>
                      {positions.c3}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
            <td className="blockgroup">
              <table className="block blockright blockbottom blockleft">
                <tr>
                  <td className="cell">
                    <div className="square" id="D1" onClick={() => handleCellChange(0, 3)}>
                      {positions.d1}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="E1" onClick={() => handleCellChange(0, 4)}>
                      {positions.e1}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="F1" onClick={() => handleCellChange(0, 5)}>
                      {positions.f1}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="D2" onClick={() => handleCellChange(1, 3)}>
                      {positions.d2}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="E2" onClick={() => handleCellChange(1, 4)}>
                      {positions.e2}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="F2" onClick={() => handleCellChange(1, 5)}>
                      {positions.f2}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="D3" onClick={() => handleCellChange(2, 3)}>
                      {positions.d3}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="E3" onClick={() => handleCellChange(2,4)}>
                      {positions.e3}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="F3" onClick={() => handleCellChange(2, 5)}>
                      {positions.f3}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
            <td className="blockgroup">
              <table className="block blockleft blockbottom">
                <tr>
                  <td className="cell">
                    <div className="square" id="G1" onClick={() => handleCellChange(0, 6)}>
                      {positions.g1}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="H1" onClick={() => handleCellChange(0, 7)}>
                      {positions.h1}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="I1" onClick={() => handleCellChange(0, 8)}>
                      {positions.i1}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="G2" onClick={() => handleCellChange(1, 6)}>
                      {positions.g2}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="H2" onClick={() => handleCellChange(1, 7)}>
                      {positions.h2}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="I2" onClick={() => handleCellChange(1, 8)}>
                      {positions.i2}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="G3" onClick={() => handleCellChange(2, 6)}>
                      {positions.g3}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="H3" onClick={() => handleCellChange(2, 7)}>
                      {positions.h3}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="I3" onClick={() => handleCellChange(2, 8)}>
                      {positions.i3}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td className="blockgroup">
              <table className="block blockright blocktop blockbottom">
                <tr>
                  <td className="cell">
                    <div className="square" id="A4" onClick={() => handleCellChange(3, 0)}>
                      {positions.a4}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="B4" onClick={() => handleCellChange(3, 1)}>
                      {positions.b4}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="C4" onClick={() => handleCellChange(3, 2)}>
                      {positions.c4}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="A5" onClick={() => handleCellChange(4, 0)}>
                      {positions.a5}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="B5" onClick={() => handleCellChange(4, 1)}>
                      {positions.b5}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="C5" onClick={() => handleCellChange(4, 2)}>
                      {positions.c5}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="A6" onClick={() => handleCellChange(5, 0)}>
                      {positions.a6}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="B6" onClick={() => handleCellChange(5, 1)}>
                      {positions.b6}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="C6" onClick={() => handleCellChange(5, 2)}>
                      {positions.c6}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
            <td className="blockgroup">
              <table className="block blocktop blockbottom blockright blockleft">
                <tr>
                  <td className="cell">
                    <div className="square" id="D4" onClick={() => handleCellChange(3, 3)}>
                      {positions.d4}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="E4" onClick={() => handleCellChange(3, 4)}>
                      {positions.e4}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="F4" onClick={() => handleCellChange(3, 5)}>
                      {positions.f4}
                     
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="D5" onClick={() => handleCellChange(4, 3)}>
                      {positions.d5}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="E5" onClick={() => handleCellChange(4, 4)}>
                      {positions.e5}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="F5" onClick={() => handleCellChange(4, 5)}>
                      {positions.f5}
                      
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="D6" onClick={() => handleCellChange(5, 3)}>
                      {positions.d6}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="E6" onClick={() => handleCellChange(5, 4)}>
                      {positions.e6}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="F6" onClick={() => handleCellChange(5, 5)}>
                      {positions.f6}
                      
                    </div>
                  </td>
                </tr>
              </table>
            </td>
            <td className="blockgroup">
              <table className="block blocktop blockbottom blockleft">
                <tr>
                  <td className="cell">
                    <div className="square" id="G4" onClick={() => handleCellChange(3, 6)}>
                      {positions.g4}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="H4" onClick={() => handleCellChange(3, 7)}>
                      {positions.h4}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="I4" onClick={() => handleCellChange(3, 8)}>
                      {positions.i4}
                      
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="G5" onClick={() => handleCellChange(4, 6)}>
                      {positions.g5}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="H5" onClick={() => handleCellChange(4,7)}>
                      {positions.h5}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="I5" onClick={() => handleCellChange(4, 8)}>
                      {positions.i5}
                      
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="G6" onClick={() => handleCellChange(5, 6)}>
                      {positions.g6}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="H6" onClick={() => handleCellChange(5, 7)}>
                      {positions.h6}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="I6" onClick={() => handleCellChange(5, 8)}>
                      {positions.i6}
                      
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td className="blockgroup">
              <table className="block blocktop blockright">
                <tr>
                  <td className="cell">
                    <div className="square" id="A7" onClick={() => handleCellChange(6, 0)}>
                      {positions.a7}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="B7" onClick={() => handleCellChange(6, 1)}>
                      {positions.b7}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="C7" onClick={() => handleCellChange(6, 2)}>
                      {positions.c7}
                      
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="A8" onClick={() => handleCellChange(7, 0)}>
                      {positions.a8}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="B8" onClick={() => handleCellChange(7,1)}>
                      {positions.b8}
                     
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="C8" onClick={() => handleCellChange(7, 2)}>
                      {positions.c8}
                      
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="A9" onClick={() => handleCellChange(8, 0)}>
                      {positions.a9}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="B9" onClick={() => handleCellChange(8,1)}>
                      {positions.b9}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="C9" onClick={() => handleCellChange(8, 2)}>
                      {positions.c9}
                      
                    </div>
                  </td>
                </tr>
              </table>
            </td>
            <td className="blockgroup">
              <table className="block blocktop blockleft blockright">
                <tr>
                  <td className="cell">
                    <div className="square" id="D7" onClick={() => handleCellChange(6, 3)}>
                      {positions.d7}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="E7" onClick={() => handleCellChange(6, 4)}>
                      {positions.e7}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="F7" onClick={() => handleCellChange(6, 5)}>
                      {positions.f7}
                      
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="D8" onClick={() => handleCellChange(7, 3)}>
                      {positions.d8}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="E8" onClick={() => handleCellChange(7, 4)}>
                      {positions.e8}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="F8" onClick={() => handleCellChange(7, 5)}>
                      {positions.f8}
                      
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="D9" onClick={() => handleCellChange(8, 3)}>
                      {positions.d9}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="E9" onClick={() => handleCellChange(8, 4)}>
                      {positions.e9}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="F9" onClick={() => handleCellChange(8,5)}>
                      {positions.f9}
                      
                    </div>
                  </td>
                </tr>
              </table>
            </td>
            <td className="blockgroup">
              <table className="block blockleft blocktop">
                <tr>
                  <td className="cell">
                    <div className="square" id="G7" onClick={() => handleCellChange(6, 6)}>
                      {positions.g7}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="H7" onClick={() => handleCellChange(6,7)}>
                      {positions.h7}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="I7" onClick={() => handleCellChange(6,8)}>
                      {positions.i7}
                      
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="G8" onClick={() => handleCellChange(7, 6)}>
                      {positions.g8}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="H8" onClick={() => handleCellChange(7, 7)}>
                      {positions.h8}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="I8" onClick={() => handleCellChange(7, 8)}>
                      {positions.i8}
                      
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="cell">
                    <div className="square" id="G9" onClick={() => handleCellChange(8, 6)}>
                      {positions.g9}
                      
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="H9" onClick={() => handleCellChange(8, 7)}>
                      {positions.h9}
                    </div>
                  </td>
                  <td className="cell">
                    <div className="square" id="I9" onClick={() => handleCellChange(8,8)}>
                      {positions.i9}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        {/* <br></br>
        {possibleCandidates(table, 0, 0).map(cand => cand)}
        <br></br>
        {possibleCandidates(table, 0, 1).map(cand => cand)}
        <br></br>
        {possibleCandidates(table, 0, 2).map(cand => cand)} */}
      </div>
    </>
  );
};
Sudoku.propTypes = {
  positions: PropTypes.array.isRequired,
  possibleCandidates: PropTypes.func.isRequired,
  table: PropTypes.array.isRequired,
  cellChange: PropTypes.func.isRequired,
  starts: PropTypes.array,
  alphaColumnConvert: PropTypes.func.isRequired
};
export default Sudoku;
