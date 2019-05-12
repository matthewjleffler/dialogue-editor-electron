import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionEntrySetColor } from '../../actions/entryActions';
import * as constants from '../../constants';
import './DialogueOptions.css';

class DialogueColor extends Component {
  constructor(props) {
    super(props);

    this.createRadioButton = this.createRadioButton.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  createRadioButton(value, color) {
    return (
      // TODO CLICKABLE IN WHOLE ROW
      <div 
        className="form-check" 
        style={{backgroundColor:color}}
        key={"entry_color_" + value}
      >
        <input
          type="radio"
          name="react-tips"
          value={value}
          checked={this.props.color === value}
          className="form-check-input"
          onChange={this.handleRadioChange}
        />
      </div>
    );
  }

  handleRadioChange(event) {
    this.props.actionEntrySetColor(event.target.value);
  }

  render() {
    const radioButtons = [];

    Object.keys(constants.HIGLIGHT_COLOR).forEach((key) => {
      radioButtons.push(this.createRadioButton(key, constants.HIGLIGHT_COLOR[key]));
    });

    return (
      <div className="DialogueColor">
        <label>
          Highlight Color
          <form className="Padding">
            {radioButtons}
          </form>
        </label>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  color: state.entryReducer.color,
});

const mapDispatchToProps = {
  actionEntrySetColor,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogueColor);
