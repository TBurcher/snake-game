import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from '../users/entity'

@Entity()
export class Highscore extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.highscores)
  user: User
}