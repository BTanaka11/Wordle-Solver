const getColors = (word, guess) => {
  let objLetters = {};
  let result = new Array(word.length);

  for (let i = 0; i < word.length; i ++) {
    objLetters[word[i]] = 1;
  }
  for (let i = 0; i < guess.length; i ++) {
    if (guess[i] === word[i]) {
      result[i] = 'green';
    } else if (objLetters[guess[i]]) {
      result[i] = 'yellow';
    } else {
      return[i] = 'grey'
    }
  }
  return result;
}

module.exports.getColors = getColors;