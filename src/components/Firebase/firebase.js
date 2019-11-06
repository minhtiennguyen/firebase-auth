import app from 'firebase/app';
import 'firebase/auth';
import FireBaseContext, { withFirebase } from './context';

// const prodConfig = {
//   apiKey: process.env.REACT_APP_PROD_API_KEY,
//   authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROD_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
// };

const devConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

// const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class FireBase {
  constructor() {
    app.initializeApp(devConfig);
    this.auth = app.auth();
  }

  createUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  signInUserWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.currentUser.updatePassword(password);
}

export default FireBase;

export { FireBaseContext, withFirebase };