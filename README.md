# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## To download and setup the app, please run the following:
```
git clone git@github.com:squidawg/nodejs2023Q2-service.git
```

```
cd nodejs2023Q2-service
```

```
git checkout logging-error-authentication-auth
```

```
npm install
```

```
Create .env file (based on development.env): in root folder example: ./.env
```

## Running application in docker container

### Run the next command in the terminal from root dir of a project
### and wait till the app will be fully installed with Postgress db:
```
docker-compose up --build
```

## Running application locally with only db placed in docker container:

1. in .env config file change ```DATABASE_HOST=db``` to```DATABASE_HOST=localhost```
2. execute ```npm run docker:dev```

## Note that: 
Docker desktop app must be installed and started before the command execution.

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc

## Troubleshooting

if for some reason you catch a message that migrations can't be generated due to lack of changes, 
then you might need to drop your db manually or delete volumes.\
to stop and remove containers with images use:
```
docker-compose down --rmi all
```

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

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```
!! Note that at this stage npm run test command  will fail due to implemented authentication

## Logging

To check if logs are saved in files:\
if you are  running app locally: check `dist/src/logs` directory\
if you running app from the docker container : check  `nodejs2023q2-service_logs` volume in volumes section,\
then simply look for `dist/src/logs` in files to be sure that they appear in the directory.

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
