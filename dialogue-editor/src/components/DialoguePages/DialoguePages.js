import React, { Component } from 'react';
import * as constants from '../../constants';
import { connect } from 'react-redux';
import { actionTreeSetFilterText } from '../../actions/treeAction';
import { actionEntrySetActive, actionEntryRerender } from '../../actions/entryActions';
import './DialoguePages.css';
import Page from './Page';
import Search from '../Search/Search';
import TextEntry from './TextEntry';

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
    const key = `${constants.getFullEntryPath(entry)}_page_${index}_${this.state.pageCount}`;
    return (
      <Page
        key={key}
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
    if (this.state.pageCount <= 1) {
      window.alert('Cannot delete last page in an entry');
      return;
    }
    if (!window.confirm("Are you sure you want to delete this page?")) {
      return;
    }
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
    const display = [];

    switch (this.props.inputType) {
      case constants.INPUT_TYPE.NONE:
        if (this.props.entry !== null) {
          const region = constants.getRegionFromEntry(this.props.entry, this.props.regionId);
          if (region) {
            for (let i = 0; i < region.page.length; i++) {
              display.push(this.createPage(this.props.entry, i, region));
            }
          }
        }
        break;
      case constants.INPUT_TYPE.READ_TEXT:
        // Nothing
        break;
      default:
        display.push((
          <TextEntry
            key={'text_entry'}
            inputType={this.props.inputType}
          />
        ));
        break;
    }
    
    return (
      <div className="DialoguePagesContainer Scrolling">
        <Search label="Search Text:" dispatchAction={this.props.actionTreeSetFilterText}/>
        {display}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  inputType: state.treeReducer.inputType,
  entry: state.entryReducer.entry,
  regionId: state.entryReducer.region,
});

const mapDispatchToProps = {
  actionEntrySetActive,
  actionEntryRerender,
  actionTreeSetFilterText,
}

export default connect(mapStateToProps, mapDispatchToProps)(DialoguePages);
