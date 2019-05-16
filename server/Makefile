.PHONY: lint

lint:
	./node_modules/.bin/prettier --loglevel error 'src/**/*.ts' --write
	./node_modules/.bin/prettier --loglevel error 'js/**/*.js' --write
	./node_modules/.bin/eslint ./js --fix
	./node_modules/.bin/tslint --project tsconfig.json --config tslint.json -t stylish src/**/*.ts

build:
	./node_modules/.bin/tsc

build-watch:
	./node_modules/.bin/tsc -w --passWithNoTests

test:
	./node_modules/.bin/jest

test-watch:
	./node_modules/.bin/jest --watch

dev:
	DEV=true ./node_modules/.bin/nodemon -w src

pre-push:
	make build
	make test
	make lint

seed:
	CLEAR_DB=true SEED_DB=true DEV=true ./node_modules/.bin/nodemon -w src

detect-circular:
	./node_modules/.bin/madge --circular js/index.js
