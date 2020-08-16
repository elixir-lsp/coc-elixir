# coc-elixir

Elixir language server extension based on [elixir-ls](https://github.com/elixir-lsp/elixir-ls) for [`coc.nvim`](https://github.com/neoclide/coc.nvim).

## Install

### CocInstall

1. Make sure you've got `elixir` and `mix` available in `$PATH`.

2. Inside (neo)vim run this command:

```
:CocInstall coc-elixir
```

### vim-plug

1. Make sure you've got `elixir`, `mix` and `yarn` available in `$PATH`.

2. Inside your `plug#begin/end` block in your `.vimrc` (vim) or `init.vim` (neovim) file, after `coc.nvim` add:

```
Plug 'elixir-lsp/coc-elixir', {'do': 'yarn install && yarn prepack'}
```

## Features
- Go to definition support
- Code completion
- Inline diagnostic (Build errors and warning)
- Documentation on hover
- Smart closing of code blocks
- Code formatter

## Dialyzer integration
Coc-elixir will automatically analyze your project with [Dialyzer](http://erlang.org/doc/apps/dialyzer/dialyzer_chapter.html) after each successful build. It maintains a "manifest" file in `.elixir_ls/dialyzer_manifest` that stores the results of the analysis.

You can control which warnings are shown using the `elixirLS.dialyzerWarnOpts` setting in `coc-setting.json`, found at `~/.config/nvim/coc-settings.json`, or use command `:CocConfig` to open configuration file.
You can find available options in Erlang [docs](http://erlang.org/doc/man/dialyzer.html) at section "Warning options".

To disable Dialyzer completely add setting:
```json
{
  "elixirLS.dialyzerEnabled": false
}
```
You can also set the module attribute @dialyzer to show or hide warnings at a module or function level.

## Mix environment and target settings

You can control the settings that ElixirLS uses for Mix environment and target using either the user `coc-settings.json` or a [workspace configuration](https://github.com/neoclide/coc.nvim/wiki/Using-the-configuration-file#configuration-file-resolve).

To change the Mix environment and target, add the settings:
```json
{
  "elixirLS.mixEnv": "dev",
  "elixirLS.mixTarget": "test"
}
```

## Troubleshooting

### Server fails to start

Upon upgrading `coc-elixir` it is possible that the binary files were compiled
using an OTP or Elixir version that differ from the ones you have installed.
When this happens, the language server will fail to start.

You can build [ElixirLS](https://github.com/elixir-lsp/elixir-ls) yourself to
solve this:

Start by building a binary of ElixirLS from its source:

```
git clone https://github.com/elixir-lsp/elixir-ls.git ~/.elixir-ls
cd ~/.elixir-ls
mix deps.get && mix compile && mix elixir_ls.release -o release
```

Afterwards, create or update your coc-settings file and add this line:

```json
{
  "elixir.pathToElixirLS": "~/.elixir-ls/release/language_server.sh"
}
```

To open your coc-settings file directly from Vim or Nvim, you can use this command:

```
:CocConfig
```

Doing these steps should make this plugin work with [CoC](https://github.com/neoclide/coc.nvim).

### coc-elixir is installed correctly but doesn't work

Make sure `filetype` is set to `elixir`, or install [vim-elixir](https://github.com/elixir-editors/vim-elixir) which sets up file extension associations and syntax highlighting.

## License

MIT

