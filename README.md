# 🌸 The Flower and The Wind 🌬️

**A strategic and visually charming two-player or AI game built with HTML, CSS, and JavaScript.**

## 🎮 Game Overview

*The Flower and The Wind* is a 6x6 grid-based abstract game where one player places **flowers (🌸)** while the other spreads **wind (🌱)** in strategic directions. The goal is to dominate the board by either filling it or exhausting wind’s available directions.

- **Player 1 (Flower)**: Clicks to plant flowers anywhere on the board.
- **Player 2 (Wind)**: Spreads wind from flower locations in a chosen direction (AI or multiplayer mode).

## 🧠 Features

- 🎯 3 Difficulty levels for AI (Easy, Medium, Hard)
- 👥 Singleplayer (vs AI) and Multiplayer modes
- 🌈 Stylized start screen with modern UI/UX
- 📱 Responsive layout for mobile and desktop
- ♻️ Replay functionality

## 🚀 How to Play

1. Choose difficulty and mode on the start screen.
2. Click "Start Game".
3. **Flower** goes first, placing 🌸 on any empty cell.
4. **Wind** (🌱) spreads in one of 8 directions from existing 🌸.
5. Players alternate turns.
6. The game ends when:
   - All 8 directions are used by Wind: **Wind wins**.
   - The board is full: **Flower wins**.
   - Both: **Draw**.

## 🔧 Tech Stack

- HTML5
- CSS3 (Responsive Design, Gradient UI, Toggle Switch)
- Vanilla JavaScript (DOM manipulation, AI logic)

## 📂 Project Structure
flower-wind-game/
├── index.html        # Entry point – contains HTML layout and root elements
├── style.css         # All styling for layout, grid, buttons, animations, and responsiveness
├── script.js         # Core JavaScript logic: gameplay, AI, turn handling, win conditions
├── README.md         # Game documentation, instructions, and setup
└── PROMPT.md         # Original design prompt or spec reference

