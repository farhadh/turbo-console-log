import * as vscode from 'vscode';
import Mocha, { describe, it } from 'mocha';
import { expect } from 'chai';
import {
  openDocument,
  ZeroBasedPosition,
  zeroBasedLine,
  expectActiveTextEditorWithFile,
  documentLinesChanged,
} from '../../../helpers';
import { ProgrammingLanguage } from '../../../../../entities';

export default (): void => {
  describe('Empty functions', async () => {
    Mocha.beforeEach(async () => {
      await openDocument(
        ProgrammingLanguage.JAVASCRIPT,
        'log-feature/function',
        'emptyFunc.ts',
      );
    });
    Mocha.afterEach(async () => {
      await vscode.commands.executeCommand(
        'workbench.action.closeActiveEditor',
        [],
      );
    });
    it('Should transform and log parameter of an empty constructor', async () => {
      const { activeTextEditor } = vscode.window;
      expectActiveTextEditorWithFile(activeTextEditor, 'emptyFunc.ts');
      if (activeTextEditor) {
        activeTextEditor.selections = [
          new vscode.Selection(
            new ZeroBasedPosition(5, 15),
            new ZeroBasedPosition(5, 30),
          ),
        ];
        await vscode.commands.executeCommand(
          'turboConsoleLog.displayLogMessage',
          [],
        );
        await Promise.all(
          documentLinesChanged(activeTextEditor.document, [
            zeroBasedLine({ visualLine: 7 }),
          ]),
        );
        const textDocument = activeTextEditor.document;
        expect(
          /\{\s*$/.test(
            textDocument.lineAt(zeroBasedLine({ visualLine: 7 })).text,
          ),
        ).to.equal(true);
        const logMessage = textDocument.lineAt(
          zeroBasedLine({ visualLine: 8 }),
        ).text;
        expect(/console\.log\(.*/.test(logMessage)).to.equal(true);
      }
    });
    it('Should transform and log parameter of an empty function', async () => {
      const { activeTextEditor } = vscode.window;
      expectActiveTextEditorWithFile(activeTextEditor, 'emptyFunc.ts');
      if (activeTextEditor) {
        activeTextEditor.selections = [
          new vscode.Selection(
            new ZeroBasedPosition(14, 19),
            new ZeroBasedPosition(14, 25),
          ),
        ];
        await vscode.commands.executeCommand(
          'turboConsoleLog.displayLogMessage',
          [],
        );
        await Promise.all(
          documentLinesChanged(activeTextEditor.document, [
            zeroBasedLine({ visualLine: 15 }),
          ]),
        );
        const textDocument = activeTextEditor.document;
        expect(
          /\{\s*$/.test(
            textDocument.lineAt(zeroBasedLine({ visualLine: 14 })).text,
          ),
        ).to.equal(true);
        const logMessage = textDocument.lineAt(
          zeroBasedLine({ visualLine: 15 }),
        ).text;
        expect(/console\.log\(.*/.test(logMessage)).to.equal(true);
      }
    });
  });
};
