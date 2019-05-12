import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StatusBar.css';
import '../DialogueTree/DialogueTree.css';
import '../DialoguePages/DialoguePages.css';
import '../DialogueOptions/DialogueOptions.css';

class StatusBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      regionValue: 'en',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    console.log("Region Changed");
  }

  render() {
    let entryTitle = "No Entry Selected";
    if (this.props.entry !== null) {
      entryTitle = "Entry: " + this.props.entry._attributes.id;
    }

    return (
      <div className="StatusBar">
        <div className="TreeContainer">
          <form>
            <label>
              Region:
              <select
                value={this.state.regionValue}
                onChange={this.onChange}
              >
                <option value='en'>{'en'}</option>
                <option disabled>_________</option>
                <option value='new'>{'New Region'}</option>
              </select>
            </label>
          </form>
        </div>
        <div className="DialoguePagesContainer">
          {entryTitle}
        </div>
        <div className="OptionsContainer">
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entry: state.entryReducer.entry,
});

export default connect(mapStateToProps)(StatusBar);
