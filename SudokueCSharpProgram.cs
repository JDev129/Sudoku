class Program
    {
        static char[][] LoadTable()
        {

            char[][] table = new char[9][];

            Console.WriteLine("Enter Sudoku table:");

            for (int i = 0; i < 9; i++)
            {
                string line = Console.ReadLine();
                table[i] = line.PadRight(9).Substring(0, 9).ToCharArray();
                for (int j = 0; j < 9; j++)
                    if (table[i][j] < '0' || table[i][j] > '9')
                        table[i][j] = '.';
            }

            return table;

        }


        static void PrintFailure()
        {
            Console.WriteLine();
            Console.WriteLine("This table is not valid");
        }

        static void PrintTable(char[][] table, int stepsCount)
        {
            Console.WriteLine();
            Console.WriteLine("Solved table after {0} steps:", stepsCount);
            for (int i = 0; i < 9; i++)
                Console.WriteLine("{0}", new string(table[i]));
        }

        static void PrintSelfCreatedTable(char[][] solvedTable, char[][] start, int stepsCount)
        {
            Console.WriteLine();
            Console.WriteLine("Solved table after {0} steps:", stepsCount);
            Console.WriteLine();
            Console.WriteLine("Start");
            for (int i = 0; i < 9; i++)
                Console.WriteLine("{0}", new string(start[i]));
            Console.WriteLine();
            Console.WriteLine("Solution");
            for (int i = 0; i < 9; i++)
                Console.WriteLine("{0}", new string(solvedTable[i]));
        }

        static char[] GetSpecialCandidates(char[][] table, int row, int col, char val)
        {

            string s = "";

            for (char c = '1'; c <= '9'; c++)
            {

                bool collision = false;

                for (int i = 0; i < 9; i++)
                {
                    if (table[row][i] == c ||
                        table[i][col] == c ||
                        table[(row - row % 3) + i / 3][(col - col % 3) + i % 3] == c)
                    {
                        collision = true;
                        break;
                    }
                }

                if (!collision)
                    s += c;

            }

            return s.ToCharArray();

        }

        static char[] GetCandidates(char[][] table, int row, int col)
        {

            string s = "";

            for (char c = '1'; c <= '9'; c++)
            {

                bool collision = false;

                for (int i = 0; i < 9; i++)
                {
                    if (table[row][i] == c ||
                        table[i][col] == c ||
                        table[(row - row % 3) + i / 3][(col - col % 3) + i % 3] == c)
                    {
                        collision = true;
                        break;
                    }
                }

                if (!collision)
                    s += c;

            }

            return s.ToCharArray();

        }

        static bool SolveAnotherWay(char[][] table, ref int stepsCount, char[][] firstSolution)
        {
            bool solved = false;

            int row = -1;
            int col = -1;
            char[] candidates = null;

            for (int i = 0; i < 9; i++)
                for (int j = 0; j < 9; j++)
                    if (table[i][j] == '.')
                    {
                        char[] newCandidates = GetCandidates(table, i, j)
                            .Where(x => x != firstSolution[i][j]).ToArray();

                        if (row < 0 || newCandidates.Length < candidates.Length)
                        {
                            row = i;
                            col = j;
                            candidates = newCandidates;
                        }
                    }

            if (row < 0)
            {
                solved = true;
            }
            else
            {

                for (int i = 0; i < candidates.Length; i++)
                {
                    table[row][col] = candidates[i];
                    stepsCount++;
                    if (SolveAnotherWay(table, ref stepsCount, firstSolution))
                    {
                        solved = true;
                        break;
                    }
                    table[row][col] = '.';
                }
            }

            return solved;

        }

        static bool Solve(char[][] table, ref int stepsCount)
        {
            bool solved = false;

            int row = -1;
            int col = -1;
            char[] candidates = null;

            for (int i = 0; i < 9; i++)
                for (int j = 0; j < 9; j++)
                    if (table[i][j] == '.')
                    {
                        char[] newCandidates = GetCandidates(table, i, j);
                        if (row < 0 || newCandidates.Length < candidates.Length)
                        {
                            row = i;
                            col = j;
                            candidates = newCandidates;
                        }
                    }

            if (row < 0)
            {
                solved = true;
            }
            else
            {

                for (int i = 0; i < candidates.Length; i++)
                {
                    table[row][col] = candidates[i];

                    if (stepsCount >= 1000000)
                        return false;

                    stepsCount++;
                    if (Solve(table, ref stepsCount))
                    {
                        solved = true;
                        break;
                    }
                    table[row][col] = '.';
                }
            }

            return solved;

        }

        static char[][] TestSudoku()
        {
            return new char[9][]
            {
                new char[]{ '.','.','.','7','.','.','3','.','1' },
                new char[]{ '3','.','.','9','.','.','.','.','.' },
                new char[]{ '.','4','.','3','1','.','2','.','.' },
                new char[]{ '.','6','.','4','.','.','5','.','.' },
                new char[]{ '.','.','.','.','.','.','.','.','.' },
                new char[]{ '.','.','1','.','.','8','.','4','.' },
                new char[]{ '.','.','6','.','2','1','.','5','.' },
                new char[]{ '.','.','.','.','.','9','.','.','8' },
                new char[]{ '8','.','5','.','.','4','.','.','.' }
            };
        }

        static char[][] EmptyTable()
        {
            return new char[9][]
            {
                new char[]{ '.','.','.','.','.','.','.','.','.' },
                new char[]{ '.','.','.','.','.','.','.','.','.' },
                new char[]{ '.','.','.','.','.','.','.','.','.' },
                new char[]{ '.','.','.','.','.','.','.','.','.' },
                new char[]{ '.','.','.','.','.','.','.','.','.' },
                new char[]{ '.','.','.','.','.','.','.','.','.' },
                new char[]{ '.','.','.','.','.','.','.','.','.' },
                new char[]{ '.','.','.','.','.','.','.','.','.' },
                new char[]{ '.','.','.','.','.','.','.','.','.' }
            };
        }

        

        static char[][] GetRandomStart(char[][] completedTable, int numberOfStarts)
        {
            var randomObj = new Random();
            var clearedPosistions = new List<KeyValuePair<int, int>>();
            var emptyCells = 0;
            while (emptyCells < (81 - numberOfStarts))
            {
                var row = randomObj.Next(0, 9);
                var col = randomObj.Next(0, 9);

                if (clearedPosistions.Where(x => x.Key == row && x.Value == col).Count() > 0)
                    continue;

                completedTable[row][col] = '.';
                emptyCells++;
                clearedPosistions.Add(new KeyValuePair<int, int>(row, col));
            }
            return completedTable;
        }

        static char[][] RandomSudoku(char[][] theTable, int numberOfStarts = 18)
        {
            var randomObj = new Random();
            var setPosistions = new List<KeyValuePair<int, int>>();
            while (numberOfStarts > 0)
            {
                var row = randomObj.Next(0, 9);
                var col = randomObj.Next(0, 9);

                if (setPosistions.Where(x => x.Key == row && x.Value == col).Count() > 0)
                    continue;

                var possibleCandidates = GetCandidates(theTable, row, col);
                if (possibleCandidates.Length > 0)
                {
                    theTable[row][col] = possibleCandidates[randomObj.Next(0, possibleCandidates.Length)];
                    numberOfStarts--;
                    setPosistions.Add(new KeyValuePair<int, int>(row, col));
                }
            }
            return theTable;
        }

        static char[][] CloneCharArray(char[][] @this) => @this.ToList().ConvertAll(x => (char[])x.Clone()).ToArray();

        static string GetColPosition(int col)
        {
            switch (col)
            {
                case 0:
                    return "A";
                case 1:
                    return "B";
                case 2:
                    return "C";
                case 3:
                    return "D";
                case 4:
                    return "E";
                case 5:
                    return "F";
                case 6:
                    return "G";
                case 7:
                    return "H";
                case 8:
                    return "I";
                default:
                    return string.Empty;
            }
        }



        static void Main(string[] args)
        {
            var tries = 30;
            while (true)
            {

                char[][] table = RandomSudoku(EmptyTable()); //LoadTable();
                var doubleCheckTable = CloneCharArray(table);
                var secondSolutionTable = CloneCharArray(table);
                var original = CloneCharArray(table);

                int stepsCount = 0;
                int stepsCount2 = 0;
                if (Solve(table, ref stepsCount) && !SolveAnotherWay(doubleCheckTable, ref stepsCount2, table))
                {
                    var firstsSolution = CloneCharArray(table);
                    var theSolution = CloneCharArray(table);
                    //var thePos = GetPosistions(table).positions.OrderBy(x => x.Key).ToList();

                    PrintSelfCreatedTable(theSolution, original, stepsCount);

                    //GetRandomStart(firstsSolution, 40);
                    //PrintSelfCreatedTable(theSolution, firstsSolution, stepsCount);
                }
                else
                {
                    if (tries > 0)
                    {
                        tries--;
                        continue;
                    }
                    Console.WriteLine("Could not solve this Sudoku.  variations tried: " + stepsCount);
                }

                Console.WriteLine();
                Console.Write("More? (y/n) ");
                if (Console.ReadLine().ToLower() != "y")
                    break;
                else
                    tries = 30;

            }
        }
