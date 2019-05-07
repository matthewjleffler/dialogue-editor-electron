import React, { Component } from 'react';
import './DialogueView.css';
import DialogueEditor from './DialogueEditor';

class DialogueView extends Component {

  render() {
    let list = [];
    for (let i = 0; i < 10; i++) {
      list.push(<DialogueEditor key={'editor' + i}/>);
    }

    return (
      <div className="ViewContainer">
        {list}
      </div>
    );
  }
}

export default DialogueView;
