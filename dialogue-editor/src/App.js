import React, { Component } from 'react';
import './App.css';
import StatusBar from './components/StatusBar/StatusBar';
import DialogueTree from './components/DialogueTree/DialogueTree';
import DialogueView from './components/DialogueView/DialogueView';
import DialogueOptions from './components/DialogueOptions/DialogueOptions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="Header"/>
        <StatusBar />
        <div className="DialogueContainer">
          <DialogueTree />
          <DialogueView />
          <DialogueOptions />
        </div>
      </div>
    ); 
  }
}

export default App;
