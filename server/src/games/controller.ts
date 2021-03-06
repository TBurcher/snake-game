import { JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get, Body, Patch } from 'routing-controllers'
import {User} from '../users/entity'
import { Game, Player, Board, Snake, Location } from './entities'
import { IsBoard, isValidTransition, finished, newCoin, calculateWinner } from './logic'
import { Validate } from 'class-validator'
import { io } from '../index'

class GameUpdate {
  @Validate(IsBoard, {
    message: 'Not a valid board'
  })
  board: Board
  snake: Snake
  snake2: Snake
  coin: Location | null
}

@JsonController()
export default class GameController {

  @Authorized()
  @Post('/games')
  @HttpCode(201)
  async createGame(
    @CurrentUser() user: User
  ) {
    const entity = await Game.create().save()

    await Player.create({
      game: entity,
      user,
      symbol: 'x',
      snake: [[1, 1]],
    }).save()

    const game = await Game.findOneById(entity.id)

    io.emit('action', {
      type: 'ADD_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Post('/games/:id([0-9]+)/players')
  @HttpCode(201)
  async joinGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError(`Game does not exist`)
    if (game.status !== 'pending') throw new BadRequestError(`Game is already started`)

    game.status = 'started'
    await game.save()

    const player = await Player.create({
      game,
      user,
      symbol: 'o',
      snake: [[3, 3]]
    }).save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: await Game.findOneById(game.id)
    })

    return player
  }

  @Authorized()
  @Patch('/games/:id([0-9]+)')
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() update: GameUpdate
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)

    const player = await Player.findOne({ user, game })
    if (!player) throw new ForbiddenError(`You are not part of this game`)
    if (game.status !== 'started') throw new BadRequestError(`The game is not started yet`)
    if (player.symbol !== game.turn) throw new BadRequestError(`It's not your turn`)
    if (!isValidTransition(game.board, update.board)) throw new BadRequestError(`Invalid move`)
    if (update.coin === null) {
      const coin = newCoin(update.snake, update.snake2)
      game.coin = coin
    } 

    const winner = calculateWinner(update.snake, update.snake2)
    if (winner) {
      game.winner = player.symbol === 'x' ? 'o' : 'x'
      game.status = 'finished'
    }
    else if (finished(update.board)) {
      game.status = 'finished'
    }
    else {
      game.turn = player.symbol === 'x' ? 'o' : 'x'
    }

    const index = game.players.indexOf(game.players.filter(p => p.id === player.id)[0])
    game.players[index].snake = update.snake
    game.board = update.board
    player.snake = update.snake
    await game.save()
    await player.save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Get('/games/:id([0-9]+)')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOneById(id)
  }

  @Authorized()
  @Get('/games')
  getGames() {
    return Game.find()
  }
}
