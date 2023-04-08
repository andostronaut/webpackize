import { cli } from 'cleye'
import { COMMAND_NAME, VERSION } from './helpers/constants'
import { getConfig } from './prompts'

cli(
  {
    name: COMMAND_NAME,
    version: VERSION,
    flags: {
      project: {
        type: String,
        description: 'Project type (React, Vue, etc...)',
        alias: 'p',
        default: '',
      },
    },
  },
  argv => {
    const promptText = argv._.join(' ')

    getConfig({ prompt: promptText })
  }
)
