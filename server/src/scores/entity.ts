import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToOne, JoinColumn } from 'typeorm'
import { User } from '../users/entity'

@Entity()
export class Highscore extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.highscores, {
    eager: true
  })
  user: User

  @Column()
  score: number

  @Column()
  moves: number
}