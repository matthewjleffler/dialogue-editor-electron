import React, { Component } from 'react';
import { connect } from 'react-redux';
import { modifyTreeAction } from '../actions/treeAction'
import '../../node_modules/react-ui-tree/dist/react-ui-tree.css';
import './DialogueTree.css';
import cx from 'classnames'
import Tree from 'react-ui-tree';

class DialogueTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: null,
    }
  }

  renderNode = node => {
    return (
      <span
        className={cx('node', {
          'is-active': node === this.state.active
        })}
        onClick={this.onClickNode.bind(null, node)}
        onContextMenu={this.onContext.bind(null, node)}
      >
        {node.module}
      </span>
    );
  };

  onContext = (node) => {
    console.log("Context Clicked " + node.module);
  }

  onClickNode = (node) => {
    this.setState({
      active: node
    });
  };

  handleChange = tree => {
    this.props.modifyTreeAction(tree);
  };

  render() {
    return (
      <div className="TreeContainer Scrolling">
        <Tree
          paddingLeft={20}
          tree={this.props.tree}
          onChange={this.handleChange}
          isNodeCollapsed={this.isNodeCollapsed}
          renderNode={this.renderNode}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tree: state.treeReducer.tree,
});

const mapDispatchToProps = dispatch => ({
  modifyTreeAction: (tree) => dispatch(modifyTreeAction.bind(null, tree)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogueTree);
