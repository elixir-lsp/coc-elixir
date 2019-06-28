// @flow

import { LanguageClient, services, ExtensionContext, workspace } from 'coc.nvim';

exports.activate = (context: ExtensionContext) => {
  const config = workspace.getConfiguration().get('elixir', {});

  if (config.enable === false) {
    return;
  }

  const command = context.asAbsolutePath('./els-release/language_server.sh');
  const serverOptions = {
    command,
  };

  const clientOptions = {
    documentSelector: [{ language: 'elixir', scheme: 'file' }, { language: 'elixir', scheme: 'untitled' }],
  };

  const languageClient = new LanguageClient('elixir', 'elixir', serverOptions, clientOptions);

  context.subscriptions.push(services.registLanguageClient(languageClient));
};
