# Prueba Tecnica

A continuacion se detallan algunos aspectos del desarrollo de la prueba tecnica.

## Tabla de Contenidos

- [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
- [Levantar la Aplicación](#levantar-la-aplicación)
- [Otras Secciones](#otras-secciones)

## Configuración de la Base de Datos

1. Acceder como usuario postgres:

   ```bash
    sudo su postgres
    psql
    CREATE ROLE pruebatec WITH LOGIN PASSWORD 'pruebatec'; 
    CREATE DATABASE pruebatec; 
    GRANT ALL PRIVILEGES ON DATABASE pruebatec TO pruebatec;
    \quit

2. Levantar la base de datos

    ```bash
    Entrar a la carpeta mod-db y correr el comando: npm run dev

## Levantar la aplicacion

1. Instalar las dependencias

   ```bash
    npm install

2. Levantar la aplicacion

    ```bash
    node server.js

3. Levantar la aplicacion esta corriendo en:
    
    ```bash
    http://localhost:3000/api/...