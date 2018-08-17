import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getGames, joinGame, updateGame } from '../../actions/games'
import { getUsers } from '../../actions/users'
import { userId } from '../../jwt'
import Paper from 'material-ui/Paper'
import Board from './Board'
import cobra from '../icons/cobra.svg'
import snake from '../icons/snake.svg'
import drums from '../audio/jumanji.mp3'
import './GameDetails.css'

class GameDetails extends PureComponent {

  music = new Audio(drums)
  onplay =() => {
    this.music.play()
  }
  onPause = () => {
    this.music.pause()
  }

  makeMove = event => {
    const { game, updateGame, userId } = this.props
    const snake = game.players.filter(player => player.symbol === game.turn)[0].snake
    const snake2 = game.players.filter(player => player.symbol !== game.turn)[0].snake
    const originalSnake = [...snake]
    const snakeHead = snake[0]
    const snakeEnd = snake[snake.length - 1]
    const player = game.players.find(p => p.userId === userId)

    if (player.symbol === game.turn && ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {

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
        if (snakeHead[0] === 4) {
          snake.unshift([0, snakeHead[1]])
        } else {
          snake.unshift([snakeHead[0] + 1, snakeHead[1]])
        }
      }
      else if (event.key === 'ArrowRight') {
        console.log('right')
        snake.pop()
        if (snakeHead[1] === 4) {
          snake.unshift([snakeHead[0], 0])
        } else {
          snake.unshift([snakeHead[0], snakeHead[1] + 1])
        }
      }
      else if (event.key === 'ArrowLeft') {
        console.log('left')
        snake.pop()
        if (snakeHead[1] === 0) {
          snake.unshift([snakeHead[0], 4])
        } else {
          snake.unshift([snakeHead[0], snakeHead[1] - 1])
        }
      }


      const coin = game.coin
      if (coin[0] === snake[0][0] && coin[1] === snake[0][1]) {
        snake.push(snakeEnd)
        game.coin = null
      }

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

      updateGame(game.id, board, snake, snake2, game.coin)
    }
    else {
      console.log('invalid movement')
    }
  }

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
      document.body.addEventListener('keydown', this.makeMove)
      this.onplay()
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.makeMove)
    this.onPause()
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  render() {

    const { game, users, authenticated, userId } = this.props
    if (!authenticated) return <Redirect to="/login" />
    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)
    const playerIcon = () => {
      if (player.symbol === 'x') { return cobra }
      else { return snake }
    }

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]
    const winnerIcon = () => {
      if (game.winner === 'x') { return cobra }
      else { return snake }
    }

    return (<Paper className="outer-paper">
      <div className="game-header">
        {
          game.status === 'pending' &&
          game.players.map(p => p.userId).indexOf(userId) === -1 &&
          <button onClick={this.joinGame}>Join Game</button>
        }
        {
          game.status === 'started' &&
          player && player.symbol === game.turn &&
          <div className="current-turn">It's your turn!</div>
        }
        {
          winner &&
          <div className="game-winner"><img src={winnerIcon()} alt="winner icon" /> Winner</div>
        }
        {
          player &&
          <div className="current-player"><img src={playerIcon()} alt="player icon" /> Player</div>
        }
      </div>
      <hr />
      <div className='whole-board'>
        {
          game.status !== 'pending' &&
          <Board board={game.board} coin={game.coin}
            cobraBody={game.players.filter(player => player.symbol === 'x')[0].snake}
            snakeBody={game.players.filter(player => player.symbol === 'o')[0].snake}
            className='board-object' />
        }
      </div>
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
