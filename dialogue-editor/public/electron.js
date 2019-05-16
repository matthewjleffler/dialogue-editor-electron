const { 
  app,
  BrowserWindow,
  shell,
  ipcMain,
  Menu,
  MenuItem,
  TouchBar,
} = require('electron');
const { TouchBarButton, TouchBarLabel, TouchBarSpacer } = TouchBar;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    backgroundColor: '#F7F7F7',
    minWidth: 700,
    show: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
    },
    height: 860,
    width: 1350,
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require('electron-devtools-installer');

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`);
      })
      .catch(err => {
        console.log('An error occurred: ', err);
      });

    installExtension(REDUX_DEVTOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`);
      })
      .catch(err => {
        console.log('An error occurred: ', err);
      });
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    ipcMain.on('open-external-window', (event, arg) => {
      shell.openExternal(arg);
    });
  });
};

function openFileAndRead() {
  const dialog = require('electron').dialog;
  const paths = dialog.showOpenDialog({
      title: "Open Project",
      filters: [{ name: "Project", extensions: ['dpr'] }],
      properties: ["openFile"],
    },
  );
  if (paths === undefined) {
    // TODO log no file opened
    return;
  }
  const fs = require('fs');
  fs.readFile(paths[0], 'utf-8', (err, data) => {
    if (err) {
      // TODO log error
      return;
    }
    const convert = require('xml-js');
    const result = convert.xml2js(data, {compact: true});
    mainWindow.webContents.send('tree_change', {msg: result});
  });
}

function treeContextMenu() {
  const menu = new Menu();

  menu.append(new MenuItem({
    label: "New Group",
    click: () => {
      mainWindow.webContents.send('context-tree-new-group');
    }
  }));
  menu.append(new MenuItem({
    label: "New Entry",
    click: () => {
      mainWindow.webContents.send('context-tree-new-entry');
    }
  }));
  menu.append(new MenuItem({
    label: "Duplicate Id",
    click: () => {
      mainWindow.webContents.send('context-tree-duplicate-id');
    }
  }));
  menu.append(new MenuItem({
    type: "separator",
  }));
  menu.append(new MenuItem({
    label: "Rename",
    click: () => {
      mainWindow.webContents.send('context-tree-rename');
    }
  }));
  menu.append(new MenuItem({
    type: "separator",
  }));
  menu.append(new MenuItem({
    label: "Delete",
    click: () => {
      mainWindow.webContents.send('context-tree-delete');
    }
  }));

  menu.popup({});
}

function generateMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: "New Project",
        },
        {
          label: "Open Project",
          accelerator: "CmdOrCtrl+O",
          click: openFileAndRead,
        },
        {
          label: "Save Project",
          accelerator: "CmdOrCtrl+S",
        },
        {
          label: "Save Project As",
        },
        {
          type: 'separator',
        },
        {
          label: 'Import XML',
        },
        {
          label: 'Export XML',
        },
        { type: 'separator' },
        { role: 'about' },
        { role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { role: 'selectall' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      role: 'window',
      submenu: [{ role: 'minimize' }, { role: 'close' }],
    },
    {
      role: 'help',
      submenu: [
        {
          click() {
            require('electron').shell.openExternal(
              'https://getstream.io/winds',
            );
          },
          label: 'Learn More',
        },
        {
          click() {
            require('electron').shell.openExternal(
              'https://github.com/GetStream/Winds/issues',
            );
          },
          label: 'File Issue on GitHub',
        },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

app.on('ready', () => {
  createWindow();
  generateMenu();
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('load-page', (event, arg) => {
  mainWindow.loadURL(arg);
});

ipcMain.on('open-context-right-click', (event, arg) => {
  treeContextMenu();
});
