import React, { Component } from 'react';
import './DialogueView.css';

class DialogueEditor extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: 'Lorem ipsum dolor est',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('SUBMIT');
    event.preventDefault();
  }

  render() {
    return (
      <div className="DialogueEditor">
        <div className="View">
          <form className="ViewForm" onSubmit={this.handleSubmit}>
            <textarea className="ViewTextArea" value={this.state.value} onChange={this.handleChange} />
          </form>
        </div>
        <div className="Controls">
          <button>{'<-'}</button>
          <button>{'X'}</button>
          <button>{'->'}</button>
        </div>
      </div>
    );
  }
}

export default DialogueEditor;
