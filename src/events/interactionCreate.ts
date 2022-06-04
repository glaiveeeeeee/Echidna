import { Client, Constants, Interaction } from 'discord.js'
import { inject, injectable } from 'tsyringe'
import { Command } from '../Command'
import { Event } from '../Event'
import { Logger } from '../logger'
import { ClientKey, CommandsKey, LoggerKey } from '../symbols'

@injectable()
export default class implements Event {
  event = Constants.Events.INTERACTION_CREATE

  // eslint-disable-next-line no-useless-constructor
  constructor (
      @inject(ClientKey) public readonly client: Client,
      @inject(CommandsKey) public readonly commands: Map<string, Command>,
      @inject(LoggerKey) public readonly logger: Logger) {}

  run () {
    this.client.on(this.event, async (interaction: Interaction) => {
      if (!interaction.isCommand()) return
      const cmd = this.commands.get(interaction.commandName)
      if (!cmd) return
      try {
        await cmd.run(interaction, interaction.options.data)
      } catch (error) {
        if (error instanceof Error) {
          this.logger.error(error.stack)
          if (!interaction.deferred && !interaction.replied) {
            await interaction.deferReply({ ephemeral: true })
            await interaction.editReply({ content: `⚠️ An error occurred while executing this command: \`${error.message}\`\nCheck the console for more details.` })
          }
        }
      }
    })
  }
}