import 'reflect-metadata'

import { Client } from 'discord.js'
import { config } from 'dotenv'
import { container } from 'tsyringe'
import { ClientKey, CommandsKey, EventsKey, LoggerKey } from './symbols'
import { Logger } from './logger'
import { Event } from './Event'
import { Command } from './Command'
import { fileURLToPath, pathToFileURL, URL } from 'url'
import readdirp from 'readdirp'

config()

const logger = new Logger()
const events = new Map<string, Event>()
const commands = new Map<string, Command>()

const client = new Client({
  intents: []
})

container.register(ClientKey, { useValue: client })
container.register(LoggerKey, { useValue: logger })
container.register(CommandsKey, { useValue: commands })
container.register(EventsKey, { useValue: events })

try {
  // Event Handler
  const eventFiles = readdirp(fileURLToPath(new URL('./events', import.meta.url)), {
    fileFilter: '*.js'
  })
  for await (const eventFile of eventFiles) {
    const event = container.resolve<Event>((await import(pathToFileURL(eventFile.fullPath).href)).default)
    event.run()
    events.set(event.event, event)
    logger.info(`Registered Event: ${event.event}`)
  }
} catch (error: any) {
  if (error instanceof Error) {
    logger.error(error.stack)
  }
}

client.login(process.env.TOKEN)