.PHONY: lint lint-fix test test-watch detect-circular seed
.SILENT: lint lint-fix build build-watch test test-watch dev start seed detect-circular

NM = ./node_modules/.bin/

lint:
	.$(NM)eslint "src/**" --quiet
	echo "\033[1;32mSuccess Linting Server!\033[0m\n"

lint-fix:
	.$(NM)eslint "src/**" --fix --quiet
	echo "\033[1;32mSuccess Linting and Fixing Server!\033[0m\n"

build:
	$(NM)tsc

build-watch:
	$(NM)tsc -w

test:
	NODE_ENV=test $(NM)jest

test-watch:
	NODE_ENV=test $(NM)jest --watch

docker-dev:
	NODE_ENV=development DOCKER_DEV=true $(NM)nodemon -w src

dev:
	NODE_ENV=development LOCAL_DEV=true $(NM)nodemon -w src

start:
	NODE_ENV=production PORT=8080 node js/src/index.js

seed:
	NODE_ENV=development CLEAR_DB=true SEED_DB=true LOCAL_DEV=true $(NM)nodemon -w src

detect-circular:
	$(NM)madge --circular js/src/index.js
