import React from 'react'
import './Board.css'
import mouse from '../icons/mouse.svg'
import grass from '../icons/grass.svg'
import snake from '../icons/snake.svg'
import cobra from '../icons/cobra.svg'

const renderCel = (rowIndex, cellIndex, symbol, hasTurn) => {
  return (
    <button
      className="board-tile"
      disabled={hasTurn}
      key={`${rowIndex}-${cellIndex}`}
    >{symbol || <img src={grass} alt="grass" />}</button>
  )
}

export default ({ board, coin, cobraBody, snakeBody }) => board.map((cells, rowIndex) =>
  <div key={rowIndex} className='board'>
    {cells.map((symbol, cellIndex) => {
      if (rowIndex === coin[0] && cellIndex === coin[1]) {
        return renderCel(rowIndex, cellIndex, <img src={mouse} alt="mouse" />, false)
      } else if (rowIndex === cobraBody[0][0] && cellIndex === cobraBody[0][1]) {
        return renderCel(rowIndex, cellIndex, <img src={cobra} alt="cobra" />, false)
      } else if (rowIndex === snakeBody[0][0] && cellIndex === snakeBody[0][1]) {
        return renderCel(rowIndex, cellIndex, <img src={snake} alt="snake" />, false)
      } else if (rowIndex === cobraBody[cobraBody.length - 1][0] && cellIndex === cobraBody[cobraBody.length - 1][1]) {
        return renderCel(rowIndex, cellIndex,
          <svg height="50" width="50">
            <circle cx="25" cy="25" r="12" fill="#ffd335" />
          </svg>, false)
      } else if (rowIndex === snakeBody[snakeBody.length - 1][0] && cellIndex === snakeBody[snakeBody.length - 1][1]) {
        return renderCel(rowIndex, cellIndex,
          <svg height="50" width="50">
            <circle cx="25" cy="25" r="12" fill="#364963" />
          </svg>, false)
      } else if (rowIndex === cobraBody[cobraBody.length - 2][0] && cellIndex === cobraBody[cobraBody.length - 2][1]) {
        return renderCel(rowIndex, cellIndex,
          <svg height="50" width="50">
            <circle cx="25" cy="25" r="16" fill="#ffd335" />
          </svg>, false)
      } else if (rowIndex === snakeBody[snakeBody.length - 2][0] && cellIndex === snakeBody[snakeBody.length - 2][1]) {
        return renderCel(rowIndex, cellIndex,
          <svg height="50" width="50">
            <circle cx="25" cy="25" r="16" fill="#364963" />
          </svg>, false)
      } else if (symbol === 'x') {
        return renderCel(rowIndex, cellIndex,
          <svg height="50" width="50">
            <circle cx="25" cy="25" r="20" fill="#ffd335" />
          </svg>
          , false)
      } else if (symbol === 'o') {
        return renderCel(rowIndex, cellIndex,
          <svg height="50" width="50">
            <circle cx="25" cy="25" r="20" fill="#364963" />
          </svg>
          , false)
      } else {
        return renderCel(rowIndex, cellIndex, symbol, false)
      }
    })}
  </div>
)
