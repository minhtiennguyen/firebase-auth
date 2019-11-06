import React from 'react';
import { withFirebase }  from '../Firebase/context';

const SignOutButton = ({ firebase }) => (
  <button type='button' onClick={firebase.signOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
