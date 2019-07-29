import React, { Component } from 'react';
import './DialogueOptions.css';
import DialogueEntryType from './DialogueEntryType';
// import DialogueColor from './DialogueColor';

class DialogueOptions extends Component {

  render() {
    return (
      <div className="OptionsContainer Scrolling">
        <DialogueEntryType />
        {/* <DialogueColor /> */}
      </div>
    );
  }
}

export default DialogueOptions;
