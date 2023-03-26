import {getColors} from './helperFunctions.js';

const colorsMap = {
  'g': 'lightgreen',
  'l': 'lightgrey',
  'y': 'yellow',
  'beige': 'beige'
}
export const Row = ({word, guess}) => {
  let rowContents = guess? getColors(word, guess) : new Array(word.length).fill('beige');
  console.log(rowContents)
  return (
    <div className="rowContainer">
      {rowContents.map((val, index) => (
        <div key={index} style={{'backgroundColor': colorsMap[val], width: '50px', height: '50px', 'fontSize': '40px', border: '3px solid black', 'textAlign':'center'}}>{val === 'beige' ? '' : guess[index]}</div>
      ))}

    </div>
  )
}