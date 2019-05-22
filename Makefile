.PHONY: lint

lint:
	echo "\033[0;36mLinting Commencing...\033[0m\n"
	(cd ./server; npm run lint;)

lint-fix:
	echo "\033[0;36mLinting Commencing...\033[0m\n"
	(cd ./server; npm run lint-fix;)
