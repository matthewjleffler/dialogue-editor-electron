import React, { Component } from 'react';
import './DialogueTree.css';

class DialogueTreeLine extends Component {

  render() {
    return (
      <div className="TreeLine">
        {this.props.text}
      </div>
    );
  }
}

export default DialogueTreeLine;
