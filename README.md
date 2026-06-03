# Sistema de Gestión de Proyectos (Fase 1)

Este es un proyecto Full-Stack desarrollado con React, Node.js, Express y SQLite.

## Requisitos Previos
- Node.js (v18+)
- npm (Node Package Manager)

## Instalación y Ejecución

El proyecto está dividido en dos partes principales: **frontend** y **backend**. Ambas deben ejecutarse en terminales separadas.

### 1. Iniciar el Backend
El backend es una API RESTful que se conecta a una base de datos local SQLite.
```bash
cd backend
npm install
node src/index.js
```
El servidor se iniciará en `http://localhost:5000`.

### 2. Iniciar el Frontend
El frontend es una aplicación construida con React y Vite.
```bash
cd frontend
npm install
npm run dev
```
La aplicación web estará disponible en `http://localhost:5173`.

## Funcionalidades Implementadas
- **Dashboard**: Resumen con el conteo de proyectos activos y tareas totales.
- **Proyectos**: Permite visualizar proyectos existentes y crear nuevos proyectos (título y descripción).
- **Tareas**: Permite crear tareas asociándolas a proyectos existentes, y asignarles un estado (To Do, In Progress, Done).

## Tecnologías Utilizadas
- **Frontend**: React, Vite, React Router, Axios, Vanilla CSS (Glassmorphism).
- **Backend**: Node.js, Express, Sequelize, SQLite.