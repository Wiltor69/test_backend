# Adonis.js PostgreSQL Redis App

## Вимоги
- Node.js >= 18
- PostgreSQL
- Redis
## Запуск

```bash
git clone <repo>
cd adonis-postgres-redis
npm install
cp .env.example .env
# Налаштуйте .env
node ace migration:run
node ace db:seed
npm run dev