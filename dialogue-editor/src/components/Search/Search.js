import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: "",
    };
  }

  onChange = (event) => {
    this.setState({
      searchString: event.target.value,
    });
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
      </div>
    )
  }
}

export default Search;
