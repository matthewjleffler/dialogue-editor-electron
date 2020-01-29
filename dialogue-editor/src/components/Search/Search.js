import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: "",
    };
  }

  setString = (value) => {
    this.setState({
      searchString: value,
    });
    if (this.props.dispatchAction) {
      this.props.dispatchAction(value);
    }
  }

  onChange = (event) => {
    this.setString(event.target.value);
  }

  onClear = (event) => {
    this.setString('');
  }

  render() {
    return (
      <div className="Search">
        <input
          type="text"
          value={this.state.searchString}
          placeholder={this.props.label}
          onChange={this.onChange}
        />
        <button onClick={this.onClear}>
          x
        </button>
      </div>
    )
  }
}

export default Search;
