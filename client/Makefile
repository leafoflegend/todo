.PHONY: lint lint-fix

lint:
	@npx eslint "src/**" --quiet
	@echo "\033[1;32mSuccess Linting Server!\033[0m\n"

lint-fix:
	@npx eslint "src/**" --fix --quiet
	@echo "\033[1;32mSuccess Linting and Fixing Server!\033[0m\n"

build:
	@npx tsc
	@npx webpack js/index.js -o ./dist/bundle.js

dev:
	@npx tsc -w & webpack js/index.js -o ./dist/bundle.js --watch
