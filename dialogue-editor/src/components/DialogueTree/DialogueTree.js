import React, { Component } from 'react';
import * as constants from '../../constants';
import { connect } from 'react-redux';
import { actionTreeModify, actionTreeSetActive } from '../../actions/treeAction';
import { actionEntrySetActive } from '../../actions/entryActions';
import '../../../node_modules/react-ui-tree/dist/react-ui-tree.css';
import './DialogueTree.css';
import cx from 'classnames'
import Tree from 'react-ui-tree';

class DialogueTree extends Component {
  renderNode = node => {
    const { entry } = node;
    let type = null;
    let pages = null;
    // If this is an entry, fill out the necessary content
    if (entry !== undefined) {
      // TODO color
      // Find the number of pages for this region
      const region = constants.getRegionFromEntry(entry, this.props.region);
      let numPages = 0;
      if (Array.isArray(region.page)) {
        numPages = region.page.length;
      } else {
        numPages = 1;
      }
      // Find the type for this region
      type = (
        <div className="type">
          {constants.ENTRY_TYPE[entry._attributes.type]}
        </div>
      );
      pages = (
        <div className="pages">
          {numPages}
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
    this.props.actionTreeSetActive(node);

    if (node.entry !== undefined) {
      this.props.actionEntrySetActive(node.entry);
    }
  };

  handleChange = tree => {
    this.props.actionTreeModify(tree);
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
  region: state.entryReducer.region,
});

const mapDispatchToProps = {
  actionTreeModify,
  actionTreeSetActive,
  actionEntrySetActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogueTree);
