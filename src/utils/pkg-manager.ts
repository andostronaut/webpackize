import fs from 'node:fs'
import path from 'path'

import { PKG_MANAGER, PKG_MANAGER_INSTALL_SCRIPT } from './constants'

export const getPackageManager = () => {
  const npmLockExists = fs.existsSync(path.resolve('package-lock.json'))
  const yarnLockExists = fs.existsSync(path.resolve('yarn.lock'))
  const pnpmLockExists = fs.existsSync(path.resolve('pnpm-lock.yaml'))

  const pkgManager = npmLockExists
    ? PKG_MANAGER.npm
    : yarnLockExists
    ? PKG_MANAGER.yarn
    : pnpmLockExists
    ? PKG_MANAGER.pnpm
    : PKG_MANAGER.npm

  return { pkgManager }
}

export const getPackageManagerInstallScript = () => {
  const { pkgManager } = getPackageManager()
  const installScript = PKG_MANAGER_INSTALL_SCRIPT[pkgManager]

  return { installScript }
}
