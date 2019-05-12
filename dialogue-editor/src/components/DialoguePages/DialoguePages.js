import React, { Component } from 'react';
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

  findRegion(entry, region) {
    if (entry.region !== undefined) {
      if (Array.isArray(entry.region)) {
        let result = null;
        entry.region.forEach((entryRegion) => {
          if (entryRegion._attributes.id === region) {
            result = entryRegion;
          }
        });
        if (result !== null) {
          return result;
        }
      } else if (entry.region._attributes.id === region) {
        return entry.region;
      }
    }
    return null;
  }

  render() {
    const pages = [];

    if (this.props.entry !== null) {
      // TODO check region
      let index = 0;
      const region = this.findRegion(this.props.entry, 'en');
      if (region !== undefined) {
        if (Array.isArray(region.page)) {
          region.page.forEach((page) => {
            pages.push(this.createPage(this.props.entry, index++, region));
          });
        } else {
          pages.push(this.createPage(this.props.entry, index++, region));
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
});

export default connect(mapStateToProps)(DialoguePages);
