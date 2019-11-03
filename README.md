# Sudoku

React Sudoku Puzzle Version 1.1

Added configuration settings. Now you can change how many cell values you start with for a specific difficulty. Can only set a value between 0 and 81. You will notice that as you can closer to 0 (somewhere around 20) it becomes impossible to find a valid solution. Still need to add a validation message if you try to imput invalid number (alpha character or number less than 0 or greater than 80).

Major positioning issue on SudokuKeyPad 

line 103 of SudokuKeyPad is setting scroll position.. this only works for large screens. 
window.scrollTo(0, 65);
NEEDS FIXED!!

Fixed bug in version 1.0 with multiple solution produced.


React Sudoku Puzzle Version 1.0

Also, a Sudoku has only 1 valid solution. There is a bug in this sudoku game that every so often the algorith that produces the solution will create a puzzle with more than one solution making it not a valid sudoku puzzle. I have solved this in the API that is currently in development. What needs changed is another function similar to the 'solvePuzzle' inside of the 'SudokuPuzzle' component that tries to find a valid solution while eleminating the current solutions row column values as a candidates. If we find a second solution, we eleminate it as a valid sudoku puzzle and try again to create a valid sudoku puzzle. The function 'findAValidSudoku' is where to call your new validation function. 
