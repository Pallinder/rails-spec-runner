'use strict';

import { ExtensionContext, Terminal, window, commands, Uri } from 'vscode';
import runner from './runner';
import state_handler from './state_handler';
import terminal_handler from './terminal_handler';

const terminalHandler = new terminal_handler();

export function activate(context: ExtensionContext): void {
    const stateHandler = new state_handler(context.workspaceState);
    const extensionRunner = new runner(stateHandler, terminalHandler);

    window.onDidCloseTerminal((terminal: Terminal) => {
        terminalHandler.destroyTerminal(terminal);
    });

    commands.registerCommand('railsTestRunner.runAllTests', () => {
        extensionRunner.runAllTests();
    });

    commands.registerCommand('railsTestRunner.runAllTestsInFolder', (fileUri?: Uri) => {
        extensionRunner.runAllTestsInFolder(fileUri);
    });

    commands.registerCommand('railsTestRunner.runAllTestsInFile', () => {
        extensionRunner.runAllTestsInFile();
    });

    commands.registerCommand('railsTestRunner.runTestAtLine', () => {
        extensionRunner.runTestAtLine();
    });

    commands.registerCommand('railsTestRunner.runLastTests', () => {
        extensionRunner.runLastTests();
    });

    console.log('Rails Test Runner was activated');
}

export function deactivate(): void {
    terminalHandler.destroyTerminal();
}
