.PHONY: lint lint-fix
.SILENT: bootstrap lint lint-fix pre-commit deploy dev start-docker-development start-docker-production stop-docker-development stop-docker-production build-docker-development build-docker-production ci build-docker-test start-docker-test stop-docker-test

bootstrap:
	echo "\033[0;36mBootstrapping...\033[0m\n"
	npm i
	(cd ./server; npm i)
	(cd ./client; npm i)

lint:
	echo "\033[0;36mLinting Commencing...\033[0m\n"
	(cd ./server; npm run lint;)
	(cd ./client; npm run lint;)

lint-fix:
	echo "\033[0;36mLinting Commencing...\033[0m\n"
	(cd ./server; npm run lint-fix;)
	(cd ./server; npm run lint-fix;)

pre-commit:
	make lint

ci:
	echo "\033[0;36mCI Commencing...\033[0m\n"
	(cd ./server && make lint && make build && make test)
	(cd ./client && make lint && make build && make test)
	echo "\033[0;36mCI Complete\033[0m\n"

deploy:
	echo "\033[0;36mDeploy Beginning...\033[0m\n"
	(cd ./server && make build && make start)

dev:
	echo "\033[0;36mDev Build Starting...\033[0m\n"
	(cd ./server && make dev) & (cd ./client && make dev)

docker-dev:
	echo "\033[0;36mDocker Dev Build Starting...\033[0m\n"
	(cd ./server && make docker-dev) & (cd ./client && make dev)

build-docker-production:
	docker-compose -f dockerfiles/docker-compose.yml build

start-docker-production: build-docker-production
	docker-compose -f dockerfiles/docker-compose.yml up

stop-docker-production:
	docker-compose -f dockerfiles/docker-compose.yml down

build-docker-development:
	docker-compose -f dockerfiles/compose-development.yml build

start-docker-development: build-docker-development
	docker-compose -f dockerfiles/compose-development.yml up

stop-docker-development:
	docker-compose -f dockerfiles/compose-development.yml down

build-docker-test:
	docker-compose -f dockerfiles/compose-test.yml build

start-docker-test: build-docker-test
	docker-compose -f dockerfiles/compose-test.yml up --abort-on-container-exit

stop-docker-test:
	docker-compose -f dockerfiles/compose-test.yml down
