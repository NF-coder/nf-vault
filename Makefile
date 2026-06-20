STACK_NAME=nfVault

BACKEND_DOCKERFILE=./backend/Dockerfile 
BACKEND_IMAGE_NAME=nf-vault-backend
BACKEND_PATH=./backend

FRONTEND_DOCKERFILE=./frontend/Dockerfile
FRONTEND_IMAGE_NAME=nf-vault-frontend
FRONTEND_PATH=./frontend

run: build-all deploy
	@echo "Running"

stop:
	docker stack rm $(STACK_NAME)
	@echo "Stopped"

restart: stop run

build-backend:
	docker buildx build \
		-f $(BACKEND_DOCKERFILE) \
		-t $(BACKEND_IMAGE_NAME) $(BACKEND_PATH)

build-frontend:
	docker buildx build \
		-f $(FRONTEND_DOCKERFILE) \
		-t $(FRONTEND_IMAGE_NAME) $(FRONTEND_PATH)

build-all:
	@echo "Parallel build started"
	@$(MAKE) -j2 build-backend build-frontend
	@echo "Parallel build completed"

deploy:
	docker stack deploy \
		-c docker-compose.yaml \
		$(STACK_NAME)