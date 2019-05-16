import React, { Component } from 'react';
import * as constants from '../../constants';
import { connect } from 'react-redux';
import { actionEntrySetActive, actionEntryRerender } from '../../actions/entryActions';
import './DialoguePages.css';
import Page from './Page';

class DialoguePages extends Component {
  constructor(props) {
    super(props);

    this.region = constants.getRegionFromEntry(props.entry, props.regionId);

    this.state = {
      pageCount: (this.region ? this.region.page.length : 0),
    };
  }

  updatePageCount = () => {
    this.setState({
      pageCount: (this.region ? this.region.page.length : 0),
    });
    this.props.actionEntryRerender();
  }

  createPage(entry, index, region) {
    return (
      <Page
        key={entry.id + '_page_' + index + '_' + this.state.pageCount}
        index={index}
        region={region}
        pushNewPage={this.pushNewPage}
        deletePage={this.deletePage}
      />
    )
  }

  pushNewPage = (index) => {
    this.region.page.splice(index, 0, { text: "" });
    this.updatePageCount();
  }
  
  deletePage = (index) => {
    this.region.page.splice(index, 1);
    this.updatePageCount();
  }

  componentDidUpdate(prevProps) {
    if (  this.props.regionId !== prevProps.regionId ||
          this.props.entry !== prevProps.entry) {
      this.region = constants.getRegionFromEntry(this.props.entry, this.props.regionId);
      this.updatePageCount();
    }
  }

  render() {
    const pages = [];

    if (this.props.entry !== null) {
      const region = constants.getRegionFromEntry(this.props.entry, this.props.regionId);
      if (region) {
        for (let i = 0; i < region.page.length; i++) {
          pages.push(this.createPage(this.props.entry, i, region));
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
  regionId: state.entryReducer.region,
});

const mapDispatchToProps = {
  actionEntrySetActive,
  actionEntryRerender,
}

export default connect(mapStateToProps, mapDispatchToProps)(DialoguePages);
