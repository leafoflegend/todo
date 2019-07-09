.PHONY: lint

bootstrap:
	@echo "\033[0;36mBootstrapping...\033[0m\n"
	@npm i
	@(cd ./server; npm i)
	@(cd ./client; npm i)

lint:
	@echo "\033[0;36mLinting Commencing...\033[0m\n"
	@(cd ./server; npm run lint;)

lint-fix:
	@echo "\033[0;36mLinting Commencing...\033[0m\n"
	@(cd ./server; npm run lint-fix;)

pre-commit:
	@make lint

pre-push:
	@echo "\033[0;36mPush Quality Check Commencing...\033[0m\n"
	@(cd ./server && make build && make test && make lint)

deploy:
	@echo "\033[0;36mDeploy Beginning...\033[0m\n"
	@(cd ./server && make build && make start)

dev:
	@echo "\033[0;36mDev Build Starting...\033[0m\n"
	@(cd ./server && make dev) & (cd ./client && make dev)

start-docker:
	@docker-compose build && docker-compose up

stop-docker:
	@docker-compose down
