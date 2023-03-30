export const RowStat = ({guessStats}) => (

  <div>
    <span>Word Count Before: {guessStats.wordCountBefore}</span>
    <span>Word Count After: {guessStats.wordCountAfter}</span>
    <span>% Reduction: {guessStats.percentReduction}</span>
    <span>Entropy: {guessStats.entropy}</span>
  </div>

);
