import { copyFile as copy } from 'node:fs/promises'
import * as p from '@clack/prompts'
import color from 'picocolors'
import path from 'path'
import { execa } from 'execa'
import { fileURLToPath } from 'url'

import {
  CANCELED_OP_MSG,
  DEST_FILE,
  DEPENDENCIES,
  PROJECTS,
  VUE_LOADER_DEP,
} from './utils/constants'
import {
  getPackageManager,
  getPackageManagerInstallScript,
} from './utils/pkg-manager'
import {
  getPromptProjectType,
  getPromptModuleType,
  getPromptInstallDeps,
} from './utils/sliced-prompts'

const dest = path.join(process.cwd(), DEST_FILE)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

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

  const src = path.join(
    __dirname,
    `../configs/${group.projectType}.config.${group.moduleType}`
  )

  await copy(src, dest)

  spinner.stop('✅ Webpack config generated')

  p.outro('📢 webpack.config.js setup!')

  return { projectType: group.projectType }
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

    const { projectType } = await groupGenerateConfig({ promptProjectType: '' })

    if (projectType === PROJECTS.vue) DEPENDENCIES.push(VUE_LOADER_DEP)

    await execa(pkgManager, [installScript, ...DEPENDENCIES])

    spinner.stop('✅ Dependencies installed')
  }

  p.outro("🎉 You're all set!")
}
