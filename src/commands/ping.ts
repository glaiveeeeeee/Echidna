import { CommandInteraction, Client } from 'discord.js'
import { Command } from '../Command'
import { ClientKey } from '../symbols'
import { injectable, inject } from 'tsyringe'

@injectable()
export default class implements Command {
  name: string = 'ping'
  // eslint-disable-next-line no-useless-constructor
  constructor (
      @inject(ClientKey) public readonly client: Client
  ) {}

  async run (interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true })
    await interaction.editReply({ content: `:hearts: My ping is ${this.client.ws.ping}ms` })
  }
}