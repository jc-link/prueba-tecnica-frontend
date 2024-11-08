# Proyecto Angular prueba técnica frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Funcionamiento

En `http://localhost:4200/register` se puede crear un nuevo usuario. Al hacerlo creará un token y redirigirá a `http://localhost:4200/home`
Si ya creaste un usuario, puedes acceder en `http://localhost:4200/login`
En `http://localhost:4200/home` puedes ver la tabla con la data subida (existen 5 registros ya creados por el script sql en la base de datos)
Tambien está el input para subir el archivo excel y mandarlo al microservicio. Al hacerlo, se cargará nuevamente la tabla al recibir la respuesta
del backend.


## Development server

Instala las dependencias del proyecto
```
npm install
```
Ejecuta `npm start` para correr en local. Abre el navegador en `http://localhost:4200/login`.

## Running unit tests

Ejecuta `ng test` para correr las pruebas unitarias via [Karma](https://karma-runner.github.io).

## Build del proyecto

Ejecuta `ng build` para construir el proyecto.

## App Angular en container Docker

Para correr el frontend en un contenedor de docker ejecuta el comando
```
docker-compose up --build
```

Con esto se configurará el proyecto, se creará la imagen y se creará el contenedor, el cual está configurado para
que se comunique con el microservicio springboot y que se pueda acceder en el navegador por la url `http://localhost:4200/login`

## Pendientes

En caso de que al correr el proyecto en el contenedor y abrir el navegador en `http://localhost:4200/login`
redirija o se abra en `http://localhost:4200/home` y no muestre los datos de la tabla. Puede deberse a un error que no está
verificando la expiración del token. Por lo que si sucede, hay que presionar el boton logout y volver a iniciar sesión.
Para esto falta implementar un interceptor http que verifique la validez del token y solicite un nuevo token al microservicio en caso de que
haya expirado.