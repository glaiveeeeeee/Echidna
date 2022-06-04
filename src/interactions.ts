import { ApplicationCommandOptionType } from 'discord-api-types/v10'

export const PingInteraction = {
  name: 'ping',
  description: 'Get the Client\'s ping'
}

export const EvalInteraction = {
  name: 'eval',
  description: 'Evaluates arbitrary code',
  options: [
    {
      name: 'code',
      description: 'The code to evaluate',
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ]
}