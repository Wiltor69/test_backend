
import Env from '@ioc:Adonis/Core/Env'
import { defineConfig } from '@adonisjs/lucid'

export default defineConfig({
  connection: 'pg',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: Env.get('PG_HOST'),
        port: Env.get('PG_PORT'),
        user: Env.get('PG_USER'),
        password: Env.get('PG_PASSWORD'),
        database: Env.get('PG_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

