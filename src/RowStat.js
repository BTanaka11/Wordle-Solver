export const RowStat = ({guessStats}) => {

  let bitsBefore = Math.log2(guessStats.wordCountBefore).toFixed(2);
  let bitsAfter = Math.log2(guessStats.wordCountAfter).toFixed(2);

  return (
  <tr style={{height: '90px'}}>
    <td>{`${guessStats.wordCountBefore} ⮕ ${guessStats.wordCountAfter}`}</td>
    <td>{bitsBefore} ⮕ {bitsAfter}</td>
    <td>{guessStats.entropy.toFixed(2)}</td>
    <td>{(bitsBefore - bitsAfter).toFixed(2)}</td>
  </tr>);
};