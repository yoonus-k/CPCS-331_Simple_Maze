/*
@Author: yoonus.dev - github.com/yoonus-k, 24dfed#54562
*/

// step 1: convert the maze to a 2d array
// step 2: find the path in the maze
// step 3: if there is a path convert it to agent dynamic moves (from agent prespective)
// step 4: print the moves

// inputs: maze (2d array) and start and end cells
// outputs: path (array of moves from maze's respective) ,
// agent_Moves (array of moves from agent's respective),
//mazePath (2d array of the maze path)
// or "No Path Found" if there is no path

// first: convert the maze to a 2d array
const maze = [
  // 0 represent empty cell, 1 represent wall, 2 represent start, 3 represent end
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
];

// create a second 2d array to store the maze path

// fill it all with zeros
const mazePath = Array(maze.length)
  .fill()
  .map(() => Array(maze[0].length).fill(0));

// set start cell to bottom left cell
const start = [[maze.length - 1], [0]];
// second: find the path in the maze by passing the maze 2d array and the start cell which is the bottom left cell
const path = findPath(maze, start); // this function will return the moves based on the maze's respective

// if there is a path convert it to agent dynamic moves (from agent prespective)
const agent_Moves =
  path !== "No Path Found" ? convertPathToDynamicMoves(path, "north") : [];
// print the moves

if (agent_Moves.length > 0) {
  console.log("Path found!");
  console.log("====================================");
  console.log("Moves from maze's respective: ");
  console.log(path);
  console.log("====================================");
  console.log("Moves from agent's respective: ");
  console.log(agent_Moves);
  console.log("====================================");
  console.log("Maze path: ");
  print2DArray(mazePath);
} else {
  console.log(path);
}

//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
// this function used to find the path in the maze
// this function will return the moves based on the maze's respective
function findPath(maze, start, end) {
  //third: define these variables to store the visited cells and the path :

  // variables to store if the there is a path or not
  let thereIsPath = false;

  // we need to create a visited array to keep track of visited cells based on the maze length and initialize it to false
  const visited = Array(maze.length)
    .fill()
    .map(() => Array(maze[0].length).fill(false));

  // we need to create a path array to keep track of paths
  const path = [];

  // we need to create a stack to keep track of cells
  const stack = [];

  // create an array to store the moves available to moves around the 2d world
  const moves = [
    [0, 1, "right"], // right
    [-1, 0, "up"], // up
    [1, 0, "down"], // down
    [0, -1, "left"], // left
  ];

  stack.push(start); // push the start cell to the stack
  // repeat untill stack is empty or reached end
  current = stack[0]; // we need to create a current cell to travers the maze, which will be the top cell in the stack

  stack_level_loop: while (stack.length > 0) {
    // mark the current cell as visited
    visited[current[0]][current[1]] = true;

    // loop over the moves array which is left, down, right, up
    for (let i = 0; i < moves.length; i++) {
      // get the next cell
      const next = [
        parseInt(current[0]) + parseInt(moves[i][0]),
        parseInt(current[1]) + parseInt(moves[i][1]),
      ];

      // check if the next cell is valid and not visited
      if (isValid_And_NotVisited(next[0], next[1], visited)) {
        // if the next cell is end break and exit
        if (isGoal(next[0], next[1])) {
          path.push(moves[i][2]);
          thereIsPath = true;
          break stack_level_loop;
        }

        // push the current move to the path
        path.push(moves[i][2]);
        mazePath[next[0]][next[1]] = 1;

        // push the next cell to the stack
        stack.push(next);

        // set the current next cell as the current cell
        current = stack[stack.length - 1];

        // mark the next cell as visited
        visited[next[0]][next[1]] = true;
        continue stack_level_loop;
      }
    }
    // if there is no valid move pop the stack and remove the last move from stack
    stack.pop();
    path.pop();

    mazePath[current[0]][current[1]] = 0;
    current = stack[stack.length - 1];
  }
  // return the path if there is a path, otherwise return no path found
  return thereIsPath ? path : "No Path Found";
}

//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
// this function used to check if the cell is valid and not visited
function isValid_And_NotVisited(x, y, visited) {
  // if the cell is out of bounds return false
  if (x < 0 || y < 0 || x >= maze.length || y >= maze[0].length) return false;
  // if the cell is a wall return false
  if (maze[x][y] === 1) return false; // wall mean 1
  // if the cell is visited return false
  if (visited[x][y]) return false;
  // otherwise return true
  return true;
}

//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
// this function used to check if the cell is end
function isGoal(x, y) {
  // if the cell is end return true
  if (maze[x][y] === 3) return true;
  // otherwise return false
  return false;
}

//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
// this function used to convert the path to agent dynamic moves using state based approach
function convertPathToDynamicMoves(path, initialDirection) {
  const moves = []; // initialize the moves array (the agent dynamic moves)
  let direction = initialDirection; // initialize the direction to north (you can choose any inicial direction)

  // loop over the path array
  for (let i = 0; i < path.length; i++) {
    const move = path[i]; // get the current move

    if (move === "left") {
      if (direction === "north") {
        moves.push("left");
        direction = "west";
      } else if (direction === "south") {
        moves.push("right");
        direction = "west";
      } else if (direction === "east") {
        moves.push("backward"); // usually not needed
        direction = "west";
      } else if (direction === "west") {
        moves.push("forward");
      }
    } else if (move === "right") {
      if (direction === "north") {
        moves.push("right");
        direction = "east";
      } else if (direction === "south") {
        moves.push("left");
        direction = "east";
      } else if (direction === "east") {
        moves.push("forward");
        direction = "east";
      } else if (direction === "west") {
        moves.push("backward"); // usually not needed
        direction = "east";
      }
    } else if (move === "up") {
      if (direction === "north") {
        moves.push("forward");
      } else if (direction === "south") {
        moves.push("backward"); // usually not needed
        direction = "north";
      } else if (direction === "east") {
        moves.push("left");
        direction = "north";
      } else if (direction === "west") {
        moves.push("right");
        direction = "north";
      }
    } else if (move === "down") {
      if (direction === "north") {
        moves.push("backward"); // usually not needed
        direction = "south";
      } else if (direction === "south") {
        moves.push("forward");
        direction = "south";
      } else if (direction === "east") {
        moves.push("right");
        direction = "south";
      } else if (direction === "west") {
        moves.push("left");
        direction = "south";
      }
    }
  }

  return moves;
}

//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
// this function used to print the 2d array in formated way
function print2DArray(array) {
  for (let i = 0; i < array.length; i++) {
    let row = "";

    for (let j = 0; j < array[i].length; j++) {
      row += array[i][j] + "\t";
    }

    console.log(row);
  }
}
