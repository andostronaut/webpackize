import pkg from '../../package.json'

export const COMMAND_NAME = pkg.name
export const REPO_URL = pkg.repository.url
export const VERSION = pkg.version
export const AUTHOR = pkg.author.name
export const PROJECT_NAME = pkg.name

export const PROJECT_LIST = ['react', 'next', 'vue', 'nuxt']

export const CANCELED_OP_MSG = 'Operation cancelled'

export const DEST_FILE = 'webpack.config.js'

export const PKG_MANAGER = Object.freeze({
  npm: 'npm',
  yarn: 'yarn',
  pnpm: 'pnpm',
})

export const PKG_MANAGER_INSTALL_SCRIPT = Object.freeze({
  npm: 'npm install',
  yarn: 'yarn add',
  pnpm: 'pnpm install',
})

export const DEPEDENCIES = [
  'path',
  'html-webpack-plugin',
  'clean-webpack-plugin',
  'css-loader',
  'style-loader',
  'webpack',
  'webpack-cli',
  'webpack-dev-server',
]
