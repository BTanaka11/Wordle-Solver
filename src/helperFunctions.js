import wordList from './wordList.txt';

export let words = [];
fetch(wordList)
.then(response => response.text())
.then(text=> text.split(/\r?\t|\n/))
.then(res=>words = res)

export const getColors = (actualWord, guessWord) => {

  let letterCounts = {};
  let colors = [];

  for (let i = 0; i < actualWord.length; i ++) {
    if (guessWord[i] !== actualWord[i]) {
      letterCounts[actualWord[i]] = 1 + (letterCounts[actualWord[i]] | 0);
    }
  }
  //g = lightgreen;
  //l = lightgrey
  //y= yellow
  for (let i = 0; i < guessWord.length; i ++) {
    if (guessWord[i] === actualWord[i]) {
      colors.push('g');
    } else {
      let tempz = letterCounts[guessWord[i]];
      if (tempz === undefined || tempz === 0) {
        colors.push('l');
      } else {
        letterCounts[guessWord[i]] --;
        colors.push('y');
      }
    }
  }

  return colors;
}