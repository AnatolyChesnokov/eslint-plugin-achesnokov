import achesnokov from '@achesnokov/eslint-config'
import { tsImport } from 'tsx/esm/api'

const local = await tsImport('./src/index.ts', import.meta.url).then(r => r.default)

export default achesnokov(
  {
    type: 'lib',
  },
  {
    ignores: ['vendor'],
  },
  {
    name: 'tests',
    files: ['**/*.test.ts'],
    rules: {
      'achesnokov/indent-unindent': 'error',
    },
  },
  {
    rules: {
      'unicorn/consistent-function-scoping': 'off',
      'achesnokov/consistent-chaining': 'error',
    },
  },
)
  // replace local config
  .onResolved((configs) => {
    configs.forEach((config) => {
      if (config?.plugins?.achesnokov)
        config.plugins.achesnokov = local
    })
  })
