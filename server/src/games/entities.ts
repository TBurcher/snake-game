import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type Symbol = 'x' | 'o' | '$'
export type Row = [ Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null ]
export type Board = [ Row, Row, Row, Row, Row ]
export type Body = [ number, number ] | [ null, null ]
export type Snake = Body[]

type Status = 'pending' | 'started' | 'finished'

const emptySnake: Snake = [ [null, null] ]
const emptyRow: Row = [null, null, null, null, null]
const coinRow: Row = [null, null, '$', null, null]
const player1Row: Row = [null, 'x', null, null, null]
const player2Row: Row = [null, null, null, 'o', null]
export const defaultBoard: Board = [ emptyRow, player1Row, coinRow, player2Row, emptyRow ]

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: defaultBoard})
  board: Board

  @Column('json', {default: [2,2]})
  coin: Body | null

  @Column('char', {length:1, default: 'x'})
  turn: Symbol

  @Column('char', {length:1, nullable: true})
  winner: Symbol

  @Column('text', {default: 'pending'})
  status: Status

  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}


@Entity()
@Index(['game', 'user', 'symbol'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column()
  userId: number

  @Column('char', {length: 1})
  symbol: Symbol

  @Column('json', {default: emptySnake})
  snake: Snake
}