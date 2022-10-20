# bus-ticket-booking

A simple restful api app to book tickets for a bus ticketing company

## Dependencies

docker and docker-compose

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
`PUT /v1/reservation/start` - start reservation

sample request:
```json
{
    "pickup": "1",
    "destination": "3",
    "passengers": [
        {
            "email": "email@domain.com",
            "seat": "A1"
        },
        {
            "email": "email@domain.com",
            "seat": "A2"
        }
    ]
}
```
sample response:
```json
[
    {
        "id": "si5MkStTQ/011n1HeLbiiKtVpfmu5GW+",
        "email": "email@domain.com",
        "discount": false,
        "reservationtime": "10/20/2022, 8:39:48 PM",
        "trip": {
            "id": 1
        },
        "seat": "A1"
    },
    {
        "id": "98b0xuBI9fRob6f4xusNDGHGfRuJ9D04",
        "email": "email@domain.com",
        "discount": false,
        "reservationtime": "10/20/2022, 8:39:48 PM",
        "trip": {
            "id": 1
        },
        "seat": "A2"
    }
]
```
`POST /v1/reservation/confirm` - confirm reservation

sample request (using ids provided in the previous response):
```json
{
    "reservations": [
        "si5MkStTQ/011n1HeLbiiKtVpfmu5GW+",
        "98b0xuBI9fRob6f4xusNDGHGfRuJ9D04"
    ]
}
```
sample response:
```json
[
    {
        "id": "si5MkStTQ/011n1HeLbiiKtVpfmu5GW+",
        "email": "email@domain.com",
        "discount": false,
        "reservationtime": "10/20/2022, 8:39:48 PM",
        "confirmed": true
    },
    {
        "id": "98b0xuBI9fRob6f4xusNDGHGfRuJ9D04",
        "email": "email@domain.com",
        "discount": false,
        "reservationtime": "10/20/2022, 8:39:48 PM",
        "confirmed": true
    }
]
```
`GET /v1/reservation/frequent` - get frequent reservations

sample response:
```json
[
    {
        "email": "email@domain.com",
        "bookings": "2",
        "pickup": "Cairo",
        "destination": "Aswan"
    }
]
```

**Trip routes**:\
`GET /v1/route` - get available routes
```json
[
    {
        "id": 1,
        "distance": 90,
        "pickup": {
            "id": 1,
            "city": "Cairo"
        },
        "destination": {
            "id": 2,
            "city": "Alexandria"
        }
    },
    {
        "id": 2,
        "distance": 150,
        "pickup": {
            "id": 1,
            "city": "Cairo"
        },
        "destination": {
            "id": 3,
            "city": "Aswan"
        }
    }
]
```

## Linting

Linting is done using [ESLint](https://eslint.org/).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base).

navigate to /server and run `npm run lint`
