import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import { getLeaders } from '../../actions/leaders'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { Redirect } from 'react-router-dom'


class LeaderBoard extends PureComponent {
  componentWillMount() {
    this.props.getLeaders()
  }

  renderLeaders = (leaders) => {
    return leaders.map(leader => (<Card key={leader.id} className="leader-card">
      <CardContent>
        <Typography color="textSecondary">
          Max score: {leader.score}
        </Typography>
      </CardContent>
    </Card>)
    )
  }

  render() {
    const { authenticated, history, leaders } = this.props

    if (!authenticated) return <Redirect to="/login" />

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
        {leaders && this.renderLeaders(leaders)}
      </div>
    </Paper>)
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  games: state.games === null ? null : Object.values(state.games).sort((a, b) => b.id - a.id),
  leaders: state.leaders,
})

export default connect(mapStateToProps, { getLeaders })(LeaderBoard)