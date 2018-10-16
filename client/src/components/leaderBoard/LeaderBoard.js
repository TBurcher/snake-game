import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import { getLeaders } from '../../actions/leaders'
import { Redirect } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

class LeaderBoard extends PureComponent {
  componentWillMount() {
    this.props.getLeaders()
  }

  renderLeaders = (leaders) => {
    return (<Table className={this.props.classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell numeric>Maximum length</TableCell>
              <TableCell numeric>Number of moves</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaders.map(leader => {
              return (
                <TableRow key={leader.id}>
                  <TableCell component="th" scope="leader">
                    Name of the user
                  </TableCell>
                  <TableCell numeric>{leader.score}</TableCell>
                  <TableCell numeric>number of moves</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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

export default connect(mapStateToProps, { getLeaders })(withStyles()(LeaderBoard))