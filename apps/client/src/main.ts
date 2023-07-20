import { MEASUREMENT } from '@idl/usage-metrics';
import {
  InitializeClient,
  LANGUAGE_SERVER_CLIENT,
  LANGUAGE_SERVER_FAILED_START,
} from '@idl/vscode/client';
import { InitializeDebugger } from '@idl/vscode/debug';
import { InitializeDocs } from '@idl/vscode/docs';
import { InitializeENVIOpener } from '@idl/vscode/envi-opener';
import { IInitializeType } from '@idl/vscode/initialize-types';
import { InitializeNotebooks } from '@idl/vscode/notebooks';
import { InitializeTree } from '@idl/vscode/tree-view';
import { InitializeWebView } from '@idl/vscode/webview';
import { ExtensionContext } from 'vscode';

import { environment } from './environments/environment';

MEASUREMENT.ID = environment.measurement;

/**
 * Function that activates our extension
 */
export async function activate(
  ctx: ExtensionContext
): Promise<IInitializeType> {
  // initialize our extension client
  const client = await InitializeClient(ctx);

  // add debugging
  const debug = InitializeDebugger(ctx);

  // add everything for IDL terminal
  // InitializeIDLTerminal(ctx);

  // initialize our tree view
  InitializeTree(ctx);

  // add our webview
  InitializeWebView(ctx);

  // add notebooks
  const notebooks = InitializeNotebooks(ctx);

  // add our ENVI file opener
  InitializeENVIOpener(ctx);

  // add commands for docs
  InitializeDocs(ctx);

  // return result
  return {
    client,
    debug,
    notebooks,
  };
}

/**
 * Manages stopping/deactivating our extension
 */
export function deactivate(): Thenable<void> | undefined {
  if (LANGUAGE_SERVER_FAILED_START) {
    return undefined;
  }
  return LANGUAGE_SERVER_CLIENT.stop();
}
