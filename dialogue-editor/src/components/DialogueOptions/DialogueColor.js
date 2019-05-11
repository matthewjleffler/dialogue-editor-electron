import React, { Component } from 'react';
import './DialogueOptions.css';

class DialogueColor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedOption: "DEFAULT",
    };

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
          checked={this.state.checkedOption === value}
          className="form-check-input"
          onChange={this.handleRadioChange}
        />
      </div>
    );
  }

  handleRadioChange(event) {
    this.setState({
      checkedOption: event.target.value,
    });
  }

  render() {
    const radioButtons = [];

    radioButtons.push(this.createRadioButton("DEFAULT", "transparent"));
    radioButtons.push(this.createRadioButton("RED", "#ff8080"));
    radioButtons.push(this.createRadioButton("GREEN", "#63ff53"));
    radioButtons.push(this.createRadioButton("BLUE", "#8d9dff"));
    radioButtons.push(this.createRadioButton("YELLOW", "#fff94e"));
    radioButtons.push(this.createRadioButton("ORANGE", "#ff954e"));
    radioButtons.push(this.createRadioButton("BROWN", "#c98151"));

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

export default DialogueColor;
