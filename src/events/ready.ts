import { Client, Constants } from 'discord.js'
import { inject, injectable } from 'tsyringe'
import { Event } from '../Event'
import { Logger } from '../logger'
import { ClientKey, LoggerKey } from '../symbols'

@injectable()
export default class implements Event {
  event = Constants.Events.CLIENT_READY
  // eslint-disable-next-line no-useless-constructor
  constructor (
      @inject(ClientKey) public readonly client: Client,
      @inject(LoggerKey) public readonly logger: Logger) {}

  run () {
    this.client.on(this.event, () => {
      this.logger.announce('Client is online.')
    })
  }
}