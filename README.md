# Sudoku
React Sudoku Puzzle

Welcome, to my sudoku puzzle. 

The following project was inspired from an excersize created by the great coder name Zoran Horvat. 
(found here)
http://codinghelmet.com/exercises/sudoku-solver

Although this code is C#, it was relativaley 

Most recent version V1.3

Release Notes:
React Sudoku Puzzle V1.3



React Sudoku Puzzle V 1.2

Made positioning updates to SudokuKeyPad. Needs further testing.


:::: React Sudoku Puzzle Version 1.1
Added configuration settings. Now you can change how many cell values you start with for a specific difficulty. Can only set a value between 0 and 81. You will notice that as you can closer to 0 (somewhere around 20) it becomes impossible to find a valid solution. Still need to add a validation message if you try to input an invalid number (alpha character or number less than 0 or greater than 80).

Fixed bug in version 1.0 with multiple solution produced.



:::: React Sudoku Puzzle Version 1.0
Major positioning issue on SudokuKeyPad 

line 103 of SudokuKeyPad is setting scroll position.. this only works for large screens. 
window.scrollTo(0, 65);
NEEDS FIXED!!

Also, a Sudoku has only 1 valid solution. There is a bug in this sudoku game that every so often the algorith that produces the solution will create a puzzle with more than one solution making it not a valid sudoku puzzle. I have solved this in the API that is currently in development. What needs changed is another function similar to the 'solvePuzzle' inside of the 'SudokuPuzzle' component that tries to find a valid solution while eleminating the current solutions row column values as a candidates. If we find a second solution, we eleminate it as a valid sudoku puzzle and try again to create a valid sudoku puzzle. The function 'findAValidSudoku' is where to call your new validation function. 
