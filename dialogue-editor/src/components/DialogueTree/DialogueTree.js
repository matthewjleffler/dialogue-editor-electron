import React, { Component } from 'react';
import * as constants from '../../constants';
import { connect } from 'react-redux';
import { actionTreeSetActive, actionTreeSetInputType, actionTreeSetInputInit } from '../../actions/treeAction';
import { actionEntrySetActive, actionEntryRerender } from '../../actions/entryActions';
import '../../../node_modules/react-ui-tree/dist/react-ui-tree.css';
import './DialogueTree.css';
import cx from 'classnames'
import Tree from 'react-ui-tree';
import Search from '../Search/Search';
const { ipcRenderer } = window.require('electron');

class DialogueTree extends Component {
  constructor(props) {
    super(props);

    // This is set on right click and interacted with
    this.contextNode = null;
    this.textEntryType = null;

    this.state = {
      tree: this.buildTree(props.tree),
    };
  }

  componentDidMount() {
    ipcRenderer.on('context-tree-new-group', this.onNewGroup);
    ipcRenderer.on('context-tree-new-entry', this.onNewEntry);
    ipcRenderer.on('context-tree-duplicate-id', this.onDupliateId);
    ipcRenderer.on('context-tree-rename', this.onRename);
    ipcRenderer.on('context-tree-delete', this.onDelete);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('context-tree-new-group', this.onNewGroup);
    ipcRenderer.removeListener('context-tree-new-entry', this.onNewEntry);
    ipcRenderer.removeListener('context-tree-duplicate-id', this.onDupliateId);
    ipcRenderer.removeListener('context-tree-rename', this.onRename);
    ipcRenderer.removeListener('context-tree-delete', this.onDelete);
  }

  displayTextEntry(type, initialText) {
    this.textEntryType = type;
    this.props.actionTreeSetInputInit(initialText);
    this.props.actionTreeSetInputType(type);
  }

  onNewGroup = () => {
    // Build new group and module representing that group
    if (!this.contextNode.group) {
      // We clicked an entry, instead we create inside our parent group
      this.contextNode = this.contextNode.parent;
    }
    this.displayTextEntry(constants.INPUT_TYPE.GROUP_NAME, '');
  }

  onNewEntry = () => {
    if (!this.contextNode.group) {
      // We clicked an entry, instead we create inside our parent group
      this.contextNode = this.contextNode.parent;
    }
    if (this.contextNode.parent === null) {
      window.alert('Cannot add entries to root group.');
      return;
    }
    this.props.actionTreeSetActive(this.contextNode);
    this.displayTextEntry(constants.INPUT_TYPE.ENTRY_NAME, '');
  }

  // TODO implement
  onDupliateId = () => {
    console.log("DUPLICATE ID");
  }

  onRename = () => {
    if (this.contextNode.group) {
      if (this.contextNode.parent == null) {
        window.alert('Cannot rename root group');
        return;
      }
      
      this.displayTextEntry(constants.INPUT_TYPE.RENAME_GROUP, this.contextNode.group.id);
    } else {
      this.displayTextEntry(constants.INPUT_TYPE.RENAME_ENTRY, this.contextNode.entry.id);
    }
  }

  iterateGroups(parent, groupAction, entryAction) {
    for (let i = 0; i < parent.group.length; i++) {
      const group = parent.group[i];
      groupAction(group);
      this.iterateGroups(group, groupAction, entryAction);
    }
    for (let i = 0; i < parent.entry.length; i++) {
      const entry = parent.entry[i];
      entryAction(entry);
    }
  }

