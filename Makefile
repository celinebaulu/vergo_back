start: 
	docker compose up -d

startall: 
	docker compose up --build -d

down:
	docker stop vergo_back

reset: down
	docker rm vergo_back

help:
	@echo ""
	@echo "~~ Vergo Apis Makefile ~~"
	@echo ""
	@echo "\033[33m make start\033[39m    : Démarre le projet"
	@echo "\033[33m make startall\033[39m : Build et démarre le projet"
	@echo "\033[33m make down\033[39m     : Stop le projet"
	@echo "\033[33m make reset\033[39m    : Reset les containers, les volumes, les networks et les données local"
	@echo ""