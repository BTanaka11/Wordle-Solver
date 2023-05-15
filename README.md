# Worlde Solver

### Description ###
- This is a combination of a standalone Worlde game and a Worlde solver, both following the same rules and word list as the **[official Worlde game](https://www.nytimes.com/games/wordle/index.html)**. The mathematics of the solver is based on ideas from the YouTube video **[Solving Wordle using information theory](https://www.youtube.com/watch?v=v68zYyaEmEA&t=1110s)**.

### Deployment ###
- **https://main.dvz9btid48wk.amplifyapp.com/**

### Tech Stack ###

- <p align="left"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a><a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a><a href="https://aws.amazon.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="aws" width="40" height="40"/> </a><a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a><a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a><a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a><a href="https://jestjs.io" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> </a><a href="https://webpack.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/d00d0969292a6569d45b06d3f350f463a0107b0d/icons/webpack/webpack-original-wordmark.svg" alt="webpack" width="40" height="40"/> </a></p>

### How to Use ###

- To play a Wordle game, keep the ***Bot*** setting ***Off*** and enter your guesses at the bottom. The statistics window to the right is purely informational and may be ignored.

- To activate the solver, switch the ***Bot*** setting to ***Slow***, ***Medium***, or ***Fast***. The solver results for these 3 speeds are identical, but the slower speeds display more of the behind-the-scenes calculations that go into determining the optimal guesses per information theory.

- This app was designed to allow seemless switching between all 4 of the ***Bot*** settings at any time, including in the middle of game rounds.

### How to Run App Locally ###
- npm intall
- npm run start