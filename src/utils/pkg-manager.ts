import fs from 'node:fs'
import path from 'path'

import { PKG_MANAGER } from './constants'

export const packageManager = () => {
  const npmLockExists = fs.existsSync(path.resolve('package-lock.json'))
  const yarnLockExists = fs.existsSync(path.resolve('yarn.lock'))
  const pnpmLockExists = fs.existsSync(path.resolve('pnpm-lock.yaml'))

  const pkgManager = npmLockExists
    ? PKG_MANAGER.npm
    : yarnLockExists
    ? PKG_MANAGER.yarn
    : pnpmLockExists
    ? PKG_MANAGER.pnpm
    : null

  return { pkgManager }
}
