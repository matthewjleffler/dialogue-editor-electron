import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFullEntryPath } from '../../constants';
import { actionEntrySetRegion, actionEntrySetRegionList } from '../../actions/entryActions';
import './StatusBar.css';
import '../DialogueTree/DialogueTree.css';
import '../DialoguePages/DialoguePages.css';

class StatusBar extends Component {

  onChange = (event) => {
    const value = event.target.value;
    if (value === 'new') {
      // TODO handle new
    } else {
      this.props.actionEntrySetRegion(value);
    }
  }

  render() {
    let entryTitle = "No Entry Selected";
    if (this.props.entry !== null) {
      entryTitle = "Entry: " + getFullEntryPath(this.props.entry);
    }

    const allOptions = [];
    this.props.regionList.forEach((region) => {
      allOptions.push((
        <option key={'region_' + region} value={region}>{region}</option>
      ));
    });
    allOptions.push(<option key={'region_sep'} disabled>_________</option>);
    allOptions.push(<option key={'region_new'} value='new'>{'New Region'}</option>);

    return (
      <div className="StatusBar">
        <div className="TreeContainer">
          <form>
            <label>
              Region:
              <select
                value={this.props.region}
                onChange={this.onChange}
              >
                {allOptions}
              </select>
            </label>
          </form>
        </div>
        <div className="DialoguePagesContainer">
          {entryTitle}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entry: state.entryReducer.entry,
  region: state.entryReducer.region,
  regionList: state.entryReducer.regionList,
});

const mapDispatchToProps = {
  actionEntrySetRegion,
  actionEntrySetRegionList,
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);