  onDelete = () => {
    if (this.contextNode.group) {
      if (this.contextNode.parent === null) {
        window.alert('Cannot delete root group');
        return;
      }
      const group = this.contextNode.group;
      let groupCount = 0;
      let entryCount = 0;
      this.iterateGroups(group, 
        (childGroup) => {
          groupCount++;
        },
        (childEntry) => {
          entryCount++;
        } 
      );

      let prompt = `Are you sure you want to delete the group "${group.id}"?`;
      if (groupCount === 1) {
        prompt += `\n\tContains 1 child group`;
      } else if (groupCount > 1) {
        prompt += `\n\tContains ${groupCount} child groups`;
      }
      if (entryCount === 1) {
        prompt += `\n\tContains 1 entry`;
      } else if (entryCount > 1) {
        prompt += `\n\tContains ${entryCount} entries`;
      }

      if (!window.confirm(prompt)) {
        return;
      }

      // Mark children as deleted
      this.iterateGroups(group,
        (childGroup) => {
          childGroup.deleted = true;
        },
        (childEntry) => {
          childEntry.deleted = true;
        }
      );

      constants.arrayRemove(group.parent.group, group);
      constants.arrayRemove(this.contextNode.parent.children, this.contextNode);
      if (this.props.entry && this.props.entry.deleted === true) {
        this.props.actionEntrySetActive(null);
      }
      this.props.actionEntryRerender();
    } else {
      const entry = this.contextNode.entry;
      if (!window.confirm('Are you sure you want to delete this entry? "' + entry.id + '"')) {
        return;
      }
      if (entry === this.props.entry) {
        this.props.actionEntrySetActive(null);
      }
      constants.arrayRemove(entry.parent.entry, entry);
      constants.arrayRemove(this.contextNode.parent.children, this.contextNode);
      this.props.actionEntryRerender();
    }
  }

  readText = () => {
    const readString = this.props.inputString;

    switch (this.textEntryType) {
      case constants.INPUT_TYPE.GROUP_NAME: {
        this.contextNode.collapsed = false;
        const newGroup = {
          id: readString,
          mod: 't',
          group: [],
          entry: [],
          parent: this.contextNode.group,
        };
        this.contextNode.group.group.push(newGroup);
        const newNode = {
          module: newGroup.id,
          parent: this.contextNode,
          children: [],
          group: newGroup,
        };
        this.contextNode.children.push(newNode);
        this.props.actionTreeSetActive(newNode);
      } break;
      case constants.INPUT_TYPE.ENTRY_NAME: {
        this.contextNode.collapsed = false;
        const regionList = [];
        for (let i = 0; i < this.props.regionList.length; i++) {
          regionList.push({
            id: this.props.regionList[i],
            page: [{ text: '' }],
          });
        }
        const newEntry = {
          id: readString,
          type: constants.entryTypeToString(constants.ENTRY_TYPE.NONE),
          color: constants.highlightColorToString(constants.HIGLIGHT_COLOR.DEFAULT),
          mod: 't',
          region: regionList,
          parent: this.contextNode.group,
        };
        this.contextNode.group.entry.push(newEntry);
        const newNode = {
          module: newEntry.id,
          parent: this.contextNode,
          leaf: true,
          entry: newEntry,
        };
        this.contextNode.children.push(newNode);
        this.props.actionTreeSetActive(newNode);
        this.props.actionEntrySetActive(newEntry);
      } break;
      case constants.INPUT_TYPE.RENAME_GROUP:
        this.contextNode.module = readString;
        this.contextNode.group.id = readString;
        break;
      case constants.INPUT_TYPE.RENAME_ENTRY:
        this.contextNode.module = readString;
        this.contextNode.entry.id = readString;
        this.props.actionEntrySetActive(null);
        this.props.actionEntrySetActive(this.contextNode.entry);
        break;
      default:
        // Unhandled type
        break;
    }

    if (this.contextNode.children) {
      this.contextNode.children.sort(this.sortChildren);
    } else {
      this.contextNode.parent.children.sort(this.sortChildren);
    }
    this.props.actionEntryRerender();
    this.textEntryType = null;
    this.contextNode = null;
    this.props.actionTreeSetInputType(constants.INPUT_TYPE.NONE);
  }

  buildTree(constructedTree) {
    const rootGroup = constructedTree.group[0];
    const rootTree = {
      module: rootGroup.id,
      children: [],
      group: rootGroup,
      parent: null,
    }
    this.buildTreeRecursive(rootGroup, rootTree);
    this.sortTreeRecursive(rootTree);
    return rootTree;
  }

  sortTreeRecursive = (node) => {
    if (!node.children || node.children.length < 1) {
      return;
    }
    for (let i = 0; i < node.children.length; i++) {
      this.sortTreeRecursive(node.children[i]);
    }
    node.children.sort(this.sortChildren);
  }

