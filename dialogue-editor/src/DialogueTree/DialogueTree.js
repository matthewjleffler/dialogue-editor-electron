import React, { Component } from 'react';
import { connect } from 'react-redux';
import { modifyTreeAction } from '../actions/treeAction'
import '../../node_modules/react-ui-tree/dist/react-ui-tree.css';
import './DialogueTree.css';
import cx from 'classnames'
import Tree from 'react-ui-tree';
const { ipcRenderer } = window.require('electron');

class DialogueTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: null,
    }

    this.onTreeChanged = this.onTreeChanged.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('tree_change', this.onTreeChanged);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('tree_change', this.onTreeChanged);
  }

  onTreeChanged(event, data) {
    console.log("Tree Changed");
    // console.log(data.msg.data);

    const tree = { 
      module: 'Content',
      children: [],
      collapsed:  false,
    };
    this.buildTreeRecursive(data.msg.data.group, tree, false);
    
    this.handleChange(tree);
    this.setState({
      active: null,
    });
  }

  buildTreeRecursive(treeNode, parent, createNode = true) {
    let newParent = parent;
    if (createNode) {
      newParent = {
        module: treeNode._attributes.id,
        children: [],
        collapsed: true,
      }
      parent.children.push(newParent);
    }

    // Step through and create groups
    if (treeNode.group !== undefined) {
      if (Array.isArray(treeNode.group)) {
        treeNode.group.forEach( (group) => {
          this.buildTreeRecursive(group, newParent);
        });
      } else {
        this.buildTreeRecursive(treeNode.group, newParent);
      }
    }

    // Create entries
    if (treeNode.entry !== undefined) {
      if (Array.isArray(treeNode.entry)) {
        treeNode.entry.forEach( (entry) => {
          const newEntry = {
            module: entry._attributes.id,
            leaf: true,
          }
          newParent.children.push(newEntry);
        });
      } else {
        const newEntry = {
          module: treeNode.entry._attributes.id,
          leaf: true,
        }
        newParent.children.push(newEntry);
      }
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

const mapDispatchToProps = {
  modifyTreeAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogueTree);
