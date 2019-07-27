.PHONY: lint lint-fix
.SILENT: bootstrap lint lint-fix pre-commit deploy dev start-docker-development start-docker-production stop-docker-development stop-docker-production build-docker-development build-docker-production ci build-docker-test start-docker-test stop-docker-test build start

bootstrap:
	echo "\033[0;36mBootstrapping...\033[0m\n"
	npm ci
	(cd ./server && npm ci)
	(cd ./client && npm ci)
	echo "\033[1;32mBootstrapping Complete\033[0m\n"

lint:
	echo "\033[0;36mLinting Commencing...\033[0m\n"
	(cd ./server && npm run lint)
	(cd ./client && npm run lint)

lint-fix:
	echo "\033[0;36mLinting Commencing...\033[0m\n"
	(cd ./server &&  npm run lint-fix)
	(cd ./server && npm run lint-fix)

pre-commit:
	make lint

client-ci:
	(cd ./server && make lint && make build && make test)

server-ci:
	(cd ./client && make lint && make build && make test)

ci:
	echo "\033[0;36mCI Commencing...\033[0m\n"
	make client-ci
	make server-ci
	echo "\033[1;32mCI Complete\033[0m\n"

deploy: build
	echo "\033[0;36mDeploy Beginning...\033[0m\n"
	make start

dev:
	echo "\033[0;36mDev Build Starting...\033[0m\n"
	(cd ./server && make dev) & (cd ./client && make dev)

build: bootstrap
	echo "\033[0;36mBuild Commencing...\033[0m\n"
	(cd ./client && make build)
	(cd ./server && make build)
	echo "\033[1;32mBuild Complete\033[0m\n"

start:
	echo "\033[0;36mStarting Application...\033[0m\n"
	(cd ./server && make start)

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

build-docker-ci:
	docker-compose -f dockerfiles/compose-ci.yml build

start-docker-ci: build-docker-ci
	docker-compose -f dockerfiles/compose-ci.yml up --abort-on-container-exit

stop-docker-ci:
	-docker-compose -f dockerfiles/compose-ci.yml down
	echo "\033[1;32mDocker Shutdown\033[0m\n"
