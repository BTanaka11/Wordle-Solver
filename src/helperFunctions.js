import wordList from './wordList.txt';

export let words = [];
fetch(wordList)
.then(response => response.text())
.then(text=> text.split(/\r?\t|\n/))
.then(res=>words = res)

export const getRandomWord = () => {
  let randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

export const getColors = (word, guess) => {

  let objLetters = {};
  let result = new Array(word.length);

  for (let i = 0; i < word.length; i ++) {
    if (guess[i] !== word[i]) {
      objLetters[word[i]] = 1 + (objLetters[word[i]] | 0);
    }
  }
  //g = lightgreen;
  //l = lightgrey
  //y= yellow
  for (let i = 0; i < guess.length; i ++) {
    if (guess[i] === word[i]) {
      result[i] = 'g';
    } else {
      let tempz = objLetters[guess[i]];
      if (tempz === undefined || tempz === 0) {
        result[i] = 'l'
      } else {
        objLetters[guess[i]] --;
        result[i] = 'y';
      }
    }
  }

  return result;
}