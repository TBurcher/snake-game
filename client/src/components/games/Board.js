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

export default ({ board, coin, cobraHead, snakeHead }) => board.map((cells, rowIndex) =>
  <div key={rowIndex} className='board'>
    {cells.map((symbol, cellIndex) => {
      if (rowIndex === coin[0] && cellIndex === coin[1]) {
        return renderCel(rowIndex, cellIndex, <img src={mouse} alt="mouse" />, false)
      } else if (rowIndex === cobraHead[0] && cellIndex === cobraHead[1]) {
        return renderCel(rowIndex, cellIndex, <img src={cobra} alt="cobra" />, false)
      } else if (rowIndex === snakeHead[0] && cellIndex === snakeHead[1]) {
        return renderCel(rowIndex, cellIndex, <img src={snake} alt="snake" />, false)
      }
      else if (symbol === 'x') {
        return renderCel(rowIndex, cellIndex,
          <svg height="50" width="50">
            <circle cx="25" cy="25" r="20" fill="#ffd335" />
          </svg>
          , false)
      }
      else if (symbol === 'o') {
        return renderCel(rowIndex, cellIndex,
          <svg height="50" width="50">
            <circle cx="25" cy="25" r="20" fill="#364963" />
          </svg>
          , false)
      }
      else {
        return renderCel(rowIndex, cellIndex, symbol, false)
      }
    })}
  </div>
)
