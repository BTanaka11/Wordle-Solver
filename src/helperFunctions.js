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
        result[i] = 't';
      }
    }
  }

  return result;
}

let InfoTheoryWorld = function(words) {
  this.wordSpace = words;
}

InfoTheoryWorld.prototype.checkGuess = function(guess) {
  let distribution = {};
  let count = this.wordSpace.length;

  for (let i = 0; i < this.wordSpace.length; i ++) {
    let tempRes = getColors(this.wordSpace[i], guess).join('');
    distribution[tempRes] = 1 + (distribution[tempRes] || 0);
  }

  let entropy = 0;
  Object.values(distribution).forEach((val)=> {
      let p = val / count;
      let i = Math.log2(1/p);
      entropy += p * i;
  })
  return entropy;
}

InfoTheoryWorld.prototype.getBestGuess = function() {
  let max = [-Infinity, ''];
  this.wordSpace.forEach((word)=> {
    let res = this.checkGuess(word);
    if (res > max[0]) {
      max[0] = res;
      max[1] = word;
    }
  })
  return max;
}

export const xxx = () => {
  return new InfoTheoryWorld(words);
}