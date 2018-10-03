import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToOne } from 'typeorm'
import { User } from '../users/entity'
import { Game } from '../games/entities';

@Entity()
export class Highscore extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.highscores)
  user?: User

  @OneToOne(_=> Game, game => game.highscore)
  game?: Game

  @Column()
  score: number
}