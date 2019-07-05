import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionTreeSetInputType, actionTreeSetInputString } from '../../actions/treeAction';
import * as constants from '../../constants';
import './DialoguePages.css';

class TextEntry extends Component {
  constructor(props) {
    super(props);

    let initialPrompt = '';
    switch (this.props.inputType) {
      case constants.INPUT_TYPE.GROUP_NAME:
        initialPrompt = 'NewGroup';
        break;
      case constants.INPUT_TYPE.ENTRY_NAME:
        initialPrompt = 'NewEntry';
        break;
      case constants.INPUT_TYPE.RENAME_ENTRY:
        break;
      case constants.INPUT_TYPE.RENAME_GROUP:
        break;
      default:
        break;
    }

    this.state = {
      value: initialPrompt,
    }
  }

  componentDidMount() {
    this.inputLine.focus();
    document.addEventListener("keydown", this.onKey, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.onKey, false);
  }

  getPromptText = () => {
    switch (this.props.inputType) {
      case constants.INPUT_TYPE.GROUP_NAME:
      case constants.INPUT_TYPE.RENAME_GROUP:
        return 'Enter Group Name:';
      case constants.INPUT_TYPE.ENTRY_NAME:
      case constants.INPUT_TYPE.RENAME_ENTRY:
        return 'Enter Entry Name:';
      default:
        return 'Unhandled Type';
    }
  }

  handleChange = (event) => {
    // TODO verify text value
    this.setState({
      value: event.target.value,
    });
  }

  onSubmit = (event) => {
    // TODO verify the string
    event.preventDefault();
    this.props.actionTreeSetInputString(this.state.value);
    this.props.actionTreeSetInputType(constants.INPUT_TYPE.READ_TEXT);
  }

  onCancel = (event) => {
    if (event) {
      event.preventDefault();
    }
    this.props.actionTreeSetInputType(constants.INPUT_TYPE.NONE);
  }

  onKey = (event) => {
    // Escape pressed, cancel
    if (event.keyCode === 27) {
      this.onCancel();
      return;
    }
    // TODO filter input here, maybe? Or onchange?
  }

  render() {
    const promptText = this.getPromptText();
    return (
      <div className="Page">
        <div className="TextEntry">{promptText}</div>
        <form
          className="TextEntry"
          onSubmit={this.onSubmit}
        >
          <input
            ref={(input) => { this.inputLine = input;}}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onKeyPress={this.onKey}
          />
        </form>
        <div className="TextEntry">
          <button onClick={this.onCancel}>Cancel</button>
          <button onClick={this.onSubmit}>Ok</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  inputString: state.treeReducer.inputString,
});

const mapDispatchToProps = {
  actionTreeSetInputType,
  actionTreeSetInputString,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextEntry);
