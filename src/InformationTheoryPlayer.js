import {xxx} from './helperFunctions.js';
import React from 'react';

export const InformationTheoryPlayer = () => {

  const [result, setResult] = React.useState('');

  return (
  <div>
    <div>Word: {result[1]}</div>
    <div>Entropy: {result[0]}</div>
    <button onClick={()=>(setResult(xxx().getBestGuess()))}>get Best Guess</button>
  </div>
  )
}