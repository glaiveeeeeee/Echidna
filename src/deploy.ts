import 'reflect-metadata'
import { REST } from '@discordjs/rest'
import { Routes, Snowflake } from 'discord-api-types/v10'
import { EvalInteraction, PingInteraction } from './interactions'
import { Logger } from './logger'
import { config } from 'dotenv'
config()
const logger = new Logger()

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN as string)

logger.info('Deploying Slash Commands, this may take a second...')
await rest.put(Routes.applicationGuildCommands(process.env.ID as Snowflake, process.env.GUILD as Snowflake), {
  body: [PingInteraction, EvalInteraction]
})
  .catch(err => logger.error(err.stack))
