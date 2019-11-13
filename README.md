# Sudoku
React Sudoku Puzzle V1.3

Welcome, to my sudoku puzzle. 

The following project was inspired from an excersize created by the great coder name Zoran Horvat. 
(found here)
http://codinghelmet.com/exercises/sudoku-solver

After completing the follow up exercises, found in the C# file SudokuCSharpProgram.cs, I moved the heart of the logic to javascript and created a react user interface. Everything begins at the react component 'SudokuStart' in SudokuStart.js. This component handles the configuration and difficulty selection. From there it runs the SudokuPuzzle component which handles creating the solution and the starting puzzle. It also manages the progress of the puzzle and anding new attempted values and then the puzzle is displayed in the Sudoku component.
The last 2 components, SudokuConfiguration and SudokuKeyPad, are subcontracting out the tasks associated with their name. Please take a look and let me know if you have any questions suggestions or input.

Thanks,
Jeremy Christman
JChristman129@gmail.com






Release Notes:
V1.3

Cleaned up solution function inside Sudoku component. Fixed a found bug. It would allow you to continue playing even after all the cells were entered (regardless if it was a valid solution or not.) You will notice when you complete a puzzle that you cannot clear or change any of the values with the SudokuKeyPad without first moving back to a previous move at the bottom.



V 1.2

Made positioning updates to SudokuKeyPad. Needs further testing.


V 1.1
Added configuration settings. Now you can change how many cell values you start with for a specific difficulty. Can only set a value between 0 and 81. You will notice that as you can closer to 0 (somewhere around 20) it becomes impossible to find a valid solution. Still need to add a validation message if you try to input an invalid number (alpha character or number less than 0 or greater than 80).

Fixed bug in version 1.0 with multiple solution produced. See the addition to the solvePuzzle function. If the third parameter, 'solutionToCheckCantBeSolvedTwoWays', is provided it eliminates its values from being possible candidates for the first paramenters 'attemptedSudokuPuzzle' puzzle. This allows you to attempt to find a second solution of a puzzle which is different from the first solution.



V 1.0

Positioning issue on SudokuKeyPad 

line 103 of SudokuKeyPad is setting scroll position.. this only works for large screens. 
window.scrollTo(0, 65);

Also, a Sudoku has only 1 valid solution. There is a bug in this sudoku game that every so often the algorith that produces the solution will create a puzzle with more than one solution making it not a valid sudoku puzzle. I have solved this in the API that is currently in development. What needs changed is another function similar to the 'solvePuzzle' inside of the 'SudokuPuzzle' component that tries to find a valid solution while eleminating the current solutions row column values as a candidates. If we find a second solution, we eleminate it as a valid sudoku puzzle and try again to create a valid sudoku puzzle. The function 'findAValidSudoku' is where to call your new validation function. 
