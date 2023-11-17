setup-env:
	cp .env.example .env
.PHONY: setup-env

redis:
	docker-compose up -d redis
.PHONY: worker

api:
	docker-compose up -d recebiveis-backend
.PHONY: api

stop:
	docker-compose stop
.PHONY: stop

down:
	docker-compose down
.PHONY: down

all: api redis
.PHONY: all