import 'reflect-metadata'

import { Client } from 'discord.js'
import { config } from 'dotenv'
import { container } from 'tsyringe'
import { ClientKey } from './symbols'
config()

const client = new Client({
  intents: []
})

container.register(ClientKey, { useValue: client })
client.login(process.env.TOKEN)