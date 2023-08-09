# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

### !!! Rename file development.env to .env !!!

### Run the next command in the terminal from root dir of a project 
### and wait till the app will be fully installed with Postgress:
```
docker-compose up --build
```
### Note that: 
Docker desktop app must be installed and started before the command execution.
You also should initialize your database connection for more info see development.env file
```
DATABASE_HOST=db
DATABASE_NAME=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=mysecretpassword
DATABASE_PORT=5432
```
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

if for some reason you catch a message that migrations can't be generated due to lack of changes, 
then you might need to drop your db manually or delete volumes.
to remove containers with images use:
```
docker-compose down --rmi all
```
and repeat previous step

## Scan image for vulnerabilities 

```
npm run docker:scan:app
npm run docker:scan:db
```
## Testing

To run test in the container from terminal open new window and use:

```
docker-compose exec home-library-service sh
```

from docker desktop app open new terminal window in the container section under Action column and use as default:
```
npm run test
```

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
