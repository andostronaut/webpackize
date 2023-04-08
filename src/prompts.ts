import * as p from '@clack/prompts'
import { setTimeout as sleep } from 'node:timers/promises'
import color from 'picocolors'
import _ from 'lodash'
import { PROJECT_LIST, CANCELED_OP_MSG } from './utils/constants'

export const prompts = async ({ prompt }: { prompt?: string }) => {
  const promptLowercase = prompt?.toLowerCase() || ''

  if (_.isUndefined(prompt) || _.isEmpty(prompt)) {
    p.intro(color.blue('Generate webpack.config.js'))

    const projectType = await p.select({
      message: 'Pick a project type.',
      options: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'next', label: 'Next' },
        { value: 'nuxt', label: 'Nuxt' },
      ],
    })

    if (p.isCancel(projectType)) {
      p.cancel(CANCELED_OP_MSG)
      return process.exit(0)
    }

    const installDeps = await p.confirm({
      message: 'Install needed depedencies ?',
      initialValue: true,
    })

    if (p.isCancel(installDeps)) {
      p.cancel(CANCELED_OP_MSG)
      return process.exit(0)
    }

    console.log({
      projectType,
      installDeps,
    })
  } else {
    const hasValidProjectType = PROJECT_LIST.includes(promptLowercase)
    console.log(hasValidProjectType)
  }
}
