import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Row, defaultBoard, Location, Snake } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const symbols = ['x', 'o', '$', null]
    return board.length === 5 &&
      board.every(row =>
        row.length === 5 &&
        row.every(symbol => symbols.includes(symbol))
      )
  }
}

export const isValidTransition = (from: Board, to: Board) => {
  const changes = from
    .map(
      (row, rowIndex) => row.map((symbol, columnIndex) => ({
        from: symbol, 
        to: to[rowIndex][columnIndex]
      }))
    )
    .reduce((a, b) => a.concat(b))
    .filter(change => change.from !== change.to)

  return changes.length <= 2
}

export const randomLocation = () => {
  const row: number = Math.floor(Math.random() * defaultBoard.length)
  const column: number = Math.floor(Math.random() * defaultBoard[0].length)
  const location: Location = [row, column]
  return location
}

export const newCoin = (player1Snake: Snake, player2Snake: Snake) => {
    const snakeLocations = player1Snake.concat(player2Snake)
    const coinCheck = () => {
      let newCoin = randomLocation()
      return snakeLocations.map(location => {
        if (newCoin === location) { 
          coinCheck()
          return null
        }
        else { return newCoin }
      })
    }
    return coinCheck()[0]
  }

export const finished = (board: Board): boolean =>
  board
    .reduce((a, b) => a.concat(b) as Row)
    .every(symbol => symbol !== null)
