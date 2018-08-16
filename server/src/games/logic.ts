import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Row, defaultBoard, Location, Snake } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const symbols = ['x', 'o', '$', null]
    return board.length === 5 &&
      board.every(row => row.length === 5 &&
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
  const coinCheck = (): Location => {
    let newCoin = randomLocation()
    if (snakeLocations.filter(location => newCoin[0] === location[0] && newCoin[1] === location[1]).length < 1) {
      return newCoin
    } 
    else return coinCheck()
  }
  return coinCheck()
}

export const calculateWinner = (player1Snake: Snake, player2Snake: Snake) => {
  const snakeHead = player1Snake[0]
  const snakeLocations = player1Snake.concat(player2Snake)
  console.log(`this is my head ${snakeHead} and this is all snake parts ${snakeLocations}`)
  if (snakeLocations.filter(location => snakeHead[0] === location[0] && snakeHead[1] === location[1]).length > 1) {
    console.log(`looking at ${snakeLocations.filter(location => snakeHead[0] === location[0] && snakeHead[1] === location[1])}s length`)
    return true
  }
  else return false
}

export const finished = (board: Board): boolean =>
  board
    .reduce((a, b) => a.concat(b) as Row)
    .every(symbol => symbol !== null)
