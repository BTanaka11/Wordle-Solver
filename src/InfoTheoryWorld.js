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
  if (this.originalWordSpaceLength === this.wordSpace.length && this.bestFirstGuess) {
    return this.bestFirstGuess;
  }

  let max = [-Infinity, ''];
  this.wordSpace.forEach((word)=> {
    let res = this.checkGuess(word);
    if (res > max[0]) {
      max[0] = res;
      max[1] = word;
    }
  })
  if (this.originalWordSpaceLength === this.wordSpace.length) {
    this.bestFirstGuess = max[1];
  }
  return max[1];
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
    // if (include === false || yellowTempCount !== yellowCount) {
    //   this.wordSpace[i] = null;
    // }
    if (include === true && yellowTempCount === yellowCount) {
      results.push(this.wordSpace[i])
    }
  }
  this.wordSpace = results;
  // this.wordSpace = this.wordSpace.filter((item)=>(item !== null));
}

InfoTheoryWorld.prototype.trimWordSpaceOLD = function (colors, guess) {
  //g = lightgreen > letter in right place
  //l = lightgrey > not in the answer
  //y= yellow > in the answer but diff spot
  let greens = [];
  let remainingIndexes = [];
  let yellowsObj = {};
  let greysObj = {};
  let including = true;

  for (let i = 0; i < guess.length; i ++) {
    if (colors[i] === 'g') {
      greens.push(i);
    } else if (colors[i] === 'l') {
      greysObj[guess[i]] = 1;
      remainingIndexes.push(i)
    } else if (colors[i] === 'y') {
      yellowsObj[guess[i]] = 1 + (yellowsObj[guess[i]] | 0);
      remainingIndexes.push(i)
    }
  }

  for (let i = 0; i < this.wordSpace.length; i ++) {
    //exclude greens

    if (greens.some((k)=>(this.wordSpace[i][k] !== guess[k]))) {
      including = false;
    }

    let greysToExclude;
    if (including) {
      //exclude yellows
      let clonedYellowObj = {...yellowsObj};
      greysToExclude = new Array(colors.length).fill(false);
      for (let j = 0; j < remainingIndexes.length; j ++) {
        let index = remainingIndexes[j];
        let tempz = clonedYellowObj[this.wordSpace[i][index]];
        if (tempz !== undefined) {
          if (this.wordSpace[i][index] === guess[index]) {
            including = false;
            break;
          }
          greysToExclude[index] = true;
          if (tempz === 1) {
            delete clonedYellowObj[this.wordSpace[i][index]];
          } else if (tempz > 1) {
            clonedYellowObj[this.wordSpace[i][index]] --;
          }
        }
      }

      if (Object.keys(clonedYellowObj).length !== 0) {
        including = false;
      }
    }

    if (including) {
      //exclude greys
      for (let j = 0; j < remainingIndexes.length; j ++) {
        if (!greysToExclude[remainingIndexes[j]]) {

          if (greysObj[this.wordSpace[i][remainingIndexes[j]]]) {
            including = false;
            break;
          }
        }
      }
    }
    if (!including) {
      this.wordSpace[i] = null;
      including = true;
    }
  }
  this.wordSpace = this.wordSpace.filter((item)=>(item !== null));
}

export default InfoTheoryWorld;
// module.exports.InfoTheoryWorld = InfoTheoryWorld;