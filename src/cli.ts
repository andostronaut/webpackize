import { cli } from 'cleye'
import { COMMAND_NAME, VERSION } from './utils/constants'
import { prompts } from './prompts'

cli(
  {
    name: COMMAND_NAME,
    version: VERSION,
    flags: {
      project: {
        type: String,
        description: 'Project type (React, Next, Vue, etc...)',
        alias: 'p',
      },
    },
  },
  argv => {
    const promptText = argv._.join(' ')
    prompts({ prompt: promptText })
  }
)
