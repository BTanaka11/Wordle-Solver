import {words, getColors} from './helperFunctions.js';

let InfoTheoryWorld = function(words) {
  this.wordSpace = words;
}

InfoTheoryWorld.prototype.checkGuess = function(guess) {
  let distribution = {};
  let count = this.wordSpace.length;
  console.log(count)
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

InfoTheoryWorld.prototype.reset = function () {
  this.wordSpace = words;
}

InfoTheoryWorld.prototype.trimWordSpace = function (colors, guess) {
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
      if (this.wordSpace[i] === 'peeps') {
        console.log('greyed', yellowsObj, clonedYellowObj)
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

// module.exports = {
//   InfoTheoryWorld: InfoTheoryWorld,
//   infoTheoryDataStructure: () => (new InfoTheoryWorld(words))
// }

export const infoTheoryDataStructure = () => {
  return new InfoTheoryWorld(words);
}