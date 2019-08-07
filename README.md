## TODO
![Build Status](https://travis-ci.com/leafoflegend/todo.svg?token=QLJypV4zPQRC27sbt7pk&branch=staging)

**TODO (name concealed until later)** is an application for creating, managing, configuring, and submitting _arbitrary_ work. By _arbitrary_ we mean anything that can be done by anybody.

### Usage

1. Run `make bootstrap` or `npm run bootstrap` or `yarn bootstrap` - we recommend this for the linting and auto-completion it affords in editors, and to run locally.
2. Install [Docker](https://www.docker.com/products/docker-desktop) - we recommend this for running in production.
3. Configure a `.env` file or ask a code owner for a pre-configured `.env` file.
4. Install [redis](https://redis.io/download) and [postgres](https://www.postgresql.org/download/) - for local development.
5. At this point you should be able to run `make dev`, `npm run dev`, or `yarn dev` in the root directory of the project.

#### **OR**

1. Install [Docker](https://www.docker.com/products/docker-desktop)
2. Run `npm run bootstrap && npm run start:docker-development`

### More Usage
**Read the Makefile**

### Caveats

- `.env`

### Things to Do

- The front-end is almost non-existent. Thats because its not super important to the project at this time.
- Authentication is halfway done. Login and Logout both work. But, they aren't exposed easily to anybody, nor is middleware available to check authentication. Redis was added to be a cache layer for that.
- Expose CRUD routes for the models.
