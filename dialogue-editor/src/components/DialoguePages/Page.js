import React, { Component } from 'react';
import * as constants from '../../constants';
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
    const pages = constants.getArrayProperty(props.region.page);
    const page = pages[props.index];
    if (page !== undefined) {
      return page._cdata;
    } else {
      return "";
    }
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
