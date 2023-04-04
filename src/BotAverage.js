export const BotAverage = ({count, average}) => (
  <table>
    <thead>
      <tr>
        <th>Bot Rounds</th>
        <th>Bot Avg Guesses</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{count}</td>
        <td>{average}</td>
      </tr>
    </tbody>
  </table>
)