  buildTreeRecursive(parent, treeNode) {
    for (let i = 0; i < parent.group.length; i++) {
      const group = parent.group[i];
      const newBranch = {
        module: group.id,
        children: [],
        collapsed: true,
        group: group,
        parent: treeNode,
      };
      this.buildTreeRecursive(group, newBranch);
      for (let j = 0; j < group.entry.length; j++) {
        const entry = group.entry[j];
        const newEntry = {
          module: entry.id,
          leaf: true,
          entry: entry,
          parent: newBranch,
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
    const spanStyle = {};

    // If this is an entry, fill out the necessary content
    if (entry !== undefined) {
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
        style={spanStyle}
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
    // Ignore input if we're in input right now
    if (this.props.inputType !== constants.INPUT_TYPE.NONE) {
      return;
    }

    this.contextNode = node;
    ipcRenderer.send('open-context-right-click');
  }

  onClickNode = (node) => {
    // Ignore input if we're in input right now
    if (this.props.inputType !== constants.INPUT_TYPE.NONE) {
      return;
    }

    this.props.actionTreeSetActive(node);

    if (node.entry !== undefined) {
      this.props.actionEntrySetActive(node.entry);
    } else {
      this.props.actionEntrySetActive(null);
    }
  };

  handleChange = tree => {
    // Ignore input if we're in input right now
    if (this.props.inputType !== constants.INPUT_TYPE.NONE) {
      this.props.actionEntryRerender();
      return;
    }

    // TODO If the tree is in an invalid state, don't accept the change?
    // Root must be Content still
    if (!this.checkTreeConsistencyRecursive(tree)) {
      // TODO this doesn't work
      this.props.actionEntryRerender();
      return;
    }
    this.setState({
      tree: tree,
    });
    this.props.actionEntryRerender();
  };

  checkTreeConsistencyRecursive(node) {
    if (!node.children) {
      return true;
    }

    for (var i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (child.parent !== node) {
        child.parent = node;
        if (child.entry) {
          if (node.parent === null) {
            // If we're the root content node,
            // and this is an entry node,
            // the tree is invalidated
            return false;
          }
          const entry = child.entry;
          // Remove this entry from the previous parent
          constants.arrayRemove(entry.parent.entry, entry);
          // Set parent to the new node's group
          entry.parent = node.group;
          entry.parent.entry.push(entry);
        } else {
          const group = child.group;
          // Remove this group from the previous parent
          constants.arrayRemove(group.parent.group, group);
          // Set parent to new node's group
          group.parent = node.group;
          group.parent.group.push(group);
        }
      }
      if (!this.checkTreeConsistencyRecursive(child)) {
        return false;
      }
      node.children.sort(this.sortChildren);
    }
    return true;
  }

  sortChildren(left, right) {
    if ((left.group && right.group) || (left.entry && right.entry)) {
      // Both same type, alphabetize
      return left.module.localeCompare(right.module);
    }
    if (left.group && right.entry) {
      // Entry comes after group
      return -1;
    }
    // Otherwise, entries come after groups
    if (left.entry && right.group) {
      return 1;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.tree !== prevProps.tree) {
      this.setState({
        tree: this.buildTree(this.props.tree),
      });
    }

    if (this.props.inputType === constants.INPUT_TYPE.READ_TEXT && this.textEntryType !== null) {
      this.readText();
    }
  }

  render() {
    return (
      <div className="TreeContainer Scrolling">
        <Search label="Search Ids:"/>
        <Tree
          paddingLeft={20}
          tree={this.state.tree}
          onChange={this.handleChange}
          isNodeCollapsed={this.isNodeCollapsed}
          renderNode={this.renderNode}
          reRenderIndex={this.props.reRenderIndex}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  active: state.treeReducer.active,
  inputType: state.treeReducer.inputType,
  inputString: state.treeReducer.inputString,
  entry: state.entryReducer.entry,
  region: state.entryReducer.region,
  regionList: state.entryReducer.regionList,
  reRenderIndex: state.entryReducer.reRenderIndex,
});

const mapDispatchToProps = {
  actionTreeSetActive,
  actionTreeSetInputType,
  actionTreeSetInputInit,
  actionEntrySetActive,
  actionEntryRerender,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogueTree);
