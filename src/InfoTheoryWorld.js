import {getColors} from './helperFunctions.js';

let InfoTheoryWorld = function(words) {
  this.wordSpace = words;
  this.orgiginalWordSpace = [...words];
  this.originalWordSpaceLength = words.length;
  this.bestFirstGuess = null;
  this.index = 0;

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
  });

  return entropy.toFixed(2);
}

InfoTheoryWorld.prototype.getBestGuess = function() {
  if (this.wordSpace.length === 1) {
    return [this.wordSpace[0], 0];
  }
  if (this.originalWordSpaceLength === this.wordSpace.length && this.bestFirstGuess) {
    return this.bestFirstGuess;
  }

  let max = [-Infinity, ''];

  let tempCopyWordSpace = this.wordSpace.length > 200 ? this.orgiginalWordSpace : this.wordSpace;

  tempCopyWordSpace.forEach((word)=> {
    let res = this.checkGuess(word);
    if (res > max[0]) {
      max[0] = res;
      max[1] = word;
    }
  })
  if (this.originalWordSpaceLength === this.wordSpace.length) {
    this.bestFirstGuess = [max[1], max[0]];
  }
  return [max[1], max[0]];
}

InfoTheoryWorld.prototype.trimWordSpace = function (colors, guess) {
  let yellowsOBJ = {};
  let greysOBJ = {};
  let yellowCount = 0;
  let results = [];
  for (let i = 0; i < guess.length; i ++) {
    if (colors[i] === 'y') {
      yellowsOBJ[guess[i]] = 1 + (yellowsOBJ[guess[i]] || 0);
      yellowCount ++;
    } else if (colors[i] === 'l') {
      greysOBJ[guess[i]] = true;
    }
  }
  for (let i = 0; i < this.wordSpace.length; i ++) {
    let clonedYellow = {...yellowsOBJ};
    let include = true;
    let j = 0;
    let yellowTempCount = 0;
    while (j <= guess.length && include) {
      if (colors[j] === 'g') {
        if (this.wordSpace[i][j] !== guess[j]) {
          include = false;
        }
      } else if (colors[j] === 'y' && this.wordSpace[i][j] === guess[j]) {
        include = false;
      } else if (clonedYellow[this.wordSpace[i][j]] > 0) {
        clonedYellow[this.wordSpace[i][j]] --;
        yellowTempCount ++;
      } else if (greysOBJ[this.wordSpace[i][j]]) {
        include = false;
      }
      j++;
    }
    if (include === true && yellowTempCount === yellowCount) {
      results.push(this.wordSpace[i])
    }
  }
  this.wordSpace = results;
}

InfoTheoryWorld.prototype.validateGuess = function(guess) {
  return this.orgiginalWordSpace.some((word)=>(word === guess));
}

export default InfoTheoryWorld;