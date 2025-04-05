const directions = ["N", "S", "E", "W", "NE", "NW", "SE", "SW"];

const directionVectors = {
  N: [-1, 0],
  S: [1, 0],
  E: [0, 1],
  W: [0, -1],
  NE: [-1, 1],
  NW: [-1, -1],
  SE: [1, 1],
  SW: [1, -1],
};

let gameStarted = false;
let difficulty = "hard";
let multiplayer = false;
let grid = Array.from({ length: 6 }, () => Array(6).fill(""));
let turn = "Flower";
let usedDirections = [];
let message = "";

const app = document.getElementById("app");

function render() {
  app.innerHTML = "";

  if (!gameStarted) {
    renderStartScreen();
    return;
  }

  const title = document.createElement("h1");
  title.textContent = "The Flower and The Wind";
  app.appendChild(title);

  const status = document.createElement("p");
  status.textContent = `Current turn: ${turn}`;
  app.appendChild(status);

  const gridContainer = document.createElement("div");
  gridContainer.className = "grid";
  grid.forEach((row, rIdx) =>
    row.forEach((cell, cIdx) => {
      const div = document.createElement("div");
      div.className = `cell ${cell === "🌸" ? "flower" : cell === "🌱" ? "wind" : ""}`;
      div.textContent = cell;
      div.onclick = () => handleCellClick(rIdx, cIdx);
      gridContainer.appendChild(div);
    })
  );
  app.appendChild(gridContainer);

  if (message) {
    const msg = document.createElement("div");
    msg.textContent = message;
    msg.style.fontWeight = "bold";
    app.appendChild(msg);
  }

  const replayBtn = document.createElement("button");
  replayBtn.textContent = "Replay";
  replayBtn.onclick = resetGame;
  app.appendChild(replayBtn);
}

function renderStartScreen() {
  const container = document.createElement("div");
  container.className = "start-screen";

  const title = document.createElement("h1");
  title.textContent = "Welcome to The Flower and The Wind";
  title.className = "title";
  container.appendChild(title);

  const difficultySection = document.createElement("div");
  difficultySection.className = "section";
  const diffLabel = document.createElement("p");
  diffLabel.textContent = "Choose Difficulty:";
  diffLabel.className = "label";
  difficultySection.appendChild(diffLabel);

  ["easy", "medium", "hard"].forEach(level => {
    const btn = document.createElement("button");
    btn.textContent = level.charAt(0).toUpperCase() + level.slice(1);
    btn.className = "menu-button";
    if (difficulty === level) btn.classList.add("selected");
    btn.onclick = () => {
      difficulty = level;
      render();
    };
    difficultySection.appendChild(btn);
  });
  container.appendChild(difficultySection);

  const mpSection = document.createElement("div");
  mpSection.className = "section";
  const mpLabel = document.createElement("p");
  mpLabel.textContent = "Multiplayer Mode:";
  mpLabel.className = "label";
  mpSection.appendChild(mpLabel);

  const mpBtn = document.createElement("label");
  mpBtn.className = "switch";  // Apply the class for styling the toggle button
  
  // Create the checkbox input for the toggle button
  const toggleInput = document.createElement("input");
  toggleInput.type = "checkbox";
  toggleInput.id = "multiplayerToggle";
  toggleInput.checked = multiplayer;  // Set the toggle based on the current multiplayer state
  
  // Create the span that acts as the slider (for styling the toggle switch)
  const slider = document.createElement("span");
  slider.className = "slider";
  
  // Append input and span to the label
  mpBtn.appendChild(toggleInput);
  mpBtn.appendChild(slider);
  
  // Add the toggle button to the desired location (for example, to the body or a container)
  document.body.appendChild(mpBtn);
  
  // Listen for the change event on the toggle
  toggleInput.addEventListener('change', () => {
    multiplayer = toggleInput.checked; // Set multiplayer based on the toggle state
    render(); // Call the render function to update the game state
  });
  
  mpSection.appendChild(mpBtn);
  container.appendChild(mpSection);

  const startBtn = document.createElement("button");
  startBtn.textContent = "Start Game";
  startBtn.className = "start-btn";
  startBtn.onclick = () => {
    gameStarted = true;
    render();
  };
  container.appendChild(startBtn);

  app.appendChild(container);
}

function handleCellClick(row, col) {
  if (message || grid[row][col] !== "") return;

  if (turn === "Flower") {
    grid[row][col] = "🌸";
    turn = "Wind";
    render();
    if (!multiplayer) setTimeout(aiMove, 1000);
  } else if (multiplayer) {
    grid[row][col] = "🌱";
    turn = "Flower";
  }

  checkWin();
  render();
}

function simulateWindMove(direction) {
  const vector = directionVectors[direction];
  const newGrid = grid.map(row => [...row]);

  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      if (grid[r][c] === "🌸") {
        let nr = r + vector[0];
        let nc = c + vector[1];
        while (nr >= 0 && nr < 6 && nc >= 0 && nc < 6) {
          if (newGrid[nr][nc] === "") newGrid[nr][nc] = "🌱";
          nr += vector[0];
          nc += vector[1];
        }
      }
    }
  }

  return newGrid;
}

function evaluateGrid(grid) {
  let windCount = 0;
  let flowerCount = 0;
  grid.flat().forEach(cell => {
    if (cell === "🌱") windCount++;
    if (cell === "🌸") flowerCount++;
  });
  return windCount - flowerCount;
}

function getAIMove() {
  let bestScore = -Infinity;
  let bestDir = null;

  directions.forEach(dir => {
    if (usedDirections.includes(dir)) return;
    const simulated = simulateWindMove(dir);
    const score = evaluateGrid(simulated);
    if (score > bestScore) {
      bestScore = score;
      bestDir = dir;
    }
  });

  return bestDir;
}

function aiMove() {
  if (turn !== "Wind" || multiplayer) return;
  const dir = getAIMove();
  if (!dir) return;

  grid = simulateWindMove(dir);
  usedDirections.push(dir);
  turn = "Flower";
  checkWin();
  render();
}

function checkWin() {
  const allFilled = grid.flat().every(cell => cell !== "");
  if (allFilled && usedDirections.length >= 7) {
    message = "It's a draw!";
  } else if (allFilled) {
    message = "🌼 Flower wins! 🌼";
  } else if (usedDirections.length >= 7) {
    message = "💨 Wind wins! 💨";
  }
}

function resetGame() {
  grid = Array.from({ length: 6 }, () => Array(6).fill(""));
  turn = "Flower";
  usedDirections = [];
  message = "";
  render();
}

render();
