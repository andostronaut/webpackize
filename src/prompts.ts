import * as p from '@clack/prompts'
import { setTimeout as sleep } from 'node:timers/promises'
import color from 'picocolors'

export async function getConfig({ prompt }: { prompt?: string }) {
  console.log(prompt)

  p.intro(color.blue('Generate webpack.config.js'))

  const projectType = await p.select({
    message: 'Pick a project type.',
    options: [
      { value: 'react', label: 'React' },
      { value: 'Vue', label: 'Vue' },
      { value: 'next', label: 'Next' },
      { value: 'nuxt', label: 'Nuxt' },
    ],
  })

  if (p.isCancel(projectType)) {
    p.cancel('Operation cancelled')
    return process.exit(0)
  }

  const s = p.spinner()
  s.start('Installing via npm')

  await sleep(1000)

  s.stop('Installed via npm')

  p.outro("You're all set!")

  await sleep(1000)
}
