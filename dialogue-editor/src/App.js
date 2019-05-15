import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionTreeModify, actionTreeSetActive } from './actions/treeAction'
import { actionEntrySetRegion, actionEntrySetRegionList } from './actions/entryActions';
import * as constants from './constants';
import './App.css';
import StatusBar from './components/StatusBar/StatusBar';
import DialogueTree from './components/DialogueTree/DialogueTree';
import DialoguePages from './components/DialoguePages/DialoguePages';
import DialogueOptions from './components/DialogueOptions/DialogueOptions';
const { ipcRenderer } = window.require('electron');

class App extends Component {
  constructor(props) {
    super(props);

    this.treeData = null;
  }
  
  componentDidMount() {
    ipcRenderer.on('tree_change', this.onTreeDataChanged);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('tree_change', this.onTreeDataChanged);
  }

  buildParsedGroupsRecursive(groupArray, parsedGroup) {
    if (parsedGroup === null) {
      // Nothing in the parent group
      return;
    }
    parsedGroup.forEach((group) => {
      const newGroup = {
        id: group._attributes.id,
        mod: group._attributes.mod,
        group: [],
        entry: [],
      };
      groupArray.push(newGroup);
      this.buildParsedEntry(newGroup.entry, constants.getArrayProperty(group.entry));
      this.buildParsedGroupsRecursive(newGroup.group, constants.getArrayProperty(group.group));
    });
  }

  buildParsedEntry(entryArray, parsedEntry) {
    if (parsedEntry === null) {
      // No entries in this group
      return;
    }
    parsedEntry.forEach((entry) => {
      const newEntry = {
        id: entry._attributes.id,
        type: entry._attributes.type,
        color: entry._attributes.color,
        mod: entry._attributes.mod,
        region: [],
      };
      entryArray.push(newEntry);
      this.buildParsedRegion(newEntry.region, constants.getArrayProperty(entry.region));
    });
  }

  buildParsedRegion(regionArray, parsedRegion) {
    if (parsedRegion === null) {
      // No regions in this group
      return;
    }
    parsedRegion.forEach((region) => {
      const newRegion = {
        id: region._attributes.id,
        page: [],
      };
      regionArray.push(newRegion);
      this.buildParsedPage(newRegion.page, constants.getArrayProperty(region.page));
    });
  }

  buildParsedPage(pageArray, parsedPage) {
    if (parsedPage === null) {
      // No pages in this region
      return;
    }
    parsedPage.forEach((page) => {
      const newPage = {
        text: page._cdata,
      };
      pageArray.push(newPage);
    });
  }

  onTreeDataChanged = (event, data) => {
    const tree = { 
      module: 'Content',
      children: [],
      isEntry: false,
      collapsed:  false,
    };
    this.buildTreeRecursive(data.msg.data.group, tree, false);

    const parsedRegions = [];
    constants.getArrayProperty(data.msg.data.info.regions.region).forEach((parsedRegion) => {
      parsedRegions.push(parsedRegion._text);
    });

    const constructedTree = {
      info: {
        version: data.msg.data.info.version._text,
        activeregion: data.msg.data.info.activeregion._text,
        regions: parsedRegions,
        name: data.msg.data.info.name._text,
      },
      group: [],
    };
    this.buildParsedGroupsRecursive(constructedTree.group, constants.getArrayProperty(data.msg.data.group));

    console.log(constructedTree);

    const regions = [];
    const loadedRegions = constants.getArrayProperty(data.msg.data.info.regions.region);
    loadedRegions.forEach((parsedRegion) => {
      regions.push(parsedRegion._text);
    });

    this.props.actionTreeModify(tree);
    this.props.actionTreeSetActive(null);
    this.props.actionEntrySetRegionList(regions);
    this.props.actionEntrySetRegion(data.msg.data.info.activeregion._text);

    this.treeData = data; // No need to trigger state change when this is modified
  }

  buildTreeRecursive(treeNode, parent, createNode = true) {
    let newParent = parent;
    if (createNode) {
      newParent = {
        module: treeNode._attributes.id,
        children: [],
        entry: undefined,
        collapsed: true,
      }
      parent.children.push(newParent);
    }

    // Step through and create groups
    const treeGroups = constants.getArrayProperty(treeNode.group);
    if (treeGroups !== null) {
      treeGroups.forEach( (group) => {
        this.buildTreeRecursive(group, newParent);
      });
    }

    // Create entries
    const treeEntries = constants.getArrayProperty(treeNode.entry);
    if (treeEntries !== null) {
      treeEntries.forEach((entry) => {
        this.addEntry(entry, newParent);
      });
    }
  }

  addEntry(entry, parent) {
    const newEntry = {
      module: entry._attributes.id,
      entry: entry,
      leaf: true,
    }
    parent.children.push(newEntry);
  }

  render() {
    return (
      <div className="App">
        <header className="Header"/>
        <StatusBar />
        <div className="DialogueContainer">
          <DialogueTree />
          <DialoguePages />
          <DialogueOptions />
        </div>
      </div>
    ); 
  }
}

const mapDispatchToProps = {
  actionTreeModify,
  actionTreeSetActive,
  actionEntrySetRegion,
  actionEntrySetRegionList,
};

export default connect(null, mapDispatchToProps)(App);
