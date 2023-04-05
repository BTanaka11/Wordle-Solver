export const BotSpeedSetting = ({setBotSpeed, mode}) => {
  return (
  <fieldset disabled={mode !== 'gaming'} onChange={(e)=>(setBotSpeed(Number(e.target.value)))}>
    <legend>Bot:</legend>
    <input type="radio" id="off" name="drone" value="0" defaultChecked></input>
    <label htmlFor="off">Off</label>
    <input type="radio" id="Slow" name="drone" value="1"></input>
    <label htmlFor="Slow">Slow</label>
    <input type="radio" id="Medium" name="drone" value="2"></input>
    <label htmlFor="Medium">Medium</label>
    <input type="radio" id="Fast" name="drone" value="3"></input>
    <label htmlFor="Fast">Fast</label>

  </fieldset>
  )
}