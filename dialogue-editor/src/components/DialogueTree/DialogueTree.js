import React, { Component } from 'react';
import { connect } from 'react-redux';
import { modifyTreeAction, setTreeActiveAction } from '../../actions/treeAction';
import { setActiveEntryAction } from '../../actions/entryActions';
import '../../../node_modules/react-ui-tree/dist/react-ui-tree.css';
import './DialogueTree.css';
import cx from 'classnames'
import Tree from 'react-ui-tree';

class DialogueTree extends Component {
  renderNode = node => {
    return (
      <span
        className={cx('node', {
          'is-active': node === this.props.active
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
    this.props.setTreeActiveAction(node);

    if (node.entry !== undefined) {
      this.props.setActiveEntryAction(node.entry);
    }
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
  active: state.treeReducer.active,
});

const mapDispatchToProps = {
  modifyTreeAction,
  setTreeActiveAction,
  setActiveEntryAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogueTree);
