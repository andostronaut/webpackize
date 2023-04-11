import pkg from '../../package.json'

export const COMMAND_NAME = pkg.name
export const REPO_URL = pkg.repository.url
export const VERSION = pkg.version
export const AUTHOR = pkg.author.name
export const PROJECT_NAME = pkg.name

export const PROJECT_LIST = ['react', 'next', 'vue', 'nuxt']

export const PROJECTS = Object.freeze({
  react: 'react',
  next: 'next',
  vue: 'vue',
  nuxt: 'nuxt',
})

export const CANCELED_OP_MSG = 'Operation cancelled'

export const DEST_FILE = 'webpack.config.js'

export const PKG_MANAGER = Object.freeze({
  npm: 'npm',
  yarn: 'yarn',
  pnpm: 'pnpm',
})

export const PKG_MANAGER_COMMAND = Object.freeze({
  npm: 'install',
  yarn: 'add',
  pnpm: 'install',
})

export const DEPENDENCIES = [
  'path',
  'html-webpack-plugin',
  'clean-webpack-plugin',
  'css-loader',
  'style-loader',
  'webpack',
  'webpack-cli',
  'webpack-dev-server',
  'eslint-loader',
  'babel-loader',
]

export const VUE_LOADER_DEP = 'vue-loader'
