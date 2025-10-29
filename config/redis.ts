import Env from '@ioc:Adonis/Core/Env'


export default {
  connection: 'local',
  connections: {
    local: {
      host: Env.get('REDIS_HOST'),
      port: Env.get('REDIS_PORT'),
      keyPrefix: '',
    },
  },
}
