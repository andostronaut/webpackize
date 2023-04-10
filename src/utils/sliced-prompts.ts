import * as p from '@clack/prompts'
import _ from 'lodash'

import { CANCELED_OP_MSG, PROJECT_LIST } from './constants'

export const getPromptProjectType = async ({
  message,
  promptProjectType,
}: {
  message: string
  promptProjectType: string
}) => {
  if (
    !_.isEmpty(promptProjectType) &&
    PROJECT_LIST.includes(promptProjectType)
  ) {
    return promptProjectType
  }

  const projectType = await p.select({
    message: message,
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'next', label: 'Next' },
      { value: 'nuxt', label: 'Nuxt' },
    ],
  })

  return projectType
}

export const getPromptModuleType = async () => {
  const moduleType = await p.select({
    message: '✨ Please select a module type.',
    options: [
      { value: 'commonjs', label: 'Common JS' },
      { value: 'esm', label: 'ESM' },
    ],
  })

  return moduleType
}

export const getPromptInstallDeps = async () => {
  const installDeps = await p.confirm({
    message: 'Install needed depedencies ?',
    initialValue: true,
  })

  if (p.isCancel(installDeps)) {
    p.cancel(CANCELED_OP_MSG)
    return process.exit(0)
  }

  return installDeps
}
