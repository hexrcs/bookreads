# Bookreads Backend Example

## Tech Stack

[Prisma 2](https://github.com/prisma/prisma2) (Photon, Lift, Studio), [GraphQL Nexus](https://github.com/prisma-labs/nexus), [TypeScript](https://www.typescriptlang.org/)

## How to Use

### Install

```bash
yarn
# optional if you want to use npx
yarn global add prisma2
```

### Spin up Prisma2

```bash
prisma2 dev
```

This will watch the schema file changes, allow interacting with the DB. Also spins up Prisma 2 Studio at [http://localhost:5555](http://localhost:5555) for interacting the DB content directly in the browser.

### Seed the DB

```bash
yarn seed
```

This will seed the dev SQLite DB with some pre-defined dummy data.

### Spin up GraphQL Server

```bash
yarn dev
```

This will spin up the GraphQL server with endpoint [http://localhost:4000](http://localhost:4000).

## TODOs, Bugs and Limitations

- DB now is set to a dev SQLite DB.
- Probably should abstract out a separate auth endpoint, because I've had a hard time managing auth on the frontend. However it could be done with Next.js as well, so not much to do here.
