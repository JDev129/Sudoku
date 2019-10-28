# Sudoku
First draft

Major positioning issue on SudokuKeyPad 

line 103 of SudokuKeyPad is setting scroll position.. this only works for large screens. 
window.scrollTo(0, 65);

NEEDS FIXED!!


A Sudoku has only 1 valid solution. There is a bug in this sudoku game that every so often this algorith will produce a puzzle with more than one solution making it not a valid sudoku puzzle. I have solved this in the API that is currently in production. What needs changed is another function similar to the 'solvePuzzle' inside of the 'SudokuPuzzle' component that tries to find a valid solution, and eliminats the current solutions col and row value as a candidate.
