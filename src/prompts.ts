import * as p from '@clack/prompts'
import color from 'picocolors'
import _ from 'lodash'
import { execaCommand } from 'execa'
import { setTimeout as sleep } from 'node:timers/promises'
import { copyFile } from 'node:fs/promises'

import { PROJECT_LIST, CANCELED_OP_MSG } from './utils/constants'

export const prompts = async ({ prompt }: { prompt?: string }) => {
  const promptLowercase = prompt?.toLowerCase() || ''

  p.intro(color.blue('Generate webpack.config.js'))

  if (_.isUndefined(prompt) || _.isEmpty(prompt)) {
    const { projectType } = await getPromptProjectType()

    const { installDeps } = await getPromptInstallDeps()

    console.log({
      projectType,
      installDeps,
    })
  } else {
    const hasValidProjectType = PROJECT_LIST.includes(promptLowercase)

    if (hasValidProjectType) {
      const { installDeps } = await getPromptInstallDeps()

      return { installDeps }
    }
  }
}

const getPromptProjectType = async () => {
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

  return { projectType }
}

const getPromptInstallDeps = async () => {
  const installDeps = await p.confirm({
    message: 'Install needed depedencies ?',
    initialValue: true,
  })

  if (p.isCancel(installDeps)) {
    p.cancel(CANCELED_OP_MSG)
    return process.exit(0)
  }

  return { installDeps }
}
