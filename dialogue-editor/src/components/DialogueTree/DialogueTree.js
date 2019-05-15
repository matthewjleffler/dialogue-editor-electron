import React, { Component } from 'react';
import * as constants from '../../constants';
import { connect } from 'react-redux';
import { actionTreeSetActive } from '../../actions/treeAction';
import { actionEntrySetActive } from '../../actions/entryActions';
import '../../../node_modules/react-ui-tree/dist/react-ui-tree.css';
import './DialogueTree.css';
import cx from 'classnames'
import Tree from 'react-ui-tree';

class DialogueTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tree: this.buildTree(props.tree),
    };
  }

  buildTree(constructedTree) {
    const rootGroup = constructedTree.group[0];
    const rootTree = {
      module: rootGroup.id,
      children: [],
    }
    this.buildTreeRecursive(rootGroup, rootTree);
    return rootTree;
  }

  buildTreeRecursive(constructedGroup, treeNode) {
    for (let i = 0; i < constructedGroup.group.length; i++) {
      const group = constructedGroup.group[i];
      const newBranch = {
        module: group.id,
        children: [],
        collapsed: true,
      };
      this.buildTreeRecursive(group, newBranch);
      for (let j = 0; j < group.entry.length; j++) {
        const entry = group.entry[j];
        const newEntry = {
          module: entry.id,
          leaf: true,
          entry: entry,
        };
        newBranch.children.push(newEntry);
      }
      treeNode.children.push(newBranch);
    }
  }

  renderNode = node => {
    const { entry } = node;
    let type = null;
    let pages = null;
    // If this is an entry, fill out the necessary content
    if (entry !== undefined) {
      // TODO color

      let numPages = 0;
      // Find the number of pages for this region
      const region = constants.getRegionFromEntry(entry, this.props.region);
      if (region !== undefined) {
        const regionPages = region.page;
        if (regionPages !== undefined) {
          numPages = regionPages.length;
        }
      }
      type = (
        <div className="type">
          {constants.ENTRY_TYPE[entry.type]}
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
    // TODO need to transmit state change back up?
    this.setState({
      tree: tree,
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.tree !== prevProps.tree) {
      this.setState({
        tree: this.buildTree(this.props.tree),
      });
    }
  }

  render() {
    return (
      <div className="TreeContainer Scrolling">
        <Tree
          paddingLeft={20}
          tree={this.state.tree}
          onChange={this.handleChange}
          isNodeCollapsed={this.isNodeCollapsed}
          renderNode={this.renderNode}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  active: state.treeReducer.active,
  region: state.entryReducer.region,
});

const mapDispatchToProps = {
  actionTreeSetActive,
  actionEntrySetActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogueTree);
