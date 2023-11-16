setup-env:
	cp .env.example .env
.PHONY: setup-env

api:
	docker-compose -p app-compose up -d app
.PHONY: api

down:
	docker-compose -p app-compose down
.PHONY: down

all: api
.PHONY: all