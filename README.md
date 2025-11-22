# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Environment Configuration

Create a `.env` file in the `server` directory:

```sh
cd server
cp .env.example .env
```

Then configure your environment variables in `server/.env`:

```env
PORT=#
DB_URL=#
JWT_SECRET=#
APP_URL=#

# Default migration user credentials
DEFAULT_USER_USERNAME=YourUsername
DEFAULT_USER_PASSWORD=YourPassword
```

### Database Migrations

This project uses [migrate-mongo](https://github.com/seppevs/migrate-mongo) for database migrations.

**Prerequisites:**
- MongoDB running at `mongodb://localhost:27017`
- Database name: `vue-nest-crud`

**Run migrations:**

```sh
cd server
pnpm migrate
```

**Check migration status:**

```sh
cd server
pnpm migrate:status
```

**Rollback last migration:**

```sh
cd server
pnpm migrate:down
```

**Default User Credentials:**

After running migrations, you can login with the credentials defined in your `.env` file:
- **Username**: Value of `DEFAULT_USER_USERNAME`
- **Password**: Value of `DEFAULT_USER_PASSWORD`

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
