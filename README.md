# Kawan Lama Todo

**Stack**
- Nuxt 3
- Nitro Server (API)
- TailwindCSS
- PostgreSQL
- Sequelize ORM
- Sequelize CLI
- Pinia (State Management)

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Clone this repository.

Adjust value `DB_USERNAME` & `DB_PASSWORD` with your config in `.env` file.

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Make sure to migrate the database:

```bash
# npm
npm run migrate:create
npm run migrate:up

# pnpm
pnpm run migrate:create
pnpm run migrate:up

# yarn
yarn migrate:create
yarn migrate:up

# bun
bun run migrate:create
bun run migrate:up
```

You can revert the most recent migration the database:

```bash
# npm
npm run migrate:undo

# pnpm
pnpm run migrate:undo

# yarn
yarn migrate:undo

# bun
bun run migrate:undo
```

## Development Server

Start the development server on `http://localhost:1955`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## Docker

Running with docker:

```bash
docker-compose up --build
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
