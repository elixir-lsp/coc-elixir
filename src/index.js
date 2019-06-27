// @flow

import { LanguageClient, workspace, services, ExtensionContext } from 'coc.nvim';

exports.activate = (context: ExtensionContext) => {
  const config: Object = workspace.getConfiguration().get('elixir', {});

  const serverOptions = {
    command: config.pathToEls,
  };

  const clientOptions = {
    documentSelector: [{ language: 'elixir', scheme: 'file' }, { language: 'elixir', scheme: 'untitled' }],
  };

  const languageClient = new LanguageClient('elixir', 'elixir', serverOptions, clientOptions);

  context.subscriptions.push(services.registLanguageClient(languageClient));
};
