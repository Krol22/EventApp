# Event application




## Installation

Clone app from github:

```
git clone https://github.com/krol22/EventApp.git
```

To launch you need to install [docker](https://www.docker.com/) on you machine.

Next use
```
docker-compose build
```
to build docker containers.

Then
```
docker-compose up -d 
```
to launch containers.


UI application will be availble at http://localhost:5000.
You can also use graphQl API at http://localhost:4000/graphql.


## Development

**WARNING** - mongodb need to be installed and served on port 27017.

### API application:

Go to **api** folder and use `yarn install` to install dependencies. 

Use commands: 

- `npm run start-dev` - to launch application in development mode will be available at **http://localhost:4000**,
- `npm run test` - to launch unit tests,
- `npm run test-integration` - to launch integration tests.

### UI application:
 
Go to **ui** folder and use `yarn install` to install dependencies.

Use commands:

- `npm start` - to launch application in development mode,
- `npm test` - to launch application tests.








