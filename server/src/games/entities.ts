import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type Symbol = 'x' | 'o' | '$'
export type Row = [ Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null ]
export type Board = [ Row, Row, Row, Row, Row ]
export type Body = [ Number, Number ] | [ null, null ]
export type Snake = Body[]

type Status = 'pending' | 'started' | 'finished'

const emptyRow: Row = [null, null, null, null, null]
const coinRow: Row = [null, null, '$', null, null]
const player1Row: Row = [null, 'x', null, null, null]
const player2Row: Row = [null, null, null, 'o', null]
const emptyBoard: Board = [ emptyRow, player1Row, coinRow, player2Row, emptyRow ]
const emptySnake: Snake = [ [null, null] ]

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: emptyBoard})
  board: Board

  @Column('json', {default: [2,2]})
  coin: Body

  @Column('char', {length:1, default: 'x'})
  turn: Symbol

  @Column('char', {length:1, nullable: true})
  winner: Symbol

  @Column('text', {default: 'pending'})
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
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