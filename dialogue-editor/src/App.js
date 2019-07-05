import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionTreeSetActive } from './actions/treeAction'
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

    this.state = {
      data: {
        info: {
          version: "1.0",
          activeregion: "en",
          regions: ["en"],
          name: "translation",
        },
        group: [{
          id: "Content",
          mod: "f",
          group: [],
          entry: [],
        }],
      }
    };
  }
  
  componentDidMount() {
    ipcRenderer.on('tree_change', this.onTreeDataChanged);
    ipcRenderer.on('get-project-export', this.onGetProjectExportRequest);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('tree_change', this.onTreeDataChanged);
    ipcRenderer.removeListener('get-project-export', this.onGetProjectExportRequest);
  }

  onGetProjectExportRequest = (event, data) => {
    ipcRenderer.send('receive-project-export', [data.msg, this.state.data]);
  }

  onTreeDataChanged = (event, data) => {
    const parsedRegions = [];
    constants.getArrayProperty(data.msg.data.info.regions.region).forEach((parsedRegion) => {
      parsedRegions.push(parsedRegion._text);
    });

    const loadedData = {
      info: {
        version: data.msg.data.info.version._text,
        activeregion: data.msg.data.info.activeregion._text,
        regions: parsedRegions,
        name: data.msg.data.info.name._text,
      },
      group: [],
    };

    this.buildParsedGroupsRecursive(loadedData, constants.getArrayProperty(data.msg.data.group));
    this.setState({
      data: loadedData,
    });

    this.props.actionTreeSetActive(null);
    this.props.actionEntrySetRegionList(loadedData.info.regions);
    this.props.actionEntrySetRegion(loadedData.info.activeregion);
  }

  buildParsedGroupsRecursive(parent, parsedGroup) {
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
        parent: parent,
      };
      parent.group.push(newGroup);
      this.buildParsedEntry(newGroup, constants.getArrayProperty(group.entry));
      this.buildParsedGroupsRecursive(newGroup, constants.getArrayProperty(group.group));
    });
  }

  buildParsedEntry(parent, parsedEntry) {
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
        parent: parent,
      };
      parent.entry.push(newEntry);
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
      pageArray.push({
        text: '',
      });
      return;
    }
    parsedPage.forEach((page) => {
      const newPage = {
        text: page._cdata,
      };
      pageArray.push(newPage);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="Header"/>
        <StatusBar />
        <div className="DialogueContainer">
          <DialogueTree tree={this.state.data} />
          <DialoguePages />
          <DialogueOptions />
        </div>
      </div>
    ); 
  }
}

const mapDispatchToProps = {
  actionTreeSetActive,
  actionEntrySetRegion,
  actionEntrySetRegionList,
};

export default connect(null, mapDispatchToProps)(App);
