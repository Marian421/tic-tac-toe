## tic-tac-toe

A browser-based implementation of the classic Tic-Tac-Toe game, built as part of The Odin Project curriculum. This project focuses on modular JavaScript, using factory functions, IIFE modules, and clean architecture to separate game logic, display handling, and state management.

## Table of contents

- [Demo](#demo)
- [Project Goals](#project-goals)
- [Features](#features)
- [Tech stack](#tech-stack)
- [How to run locally](#how-to-run-locally)
- [What I learned](#what-i-learned)


## Demo

[Try it live](https://marian421.github.io/tic-tac-toe/)

## Project Goals

 - Build the game using object-oriented JavaScript without relying on classes.
 - Avoid global variables by using IIFEs and closures.
 - Keep responsibilities clearly separated across:
    - Gameboard – stores and manages board state.
    - GameController – handles turn order, win/draw logic.
    - ScreenController – manages DOM updates and user interaction.

## Features

- Two player mode with X and O
- Turn-by-turn UI player display
- Win and draw detection
- Game reset functionality
- Code fully organized usind module pattern

## Tech stack

- HTML - basic structure
- CSS - basic styling
- Javascript (ES5) - game logic using:
    - Factory functions
    - Immediately Invoked Function Expressions (IIFEs)
    - Closures

## How to run locally

1. Clone this repository

```bash
git clone https://github.com/your-username/tic-tac-toe.git
```

2. Navigate into the project directory:

```bash
cd tic-tac-toe
```

3. Open index.html in your browser

## What I learned

- Structuring applications using the module pattern
- Using closures to encapsulate private data and behavior
- Decoupling display logic from game logic
- Handling user input and DOM manipulation cleanly






