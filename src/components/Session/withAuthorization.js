import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase/firebase';
import { SIGN_IN } from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if(!condition(authUser)) {
            this.props.history.push(SIGN_IN);
          }
        }
      );
    }
    
    componentWillUnmount() {
      this.listener();
    }
    
    render() {
      return (
        <AuthUserContext.Consumer>
          { authUser =>  condition(authUser) ? <Component {...this.props} /> : null }
        </AuthUserContext.Consumer>
     
      );
    }
  }

  return compose(
    withFirebase,
    withRouter
  )(WithAuthorization);
} 

export default withAuthorization;