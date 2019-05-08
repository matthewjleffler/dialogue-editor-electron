import React, { Component } from 'react';
import './DialogueView.css';
import DialogueEditor from './DialogueEditor';

class DialogueView extends Component {
  render() {
    let list = [];
    for (let i = 0; i < 7; i++) {
      list.push(<DialogueEditor key={'editor' + i} number={i}/>);
    }

    return (
      <div className="ViewContainer Scrolling">
        {list}
      </div>
    );
  }
}

export default DialogueView;
