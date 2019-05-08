import React, { Component } from 'react';
import './DialogueTree.css';
import DialogueTreeLine from './DialogueTreeLine';

class DialogueTree extends Component {

  render() {

    let list = [];
    for (let i = 0; i < 50; i++) {
      list.push(<DialogueTreeLine key={'treeline' + i} text={'val' + i}/>);
    }

    return (
      <div className="TreeContainer Scrolling">
        {list}
      </div>
    );
  }
}

export default DialogueTree;
