import wordList from './wordList.txt';

let words = [];
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
  for (let i = 0; i < guess.length; i ++) {
    if (guess[i] === word[i]) {
      result[i] = 'lightgreen';
    } else {
      let tempz = objLetters[guess[i]];
      if (tempz === undefined || tempz === 0) {
        result[i] = 'lightgrey'
      } else {
        objLetters[guess[i]] --;
        result[i] = 'yellow';
      }
    }
  }

  return result;
}