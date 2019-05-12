import React, { Component } from 'react';
import './DialoguePages.css';

class Page extends Component {
  constructor(props) {
    super(props);

    let stringData = this.getPageData(props).split('\\n').join('\n');
    this.state = {
      value: stringData,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getPageData(props) {
    // No page data present
    if (props.region === undefined) {
      return "";
    }
    if (Array.isArray(props.region.page)) {
      // Get the right page from the array
      return props.region.page[props.index]._cdata;
    }
    // We are a single page, return that data
    return props.region.page._cdata;
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
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
          <button>{'<+'}</button>
          <button>{'X'}</button>
          <button>{'+>'}</button>
        </div>
      </div>
    );
  }
}

export default Page;
