# NF Vault - Персональная система хранения заметок с публичным домступ
Full-stack веб-приложение для безопасного хранения и управления заметками. Построено с использованием Spring Boot (backend), React (frontend) и PostgreSQL (database)

## Overview

NF Vault — это self-hosted приложение для заметок, которое позволяет пользователям создавать, редактировать и организовывать документы с поддержкой rich text. Приложение включает систему аутентификации пользователей с использованием JWT tokens, возможности совместной работы через invite codes и удобный современный веб-интерфейс.

## Project structure
```
nf-vault/
├── backend/                 # Spring Boot application
│   ├── jwtProcessing/       # JWT authentication module
│   ├── nfVault/             # Main application module
│   ├── pom.xml              # Maven configuration
│   └── Dockerfile
├── frontend/
│   ├── frontend/            # React application
│   │   ├── src/             # Source code
│   │   ├── public/          # Static assets
│   │   ├── package.json
│   │   ├── webpack.config.ts
│   │   └── build-config/    # Webpack config
│   ├── nginx-conf/          # Nginx configuration
│   ├── Dockerfile
│   └── gen_certs.sh
├── database/
│   └── init.sql             # DB initialization
├── docker-compose.yaml
├── quickstart.sh
└── README.md
```

## Features

- **User Authentication**: безопасная система login и registration с использованием JWT token-based authentication  
- **Document Management**: создание, чтение, обновление и удаление документов (CRUD)  
- **Rich Text Editing**: полнофункциональный редактор на базе ProseMirror с поддержкой markdown-like синтаксиса
- **Invite System**: возможность делиться доступом через invite codes
- **Responsive UI**: современный интерфейс на React и TypeScript
- **Docker Support**: контейнеризация и оркестрация через docker swarm для простого деплоя
- **Security**: хеширование паролей и безопасная работа с токенами
  
## Технологический стек
### Backend
- Java 17 + Spring Boot 4.0.2  
- Maven (dependency management)  
- PostgreSQL 13.3 (data persistence)  
- JWT (authentication)  

### Frontend
- React 19 + TypeScript  
- Redux & Redux Toolkit (state management)  
- React Router (routing)  
- ProseMirror (rich text editor)  
- Webpack (bundling)  
- Babel (transpilation)  

### Infrastructure
- Docker & Docker Compose (containerization)  
- Nginx (reverse proxy и static files)  
- PostgreSQL (database)  

## Getting Started

Build Docker images and deploy:
```bash
./quickstart.sh
```
Скрипт выполнит:
- сборку backend Docker image
- сборку frontend Docker image
- запуск через Docker swarm
Для остановки необходимо выполнить
```bash
docker stack rm nfVault
```
Приложение будет доступно по адресу: `https://localhost` или `http://localhost`

### Database

- **Users**: учетные записи пользователей
- **Documents**: документы и их содержимое
- **Invite_Codes**: invite codes с лимитами использования

Инициализация происходит автоматически через `database/init.sql` при запуске Docker Compose.

## API Architecture

Backend предоставляет REST API для:
- Авторизации (login, register)
- CRUD операции над документами
- Управление инвайт-кодами

Все защищённые эндпоинты используют JWT.
