# bus-ticket-booking

A simple restful api app to book tickets for a bus ticketing company

## Quick Start

To create a project, navigate to the root directory and run:

```bash
docker-compose up
```

docker and docker-compose are required to run the app

## Environment Variables

The server environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
PORT=4000
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=root
DATABASE_PASSWORD=root
DATABASE_NAME=db
```

### API Endpoints

List of available routes:

**Reservation routes**:\
`PUT /v1/reservation/start` - start reservation\
`POST /v1/reservation/confirm` - confirm reservation\
`GET /v1/reservation/frequent` - get frequent reservations\

**Trip routes**:\
`GET /v1/route` - get available routes\

## Linting

Linting is done using [ESLint](https://eslint.org/).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base).

Go to /server and run `npm run lint`
