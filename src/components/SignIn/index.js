import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase/firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm /> 
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  password: '',
  email: '',
  error: null,
};
class SignInFormBase extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;

    this.props.firebase
      .signInUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  render() {
    const {
      password,
      email,
      error,
    } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input 
          name='email'
          value={email}
          onChange={this.onChange}
          type='text'
          placeholder='Email Address'
        />
        <input 
          name='password'
          value={password}
          onChange={this.onChange}
          type='password'
          placeholder='Password'
        />
        <button 
          type='submit'
          disabled={isInvalid}
        >
          Sign In
        </button>
      {error && <p>{error.message}</p>}
      </form>
    );
  }
}

// const SignUpForm =  withRouter(withFirebase(SignUpFormBase));
const SignInForm =  compose(
  withFirebase,
  withRouter
)(SignInFormBase);

export default SignInPage;
export { SignInForm };