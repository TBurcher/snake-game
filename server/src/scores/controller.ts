import { JsonController, Get, Post, BadRequestError } from "routing-controllers";
import { Highscore } from "./entity";

@JsonController()
export default class ScoreController {
  // @Authorized()
  @Get('/highscores')
  getHighscores() {
    return Highscore.find()
  }

  // @Authorized()
  @Post('/highscores')
  async postHighscore(
    // @Body() player: Player
  ) {
    const currentHighscores = await Highscore.find()
    let scoreToInsert = 11
    if (currentHighscores.length >= 10){
    const smallestHighscore = currentHighscores.reduce((smallHighcore, highscore) => {
      if(smallHighcore.score > highscore.score){
        return highscore
      } else {
        return smallHighcore
      }
    })
      
    if (smallestHighscore.score > scoreToInsert){
      return currentHighscores
    }
    await Highscore.removeById(smallestHighscore.id)

  }

    await Highscore.create({
      score: scoreToInsert,
    }).save()

    const newHighscores = await Highscore.find()

    return newHighscores
 }

}