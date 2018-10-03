import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { signup, checkEmail } from '../../actions/users'
import SignupForm from './SignupForm'
import { Redirect } from 'react-router-dom'

class SignupPage extends PureComponent {
	handleSubmit = (data) => {
		this.props.postSignup(data.username, data.password)
	}

	render() {
		if (this.props.signup.success) return (
			<Redirect to="/" />
		)

		return (
			<div>
				<h1>Sign up</h1>

				<SignupForm onSubmit={this.handleSubmit} checkUsername={this.props.checkEmail}/>

				<p style={{color:'red'}}>{ this.props.signup.error }</p>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		signup: state.signup
	}
}

export default connect(mapStateToProps, {postSignup: signup, checkEmail})(SignupPage)
