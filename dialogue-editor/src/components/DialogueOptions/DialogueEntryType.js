import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionEntrySetType, actionEntryRerender } from '../../actions/entryActions';
import * as constants from "../../constants";
import './DialogueOptions.css';

class DialogueEntryType extends Component {

  createRadioButton = (value, name) => {
    return (
      // TODO CLICKABLE IN WHOLE ROW
      <div
        className="form-check"
        key={'entry_type_' + value}
      >
        <label>
          <input
            type="radio"
            name="react-tips"
            value={value}
            checked={this.props.type === value}
            className="form-check-input"
            onChange={this.handleRadioChange}
          />
          {name}
        </label>
      </div>
    );
  }

  handleRadioChange = (event) => {
    if (this.props.entry === null) {
      return;
    }
    const value = event.target.value;
    this.props.entry.type = value;
    this.props.actionEntrySetType(value);
    this.props.actionEntryRerender();
  }

  render() {
    const radiobuttons = [];

    Object.keys(constants.ENTRY_TYPE).forEach((key) => {
      radiobuttons.push(this.createRadioButton(key, constants.ENTRY_TYPE[key]));
    });

    return (
      <div className="EntryType">
        <label>
          Entry Type
          <form className="Padding">
            {radiobuttons}
          </form>
        </label>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entry: state.entryReducer.entry,
  type: state.entryReducer.type,
});

const mapDispatchToProps = {
  actionEntrySetType,
  actionEntryRerender,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogueEntryType);
