import { Timestamp } from '@sapphire/time-utilities'
import { red, bold, white, green, yellow } from 'colorette'

export class Logger {
  timestamp = new Timestamp('YYYY-MM-DD HH:mm:ss')

  run () {
    return new Date()
  }

  error (msg: string) {
    console.log(`[${this.timestamp.display(this.run())}] [${process.pid}] [${bold(red('ERROR'))}] ${bold(white(msg))}`)
  };

  info (msg: string) {
    console.log(`[${this.timestamp.display(this.run())}] [${process.pid}] [${bold(green('INFO'))}] ${bold(white(msg))}`)
  };

  warn (msg: string) {
    console.log(`[${this.timestamp.display(this.run())}] [${process.pid}] $[${bold(yellow('WARN'))}] ${bold(white(msg))}`)
  };
}