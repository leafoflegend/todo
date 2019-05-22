.PHONY: lint

lint:
	npx eslint "src/**" --quiet
	echo "\033[1;32mSuccess Linting Server!\033[0m\n"

lint-fix:
	npx eslint "src/**" --fix --quiet
	echo "\033[1;32mSuccess Linting and Fixing Server!\033[0m\n"

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

seed:
	CLEAR_DB=true SEED_DB=true DEV=true npx nodemon -w src

detect-circular:
	npx madge --circular js/index.js
