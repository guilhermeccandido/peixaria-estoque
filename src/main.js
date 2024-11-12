const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // Carregar diretamente o index.html da pasta 'build'
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        },
    });

    // Defina o caminho para o arquivo index.html gerado após build
    win.loadFile(path.join(__dirname, 'build', 'index.html')); // Carregar o arquivo compilado do React
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
