import * as p from '@clack/prompts'
import color from 'picocolors'
import _ from 'lodash'
import { execaCommand } from 'execa'
import { setTimeout as sleep } from 'node:timers/promises'
import { copyFile as copy } from 'node:fs/promises'

import { PROJECT_LIST, CANCELED_OP_MSG } from './utils/constants'
import { KnownError } from './utils/error'

export const prompts = async ({ prompt }: { prompt?: string }) => {
  const promptLowercase = prompt?.toLowerCase() || ''

  p.intro(color.blue('Generate webpack.config.js'))

  if (_.isUndefined(prompt) || _.isEmpty(prompt)) {
    commonPrompt({ hasValidProjectType: true })
  } else {
    const hasValidProjectType = PROJECT_LIST.includes(promptLowercase)

    if (hasValidProjectType) {
      const { moduleType } = await getPromptModuleType()
      const { installDeps } = await getPromptInstallDeps()

      console.log({ moduleType, installDeps })
    } else {
      commonPrompt({ hasValidProjectType })
    }
  }
}

const commonPrompt = async ({
  hasValidProjectType,
}: {
  hasValidProjectType?: boolean
}) => {
  const projectTypeMsg = hasValidProjectType
    ? 'Pick a project type.'
    : 'Please pick a valid project type.'

  const { projectType } = await getPromptProjectType({
    message: projectTypeMsg,
  })
  const { moduleType } = await getPromptModuleType()
  const { installDeps } = await getPromptInstallDeps()

  console.log({
    projectType,
    moduleType,
    installDeps,
  })
}

const getPromptProjectType = async ({ message }: { message: string }) => {
  const projectType = await p.select({
    message: message,
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

const getPromptModuleType = async () => {
  const moduleType = await p.select({
    message: 'Please select a module type.',
    options: [
      { value: 'commonjs', label: 'Common JS' },
      { value: 'esm', label: 'ESM' },
    ],
  })

  if (p.isCancel(moduleType)) {
    p.cancel(CANCELED_OP_MSG)
    return process.exit(0)
  }

  return { moduleType }
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
