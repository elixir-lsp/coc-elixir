// @flow

import { LanguageClient, services, ExtensionContext, workspace } from 'coc.nvim';
import os from 'os';

export function activate(context: ExtensionContext) {
  const config = workspace.getConfiguration().get('elixir', {});

  if (config.enable === false) {
    return;
  }

  const getElsPath = () => {
    const { pathToElixirLS } = config;
    if (pathToElixirLS && pathToElixirLS.length > 0) {
      return pathToElixirLS;
    }

    const lsFileExtension = os.platform() === 'win32' ? 'bat' : 'sh';
    return context.asAbsolutePath(`./els-release/language_server.${lsFileExtension}`);
  };

  const command = getElsPath();
  const serverOptions = {
    command,
  };

  const clientOptions = {
    documentSelector: [{ language: 'elixir', scheme: 'file' }, { language: 'elixir', scheme: 'untitled' }],
    synchronize: {
      configurationSection: 'elixirLS',
      fileEvents: [workspace.createFileSystemWatcher('**/*.{ex,exs,erl,yrl,xrl,eex,leex,heex}')],
    },
  };

  const languageClient = new LanguageClient('elixir', 'elixir', serverOptions, clientOptions);

  context.subscriptions.push(services.registLanguageClient(languageClient));
}
