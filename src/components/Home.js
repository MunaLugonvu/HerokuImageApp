import React, { Component } from 'react';
import firebase,{firebaseui} from '../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Photos from './Photos';

export default class Home extends Component {


  state = {
    isLoggedIn: false
  };



  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isLoggedIn: !!user})
    );
  }

  
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <StyledFirebaseAuth uiConfig={firebaseui} firebaseAuth={firebase.auth()}/>
      );
    }
    localStorage.setItem("user_id",firebase.auth().currentUser.uid)
    return (
        <Photos/>

    );
  }

}