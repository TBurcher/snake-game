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
  <div key={rowIndex} className='board' style={{backgroundColor: "green"}}>
    {cells.map((symbol, cellIndex) => {
      if (rowIndex === coin[0] && cellIndex === coin[1]) {
        return renderCel(rowIndex, cellIndex, <img src={mouse} alt="mouse" />, false)
      }
      if (rowIndex === cobraHead[0] && cellIndex === cobraHead[1]) {
        return renderCel(rowIndex, cellIndex, <img src={cobra} alt="cobra" />, false)
      }
      if (rowIndex === snakeHead[0] && cellIndex === snakeHead[1]) {
        return renderCel(rowIndex, cellIndex, <img src={snake} alt="snake" />, false)
      }
      else { return renderCel(rowIndex, cellIndex, symbol, false) }
    })}
  </div>
)
