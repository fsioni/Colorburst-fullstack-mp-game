<p align="center">
  <a href="" rel="noopener">
 <img height=125 src="logo.png" alt="ColorBurst Logo"></a>
</p>

[![wakatime](https://wakatime.com/badge/user/c9567959-4d57-48ac-9582-6f61d5363942/project/7357f254-b2d4-449b-8e93-7bfca3198fda.svg)](https://wakatime.com/badge/user/c9567959-4d57-48ac-9582-6f61d5363942/project/7357f254-b2d4-449b-8e93-7bfca3198fda)

<h2 align="center">ColorBurst</h2>

<p align="center"> Multiplayer game, made with Web technologies. (React, Phaser, Typescript, Express, Socket.io, Firebase)
    <br>
</p>

## 🧐 About

In this io game, the world is your canvas. Explore the 2D environment and cover it with your color to expand your territory. Be on the lookout for opponents trying to do the same! Eliminate your enemies and become the ultimate paint champion in this fast-paced game.

## 🏁 Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

What things you need to install the game and how to install them.

- For any platform : `npm`or any js package manager

### Folder structure

<details>
<summary>Folders tree</summary>

```
├── client
│   ├── ress/
│   │
│   └── src
│        ├── assets/
│        ├── components/
│        ├── data/
│        └── phaser
│                ├── gameObjects/
│                └── scenes/
│
└── server
     ├── src
     │   ├── database/
     │   ├── enums/
     │   └── game/
     │
     └── tests/
```

</details>

### Installing

- Open a terminal to the project root directory.

- Install the dependencies

```shell
cd server && npm install && cd ../client && npm install
```

## 🎈 Usage

After installing the dependencies :

- Launch the server (backend & frontend)

```shell
cd server && npm start
```

- Visit the link that is displayed in the console (localhost:xxxx)
- PLAY & have FUN

## 📏 Rules

- Objective: The objective of the game is to paint as much of the map as possible with your color while avoiding other players.

- Controls: Use the arrow keys to move in the desired direction.

- Starting the game: At the beginning of the game, you will be placed on a blank map. Choose a skin and start painting the map.

- Avoid other players: Avoid other players who try to block or eliminate you. If you another player (or yourself) collide with your trail, you lose and must start over.

- Gain points: You gain points by painting the map. You can also steal other players' points when you eliminate them!

## ⛏️ Built Using

- [Typescript](https://www.typescriptlang.org/) : statically typed superset of JavaScript used to write both the client and server-side code
- [Vite](https://vitejs.dev/) : frontend server
- [React](https://reactjs.org/) : frontend library
- [Phaser](https://phaser.io/) : game engine
- [Firebase](https://firebase.google.com/) : authentication and data persistence
- [Socket.io](https://socket.io/) : game communications
- [ExpressJS](https://expressjs.com/fr/) : backend server
- [Jest](https://jestjs.io/fr/) : testing
- [ESLint](https://eslint.org/) : javaScript linter 
- [Prettier](https://prettier.io/) : code formatter
- [Husky](https://typicode.github.io/husky/#/) : run scripts at commit (lint and format)

## 📌 Trello Board

You can find our [Trello Board](https://trello.com/b/XCikFmZT/elcrawlavers).

## ✍️ Authors

- [Julien Ballouard](https://forge.univ-lyon1.fr/p2006861) : p2006861
- [Farès SIONI](https://forge.univ-lyon1.fr/p1907037) : p1907037
- [Edouard THINOT](https://forge.univ-lyon1.fr/p1909945) : p1909945
