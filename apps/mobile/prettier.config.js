// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

import config from '../../prettier.config.js'

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const baseConfig = {
  ...config,
}

export default baseConfig
