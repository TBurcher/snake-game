import React from 'react'
import './Board.css'
import mouse from '../icons/mouse.svg'
import grass from '../icons/grass.svg'

const renderCel = (rowIndex, cellIndex, symbol, hasTurn) => {
  return (
    <button
      className="board-tile"
      disabled={hasTurn}
      key={`${rowIndex}-${cellIndex}`}
    >{symbol || <img src={grass} alt="grass" />}</button>
  )
}

export default ({ board, coin }) => board.map((cells, rowIndex) =>
  <div key={rowIndex} className='board'>
    {cells.map((symbol, cellIndex) => {
      if (rowIndex === coin[0] && cellIndex === coin[1]) {
        return renderCel(rowIndex, cellIndex, <img src={mouse} alt="mouse" />, false)

      } else if (symbol === 'x') {
        return renderCel(rowIndex, cellIndex,
          // <svg>
          //   <circle cx="5" cy="5" r="4"  fill="red" />
          // </svg> 
          'x'
          , false)
      } else if (symbol === 'o') {
        return renderCel(rowIndex, cellIndex, 'o', false)
      }


      else { return renderCel(rowIndex, cellIndex, symbol, false) }
    })}
  </div>
)
