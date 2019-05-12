import React, { Component } from 'react';
import * as constants from '../../constants';
import { connect } from 'react-redux';
import { modifyTreeAction, setTreeActiveAction } from '../../actions/treeAction';
import { setActiveEntryAction } from '../../actions/entryActions';
import '../../../node_modules/react-ui-tree/dist/react-ui-tree.css';
import './DialogueTree.css';
import cx from 'classnames'
import Tree from 'react-ui-tree';

class DialogueTree extends Component {
  renderNode = node => {
    const { entry } = node;
    let type = null;
    let pages = null;
    if (entry !== undefined) {
      // TODO region and pages
      // let numPages = 0;
      // if (Array.isArray(entry.))
      type = (
        <div className="type">
          {constants.ENTRY_TYPE[entry._attributes.type]}
        </div>
      );
      pages = (
        <div className="pages">
          2
        </div>
      )
    }
    return (
      <span
        className={cx('node', {
          'is-active': node === this.props.active
        })}
        onClick={this.onClickNode.bind(null, node)}
        onContextMenu={this.onContext.bind(null, node)}
      >
        <div className="row">
          <div className="title">
            {node.module}
          </div>
          {type}
          {pages}
        </div>
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
