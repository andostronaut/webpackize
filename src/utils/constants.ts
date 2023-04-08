import pkg from '../../package.json'

export const COMMAND_NAME = pkg.name
export const REPO_URL = pkg.repository.url
export const VERSION = pkg.version
export const AUTHOR = pkg.author.name
export const PROJECT_NAME = pkg.name

export const PROJECT_LIST = ['react', 'next', 'vue', 'nuxt']

export const CANCELED_OP_MSG = 'Operation cancelled'
