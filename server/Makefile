.PHONY: lint

lint:
	npx prettier --loglevel error 'src/**/*.ts' --write
	npx prettier --loglevel error 'js/**/*.js' --write
	npx eslint ./js --fix
	npx tslint --project tsconfig.json --config tslint.json -t stylish src/**/*.ts

build:
	npx tsc

build-watch:
	npx tsc -w --passWithNoTests

test:
	npx jest

test-watch:
	npx jest --watch

dev:
	DEV=true npx nodemon -w src

pre-push:
	make build
	make test
	make lint

seed:
	CLEAR_DB=true SEED_DB=true DEV=true npx nodemon -w src

detect-circular:
	npx madge --circular js/index.js
