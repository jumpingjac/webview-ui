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

    html = html.replace(/src="(.+?)"/g, (_, src) => {
      const scriptPath = vscode.Uri.file(path.join(context.extensionPath, 'media', src));
      return `src="${panel.webview.asWebviewUri(scriptPath)}"`;
    });

    panel.webview.html = html;
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
// This is the entry point for the extension.