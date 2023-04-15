const Row = ({word, guess}) => {

  const colorsMap = {
    g: 'lightgreen',
    l: 'lightgrey',
    y: 'yellow',
    beige: 'beige'
  };

  return (
    <div className="rowContainer">
      {guess.guessColors.map((val, index) => (
        <div key={index} style={{
          backgroundColor: colorsMap[val],
          width: '80px',
          height: '80px',
          fontSize: '70px',
          border: '3px solid black',
          textAlign:'center'
        }}>{val === 'beige' ? '' : guess.guessWord[index]}</div>
      ))}
    </div>)
}

export default Row;