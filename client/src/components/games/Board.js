import React from 'react'
import './Board.css'

const renderCel = (rowIndex, cellIndex, symbol, hasTurn) => {
  return (
    <button
      className="board-tile"
      disabled={hasTurn}
      key={`${rowIndex}-${cellIndex}`}
    >{symbol || '.' }</button>
  )
}

export default ({board, coin}) => board.map((cells, rowIndex) =>
  <div key={rowIndex}>
    {cells.map((symbol, cellIndex) => {
      if (rowIndex === coin[0] && cellIndex === coin[1]) {
        return renderCel(rowIndex, cellIndex, '$', false)
      } 
      else { return renderCel(rowIndex, cellIndex, symbol, false) }
    })}
  </div>
)
