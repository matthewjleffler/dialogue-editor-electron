import React, { Component } from 'react';
import './DialoguePages.css';
import Page from './Page';

class DialoguePages extends Component {

  createPage(index) {
    return (
      <Page key={'page' + index} number={index} />
    )
  }

  render() {
    let pages = [];
    // for (let i = 0; i < 1; i++) {
    //   pages.push(<Page key={'editor' + i} number={i}/>);
    // }

    // If there are no pages, we need to add an initial page
    if (pages.length < 1) {
      pages.push(this.createPage(0));
    }

    return (
      <div className="DialoguePagesContainer Scrolling">
        {pages}
      </div>
    );
  }
}

export default DialoguePages;
