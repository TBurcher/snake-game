import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getGames, joinGame, updateGame } from '../../actions/games'
import { getUsers } from '../../actions/users'
import { userId } from '../../jwt'
import Paper from 'material-ui/Paper'
import Board from './Board'
import './GameDetails.css'

class GameDetails extends PureComponent {


  myFunction = event => {
    const snake = this.props.game.players.filter(player => player.symbol === this.props.game.turn)[0].snake
    const originalSnake = [...snake]
    const snakeHead = snake[0]
    const snakeEnd = snake[snake.length - 1]

    if (event.key === 'ArrowUp') {
      console.log('up')
      snake.pop()
      if (snakeHead[0] === 0) {
        snake.unshift([4, snakeHead[1]])
      } else {
        snake.unshift([snakeHead[0] - 1, snakeHead[1]])
      }
    }
    else if (event.key === 'ArrowDown') {
      console.log('down')
      snake.pop()
      if(snakeHead[0] === 4){
        snake.unshift([0, snakeHead[1]])
      } else {
      snake.unshift([snakeHead[0] + 1, snakeHead[1]])
      }
    }
    else if (event.key === 'ArrowRight') {
      console.log('right')
      snake.pop()
      if(snakeHead[1]===4){
        snake.unshift([snakeHead[0], 0])
      }
      snake.unshift([snakeHead[0], snakeHead[1] + 1])
    }
    else if (event.key === 'ArrowLeft') {
      console.log('left')
      snake.pop()
      if(snakeHead[1]===0){
        snake.unshift([snakeHead[0], 4])
      }
      snake.unshift([snakeHead[0], snakeHead[1] - 1])
    }

    const coin = this.props.game.coin
    if (coin[0] === snake[0][0] && coin[1] === snake[0][1]) {
      snake.push(snakeEnd)
    }

    const { game, updateGame } = this.props
    const board = game.board.map(
      (row, rowIndex) => row.map((cell, cellIndex) => {
        let rs = snake.map((part) => {
          if (rowIndex === part[0] && cellIndex === part[1]) {
            return game.turn
          }
          else if (rowIndex === snakeEnd[0] && cellIndex === snakeEnd[1] && snake.length === originalSnake.length) {
            return null
          }
          else {
            return cell
          }
        }
        )
        return rs[0]

      }
      ))

    updateGame(game.id, board, snake) 
  }

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
      document.body.addEventListener('keydown', this.myFunction)

    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.myFunction)
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  makeMove = (toRow, toCell) => {
    const snake = this.props.game.players.filter(player => player.symbol === this.props.game.turn)[0].snake
    const originalSnake = [...snake]
    const snakeEnd = snake[snake.length - 1]
    if (this.props.game.coin[0] === toRow && this.props.game.coin[1] === toCell) {
      snake.unshift(this.props.game.coin)
    }
    else {
      snake.unshift([toRow, toCell])
      snake.pop()
    }
    const { game, updateGame } = this.props
    const board = game.board.map(
      (row, rowIndex) => row.map((cell, cellIndex) => {
        let rs = snake.map((part) => {
          if (rowIndex === part[0] && cellIndex === part[1]) {
            return game.turn
          }
          else if (rowIndex === snakeEnd[0] && cellIndex === snakeEnd[1] && snake.length === originalSnake.length) {
            return null
          }
          else {
            return cell
          }
        }
        )
        return rs[0]

      }
      ))

    updateGame(game.id, board, snake)
  }



  render() {

    const { game, users, authenticated, userId } = this.props
    if (!authenticated) return (
      <Redirect to="/login" />
    )

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]

    return (<Paper className="outer-paper">
      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>

      {
        game.status === 'started' &&
        player && player.symbol === game.turn &&
        <div>It's your turn!</div>
      }

      {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 &&
        <button onClick={this.joinGame}>Join Game</button>
      }

      {
        winner &&
        <p>Winner: {users[winner].firstName}</p>
      }

      <hr />

      {
        game.status !== 'pending' &&
        <Board board={game.board}/>
      }
    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
