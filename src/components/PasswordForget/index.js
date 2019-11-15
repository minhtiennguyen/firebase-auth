import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase/firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1>Password Foret</h1>
    <PasswordForgetForm /> 
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null
}
class PasswordForgetFormBase extends Component {
  state = {
    ...INITIAL_STATE
  }

  onSubmit = event => {
    event.preventDefault();

    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return(
      <form onSubmit={this.onSubmit}>
        <input 
          name='email'
          value={email}
          onChange={this.onChange}
          type='text'
          placeholder='Email Address'
        />
        <button 
          type='submit'
          disabled={isInvalid}
        >
          Reset My Password
        </button>
      {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forget Password?</Link>
  </p>
);

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgetPage;
export { PasswordForgetLink, PasswordForgetForm };