import React, { Component } from 'react';
import * as constants from '../../constants';
import { connect } from 'react-redux';
import './DialoguePages.css';
import Page from './Page';

class DialoguePages extends Component {

  createPage(entry, index, region) {
    return (
      <Page
        key={entry._attributes.id + '_page_' + index}
        index={index}
        region={region}
      />
    )
  }

  render() {
    const pages = [];

    if (this.props.entry !== null) {
      let index = 0;
      const region = constants.getRegionFromEntry(this.props.entry, this.props.region);
      if (region !== undefined) {
        const regionPages = constants.getArrayProperty(region.page);
        if (regionPages !== undefined) {
          regionPages.forEach((page) => {
            pages.push(this.createPage(this.props.entry, index++, region));
          });
        }
      }
      
      // If there are no pages, we need to add an initial page
      if (pages.length < 1) {
        pages.push(this.createPage(this.props.entry, 0));
      }
    }
    
    return (
      <div className="DialoguePagesContainer Scrolling">
        {pages}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entry: state.entryReducer.entry,
  region: state.entryReducer.region,
});

export default connect(mapStateToProps)(DialoguePages);
