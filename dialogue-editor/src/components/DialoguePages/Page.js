import React, { Component } from 'react';
import './DialoguePages.css';

class Page extends Component {
  constructor(props) {
    super(props);

    let stringData = this.getPageData(props).split('\\n').join('\n');
    this.state = {
      value: stringData,
    }
  }

  getPageData(props) {
    // No page data present
    if (props.region === undefined) {
      return "";
    }
    const page = props.region.page[props.index];
    if (page !== undefined) {
      if (page.text === undefined) {
        return "";
      }
      return page.text;
    } else {
      return "";
    }
  }

  handleChange = (event) => {
    const visualText = event.target.value;
    // Re-escape the text and update the data store
    const escapedText = visualText.split('\n').join('\\n');
    this.props.region.page[this.props.index].text = escapedText;
    this.setState({value: visualText});
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  onNewLeft = (event) => {
    this.props.pushNewPage(this.props.index);
  }

  onNewRight = (event) => {
    this.props.pushNewPage(this.props.index + 1);
  }

  onDelete = (event) => {
    this.props.deletePage(this.props.index);
  }

  render() {
    return (
      // TODO max rows
      <div className="Page">
        <div className="Status">
          <label className="Page">{'Page ' + (this.props.index + 1)}</label>
          <label className="Page">{'Chars: ' + this.state.value.length}</label>
        </div>
        <div className="View">
          <form className="ViewForm" onSubmit={this.handleSubmit}>
            <textarea
              className="ViewTextArea"
              maxLength={37*7}
              value={this.state.value}
              onChange={this.handleChange}
              spellCheck={true}
            />
          </form>
        </div>
        <div className="Controls">
          <button onClick={this.onNewLeft}>{'<+'}</button>
          <button onClick={this.onDelete}>{'X'}</button>
          <button onClick={this.onNewRight}>{'+>'}</button>
        </div>
      </div>
    );
  }
}

export default Page;
