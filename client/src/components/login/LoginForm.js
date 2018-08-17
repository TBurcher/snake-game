import React, { PureComponent } from 'react'

export default class LoginForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		return (
      <div className="login-form">
  			<form onSubmit={this.handleSubmit}>
  				<label>
            Username
            <input type="username" name="username" value={
  						this.state.username || ''
  					} onChange={ this.handleChange } />
          </label>

  				<label>
            Password
            <input type="password" name="password" value={
  						this.state.password || ''
  					} onChange={ this.handleChange } />
          </label>

  				<button type="submit">Login</button>
  			</form>
		  </div>)
	}
}
