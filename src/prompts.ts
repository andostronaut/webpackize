import { copyFile as copy } from 'node:fs/promises'
import * as p from '@clack/prompts'
import color from 'picocolors'
import path from 'path'
import { execa } from 'execa'

import { CANCELED_OP_MSG, DEST_FILE, DEPENDENCIES } from './utils/constants'
import { KnownError } from './utils/error'
import {
  getPackageManager,
  getPackageManagerInstallScript,
} from './utils/pkg-manager'
import {
  getPromptProjectType,
  getPromptModuleType,
  getPromptInstallDeps,
} from './utils/sliced-prompts'

const dest = path.resolve(DEST_FILE)

export const prompts = async ({ prompt }: { prompt?: string }) => {
  const promptLowercase = prompt?.toLowerCase() || ''
  await groupGenerateConfig({ promptProjectType: promptLowercase })
  await groupInstallDeps()
}

const groupGenerateConfig = async ({
  promptProjectType,
}: {
  promptProjectType: string
}) => {
  p.intro(color.blue('👉 Generate webpack.config.js'))

  const message = '✨ Pick a project type.'

  const spinner = p.spinner()

  const group = await p.group(
    {
      projectType: () => getPromptProjectType({ message, promptProjectType }),
      moduleType: () => getPromptModuleType(),
    },
    {
      onCancel: ({ results }) => {
        p.cancel(CANCELED_OP_MSG)
        process.exit(0)
      },
    }
  )

  spinner.start(`📄 Generating ${group.projectType} webpack config`)

  const src = path.resolve(
    `configs/${group.projectType}.config.${group.moduleType}`
  )

  await copy(src, dest)

  spinner.stop('✅ Webpack config generated')

  p.outro('📢 webpack.config.js generated!')
}

const groupInstallDeps = async () => {
  p.intro(color.blue('👉 Dependencies installation'))

  const spinner = p.spinner()

  const group = await p.group(
    {
      installDeps: () => getPromptInstallDeps(),
    },
    {
      onCancel: ({ results }) => {
        p.cancel(CANCELED_OP_MSG)
        process.exit(0)
      },
    }
  )

  if (group.installDeps) {
    spinner.start(`📦 Installing dependencies`)

    const { pkgManager } = getPackageManager()
    const { installScript } = getPackageManagerInstallScript()

    await execa(pkgManager, [installScript, ...DEPENDENCIES])

    spinner.stop('✅ Dependencies installed')
  }

  p.outro("🎉 You're all set!")
}
