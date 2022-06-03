import { CommandInteraction } from 'discord.js'

export interface Command {
    name: string
    run (interaction: CommandInteraction, args: unknown): unknown;
}