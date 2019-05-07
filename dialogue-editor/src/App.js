import React, { Component } from 'react';
import { connect } from 'react-redux';
import { simpleAction } from './actions/simpleAction';
import './App.css';
import DialogueTree from './DialogueTree';
import DialogueView from './DialogueView';
import DialogueOptions from './DialogueOptions';

class App extends Component {
  constructor() {
    super();

    // this.state = {
    //   test: "test string",
    // };

    this.simpleAction = this.simpleAction.bind(this);
  }

  simpleAction(event) {
    this.props.simpleAction();
  }

  render() {
    return (
      <div className="App">
        <header className="Header"/>
        <div className="DialogueContainer">
          <DialogueTree />
          <DialogueView />
          <DialogueOptions />
        </div>
      </div>
    ); 
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
