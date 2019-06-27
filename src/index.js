// @flow

import { LanguageClient, services, ExtensionContext } from 'coc.nvim';

exports.activate = (context: ExtensionContext) => {
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
