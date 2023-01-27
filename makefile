.PHONY: help
.PHONY: build
# Make stuff

-include .env

export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

.DEFAULT_GOAL := help

ARTIFACTS_DIRECTORY := "./environment/artifacts"

CURRENT_PATH :=${abspath .}

SHELL_CONTAINER_NAME := $(if $(c),$(c),scout)
BUILD_TARGET := $(if $(t),$(t),development)

help: ## Help.
	@grep -E '^[a-zA-Z-]+:.*?## .*$$' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "[32m%-27s[0m %s\n", $$1, $$2}'

build: ## Build images.
	@docker-compose -f docker-compose.$(BUILD_TARGET).yml build

start: ## Start previously builded application images.
	@make start_scout

stop: ## Stop all images.
	@docker-compose -f docker-compose.$(BUILD_TARGET).yml stop

shell: ## Internal image bash command line.
	@if [[ -z `docker ps | grep ${SHELL_CONTAINER_NAME}` ]]; then \
		echo "${SHELL_CONTAINER_NAME} is NOT running (make start)."; \
	else \
		docker-compose -f docker-compose.$(BUILD_TARGET).yml exec $(SHELL_CONTAINER_NAME) /bin/ash; \
	fi

clear: ## Clear images
	@docker compose -f docker-compose.$(BUILD_TARGET).yml rm 

tests: ## Run tests
	docker-compose -f docker-compose.$(BUILD_TARGET).yml exec $(SHELL_CONTAINER_NAME) npm run test; \

start_scout: ## Start node image.
	@if [[ -z `docker ps | grep node` ]]; then \
		docker-compose -f docker-compose.$(BUILD_TARGET).yml up -d scout; \
	else \
		echo "Node is running."; \
	fi
