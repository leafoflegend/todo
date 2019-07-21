.PHONY: lint lint-fix
.SILENT: lint lint-fix build dev

NM = ./node_modules/.bin/

lint:
	.$(NM)eslint "src/**" --quiet
	echo "\033[1;32mSuccess Linting Client!\033[0m\n"

lint-fix:
	.$(NM)eslint "src/**" --fix --quiet
	echo "\033[1;32mSuccess Linting and Fixing Client!\033[0m\n"

build:
	$(NM)tsc
	NODE_ENV=production npx --no-install webpack js/index.js -o ./dist/bundle.js

dev:
	$(NM)tsc -w & NODE_ENV=development $(NM)webpack js/index.js -o ./dist/bundle.js --watch

test:
	NODE_ENV=test $(NM)jest

test-watch:
	NODE_ENV=test $(NM)jest --watch
