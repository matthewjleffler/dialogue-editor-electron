import React, { Component } from 'react';
import './StatusBar.css';
import '../DialogueTree/DialogueTree.css';
import '../DialogueView/DialogueView.css';
import '../DialogueOptions/DialogueOptions.css';

class StatusBar extends Component {

  render() {
    const testStyle = {
      // backgroundColor: '#ff0000',
      flex: '1',
      height: '100%',
    };

    return (
      <div className="StatusBar">
        <div className="TreeContainer">
          <div style={testStyle}>
            Region:
          </div>
        </div>
        <div className="ViewContainer">
          <div style={testStyle}>
            No Entry Selected
          </div>
        </div>
        <div className="OptionsContainer">
        </div>
      </div>
    );
  }
}

export default StatusBar;
