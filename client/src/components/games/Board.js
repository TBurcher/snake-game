import React from 'react'
import './Board.css'

const renderCel = (rowIndex, cellIndex, symbol, hasTurn) => {
  return (
    <button
      className="board-tile"
      disabled={hasTurn}
      key={`${rowIndex}-${cellIndex}`}
    >{symbol || '-'}</button>
  )
}

export default ({ board }) => board.map((cells, rowIndex) =>
  <div key={rowIndex}>
    {cells.map((symbol, cellIndex) => renderCel( rowIndex, cellIndex, symbol, false))}
  </div>
)
