import {getColors} from './helperFunctions.js';

export const Row = ({word, guess}) => {
  let rowContents = guess? getColors(word, guess) : new Array(word.length).fill('beige');
  return (
    <div className="rowContainer">
      {rowContents.map((val, index) => (
        <div key={index} style={{'backgroundColor': val, width: '50px', height: '50px', 'fontSize': '40px', border: '3px solid black', 'textAlign':'center'}}>{val === 'beige' ? '' : guess[index]}</div>
      ))}

    </div>
  )
}