import React from 'react';

export const TestInterval = () => {
  const [sec, setSec] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);

  React.useEffect(()=> {
    let interval;
    if (timerOn) {
      console.log('settted!')
      interval = setInterval(function myfunc(){setSec(a=>a+1); console.log('called!'); return myfunc}(), 5000);
    } else {
      clearInterval(interval);
    }
    return ()=>(clearInterval(interval));
  }, [timerOn]);

  return <div>
    <button style={{height:'50px', width:'50px'}} onClick={()=>setTimerOn(a=>!a)}>{timerOn ? 'OFF' : 'ON'}</button>
    <span>seconds ellapsed: {sec}</span>
  </div>
}