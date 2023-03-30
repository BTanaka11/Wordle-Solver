import React from 'react';
import {RowStat} from './RowStat.js';

export const InformationTheoryPlayer = ({stats}) => {

  const [result, setResult] = React.useState('');

  return (
    <div>
      {stats.map((stat, index)=> (
        <RowStat stat={stat} key={index}></RowStat>
      ))}
    </div>
  // <div>
  //   <div>Word: {result[1]}</div>
  //   <div>Entropy: {result[0]}</div>
  //   <button onClick={()=>(setResult(xxx().getBestGuess()))}>get Best Guess</button>
  // </div>
  )
}