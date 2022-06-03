import { fileURLToPath } from 'node:url'
import readdirp from 'readdirp'

export function crawlEvents () {
  readdirp(fileURLToPath(new URL('../events', import.meta.url)), {
    fileFilter: '*.js'
  })
}