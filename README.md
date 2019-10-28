# Sudoku
React Sudoku Puzzle (First draft)

Major positioning issue on SudokuKeyPad 

line 103 of SudokuKeyPad is setting scroll position.. this only works for large screens. 
window.scrollTo(0, 65);

NEEDS FIXED!!


Also, a Sudoku has only 1 valid solution. There is a bug in this sudoku game that every so often the algorith that produces the solution will create a puzzle with more than one solution making it not a valid sudoku puzzle. I have solved this in the API that is currently in development. What needs changed is another function similar to the 'solvePuzzle' inside of the 'SudokuPuzzle' component that tries to find a valid solution while eleminating the current solutions row column values as a candidates. If we find a second solution, we eleminate is as a valid sudoku puzzle and try again to create a puzzle. The function 'findAValidSudoku' is where to call your new validation function. 
