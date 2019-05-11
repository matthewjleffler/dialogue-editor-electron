import React, { Component } from 'react';
import './App.css';
import StatusBar from './StatusBar/StatusBar';
import DialogueTree from './DialogueTree/DialogueTree';
import DialogueView from './DialogueView/DialogueView';
import DialogueOptions from './DialogueOptions/DialogueOptions';

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
