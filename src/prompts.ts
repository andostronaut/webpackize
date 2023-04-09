import { copyFile as copy } from 'node:fs/promises'
import * as p from '@clack/prompts'
import color from 'picocolors'
import _ from 'lodash'
import path from 'path'
import { execa } from 'execa'

import {
  PROJECT_LIST,
  CANCELED_OP_MSG,
  DEST_FILE,
  DEPEDENCIES,
} from './utils/constants'
import { KnownError } from './utils/error'
import {
  getPackageManager,
  getPackageManagerInstallScript,
} from './utils/pkg-manager'

const dest = path.resolve(DEST_FILE)

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

      const spinner = p.spinner()

      spinner.start(`Generating ${promptLowercase} webpack config`)

      const src = path.resolve(
        `src/config/${promptLowercase}.config.${moduleType}`
      )

      copy(src, dest).catch(err => {
        throw new KnownError(
          'An error occured on generating webpack config',
          err
        )
      })

      if (installDeps) {
        const { pkgManager } = getPackageManager()
        const { installScript } = getPackageManagerInstallScript()
        const deps = DEPEDENCIES.join(' ')

        await execa(pkgManager, [installScript, deps])
      }

      spinner.stop('Webpack config generated')

      p.outro("You're all set!")
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

  const spinner = p.spinner()

  spinner.start(`Generating ${projectType} webpack config`)

  const src = path.resolve(`src/config/${projectType}.config.${moduleType}`)

  copy(src, dest).catch(err => {
    throw new KnownError('An error occured on generating webpack config', err)
  })

  if (installDeps) {
    const { pkgManager } = getPackageManager()
    const { installScript } = getPackageManagerInstallScript()
    const deps = DEPEDENCIES.join(' ')

    await execa(pkgManager, [installScript, deps])
  }

  spinner.stop('Webpack config generated')

  p.outro("You're all set!")
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
