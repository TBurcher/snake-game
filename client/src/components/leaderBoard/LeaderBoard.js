import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'

class LeaderBoard extends PureComponent {
  componentWillMount() {
    
  }

  render() {
    const {games, users, history} = this.props

    if (games === null || users === null) return null

    return (<Paper className="outer-paper">
      <Button
        color="default"
        variant="raised"
        onClick={() => history.push(`/games`)}
        className="create-game"
      >
        Return to Games
      </Button>
      <div>
        {/* Mapping the leader board here {games.map(game => this.renderGame(game))} */}
      </div>
    </Paper>)
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  games: state.games === null ? null : Object.values(state.games).sort((a, b) => b.id - a.id)
})

export default connect(mapStateToProps, { })(LeaderBoard)