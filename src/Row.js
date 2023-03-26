import {getColors} from './helperFunctions.js';

export const Row = ({word, guess}) => {

  let rowContents = guess? getColors(word, guess) : new Array(word.length).fill('beige');
  return (
    <div className="rowContainer">
      {rowContents.map((val, index) => (

        <div key={index} style={{'background-color': val, width: '50px', height: '50px', 'font-size': '40px'}}>{val === 'white' ? '' : guess[index]}</div>
      ))}

    </div>
  )
}