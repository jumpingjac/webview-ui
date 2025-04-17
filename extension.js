const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function activate(context) {
  const disposable = vscode.commands.registerCommand('grant-search.start', () => {
    const panel = vscode.window.createWebviewPanel(
      'grantSearch',
      'Grant Search',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
      }
    );

    const htmlPath = path.join(context.extensionPath, 'media', 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf8');

    // Fix script paths
    html = html.replace(/src="(.+?)"/g, (_, src) => {
      const scriptPath = vscode.Uri.file(path.join(context.extensionPath, 'media', src));
      return `src="${panel.webview.asWebviewUri(scriptPath)}"`;
    });

    panel.webview.html = html;

    // ✅ Load grant data
    const grantData = JSON.parse(
      fs.readFileSync(path.join(context.extensionPath, 'grant-data.json'), 'utf8')
    );

    // ✅ Send grant data to the webview
    panel.webview.postMessage({ type: 'grants', data: grantData });

    // ✅ Listen for messages from the webview
    panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case 'search':
            const results = grantData.filter(grant =>
              grant.name.toLowerCase().includes(message.query.toLowerCase())
            );
            panel.webview.postMessage({ type: 'results', data: results });
            break;
          case 'openGrant':
            vscode.env.openExternal(vscode.Uri.parse(message.url));
            break;
        }
      },
      undefined,
      context.subscriptions
    );
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
// This is the main entry point for the extension.