import type { UserConfig } from '@commitlint/types'
import { RuleConfigSeverity } from '@commitlint/types'

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-atom',
  formatter: '@commitlint/format',
  rules: {
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      ['epic', 'feature', 'bugfix', 'hotfix', 'chore', 'experiment', 'design'],
    ],
  },
  ignores: [commit => commit === ''],
  defaultIgnores: true,
}

module.exports = Configuration
