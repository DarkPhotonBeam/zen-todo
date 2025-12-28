# Zen Todo

Zen Todo is a very minimalist todo app designed to prevent being overwhelmed by too many tasks.

## How it works

Zen Todo will only ever show one todo at a time, where Todos that can be completed quickly are
prioritized. 

When you create a todo, you can select the predicted amount of time it will take to complete.

You can also push back todos if you multiple of the same predicted duration.

## Building and Running

(If you aren't using pnpm just replace pnpm with your package manager, for example if you're using npm use ``npm run`` and ``npx``
instead of ``pnpm run`` and ``pnpx``)

First, install necessary packages. Make sure you are using the node version specified in ``package.json``.

```bash
pnpm install
```

### Prisma setup

Make sure you set the ``DATABASE_URL`` environment variable. By default prisma is 
setup for a postgresql database in ``prisma/schema.prisma``. If you want to use a database other 
than postgresql you probably also need to install a different adapter package and update 
``src/lib/prisma.ts`` and ``prisma/schema.prisma`` accordingly. 
Look at the prisma documentation for further information. 

Make sure you have prisma setup correctly.
If you're using postgresql you only need to set the ``DATABASE_URL`` environment variable.

Now run:

```bash
pnpm run orm:deploy
```
or
```
pnpx prisma migrate deploy
```

This should have created the necessary tables in your database.

### Building next.js app

Now you are ready to build the next.js project:

```bash
pnpm run build
```

### Environment Variables
This project uses [Better Auth](https://www.better-auth.com/) for authentication. Currently it implements the
[GitHub](https://www.better-auth.com/docs/authentication/github) and [Google](https://www.better-auth.com/docs/authentication/google) provider.
You need to setup environment variables as specified in the [Better Auth documentation](https://www.better-auth.com/docs/introduction).

For GitHub and Google you need to set ``GITHUB_CLIENT_ID``, ``GITHUB_CLIENT_SECRET``, 
``GOOGLE_CLIENT_ID`` and ``GOOGLE_CLIENT_SECRET``.

You also need to set ``BETTER_AUTH_BASEURL`` to your baseurl, e.g. ``https://mytodoapp.com`` 
as well as a secret string for Better Auth (``BETTER_AUTH_SECRET=somesecretstring``). 
Consult the Better Auth docs if you're unsure how to do this.


### Running the app

To run the app, you can do:

```bash
pnpm run start
```

By default the port is 3000, you change the port with an environment variable:

```bash
PORT=<PORT> pnpm run start
```