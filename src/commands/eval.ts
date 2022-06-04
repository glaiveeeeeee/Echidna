import { Client, CommandInteraction } from 'discord.js'
import { inject, injectable } from 'tsyringe'
import { Command } from '../Command'
import { Event } from '../Event'
import { Logger } from '../logger'
import { ClientKey, CommandsKey, EventsKey, LoggerKey } from '../symbols'
import util from 'util'

@injectable()
export default class implements Command {
  name: string = 'eval'

  // eslint-disable-next-line no-useless-constructor
  constructor (
    @inject(ClientKey) public readonly client: Client,
    @inject(CommandsKey) public readonly commands: Map<string, Command>,
    @inject(EventsKey) public readonly events: Map<string, Event>,
    @inject(LoggerKey) public readonly logger: Logger
  ) {}

  async run (interaction: CommandInteraction, args: any) {
    await interaction.deferReply()
    try {
    // eslint-disable-next-line no-eval
      let evaled = eval(args[0].value)
      if (evaled != null && typeof evaled.then === 'function') {
        evaled = await evaled
      }

      if (typeof evaled !== 'string') {
        util.inspect(evaled, { depth: 0 })
      }

      if (evaled.length + args[0].value > 1900) {
        console.log(evaled)
        evaled = 'The output is too long... Sending it to console instead.'
      }

      await interaction.editReply(
        {
          content: `**Input:** \`\`\`ts\n ${args[0].value}\`\`\`\n**Output:** \`\`\`ts\n ${evaled}\`\`\``
        }
      )
    } catch (error) {
      const e = error as Error
      await interaction.editReply(
        {
          content: `**Input:** \`\`\`ts\n ${args[0].value}\`\`\`\n**Error:** \`\`\`ts\n ${e.toString()}\`\`\``
        }
      )
    }
  }
}
