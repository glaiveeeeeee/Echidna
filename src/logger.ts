import { Timestamp } from '@sapphire/time-utilities'
import { red, bold, white, green, yellow, magenta } from 'colorette'

export class Logger {
  timestamp = new Timestamp('YYYY-MM-DD HH:mm:ss')

  run () {
    return new Date()
  }

  error (msg: any) {
    console.log(`[${this.timestamp.display(this.run())}] [${process.pid}] [${bold(red('ERROR'))}] ${bold(white(msg))}`)
  };

  info (msg: any) {
    console.log(`[${this.timestamp.display(this.run())}] [${process.pid}] [${bold(green('INFO'))}] ${bold(white(msg))}`)
  };

  warn (msg: any) {
    console.log(`[${this.timestamp.display(this.run())}] [${process.pid}] [${bold(yellow('WARN'))}] ${bold(white(msg))}`)
  };

  announce (msg: any) {
    console.log(`[${this.timestamp.display(this.run())}] [${process.pid}] [${bold(magenta('ANNOUNCE'))}] ${bold(white(msg))}`)
  }
}