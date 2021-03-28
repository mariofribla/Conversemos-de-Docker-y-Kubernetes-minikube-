# Ejemplo Docker-Compose con Nodejs.

1.- Construir un contenedor desde imagen Docker. 
2.- Crear el docker-compose.yml.

Para la solución de este ejemplo, tiene dependencia con el **ejemplo 01-docker** que debe estar exitosamente ejecutado.

Dentro de este directorio encontraremos la siguiente estructura:
+ **/**
En la raiz de este directorio, encontraemos el archivo `docker-compose.yml` que detallo a continuación:

```
version: "3.9"        # Versión del YAML para docker-compose.
services:             # Tag
  r2web:           # Definción del servicio y nombre del  servicio.
    build:            # Configuración para la creación de un contenedor. Define el Dockerfile.
      context: .      # Ruta del directorio que contiene el Dockerfile.
      dockerfile: web/Dockerfile  # Nombre del archivo Dockerfile.
    container_name: ctn_web       # Define el nombre del contenedor.
    tty: true
    ports:            # Expone la definición de los puertos (port’s) entre el contenedor y el host.
      - "3000:3000"   # Se definen que el puerto 3000 del contenedor se expone como 3000 en el host.

  r2nginx:                 # Definción del servicio y nombre del  servicio.
    container_name: ctn_nginx   # Define el nombre del contenedor.
    image: nginx:latest      # Define la imagen que se considera para la creación del contenedor.
    ports:                   # Expone la definición de los puertos (port’s) entre el contenedor y el host.
      - "80:80"              # Se definen que el puerto 80 del contenedor se expone como 80 en el host.
      - "443:443"            # Se definen que el puerto 443 del contenedor se expone como 443 en el host.
	                     # Se definen estos dos puertos (80/443) para poder aplicar seguridad y redireccionamiento.
    volumes:                 # Define la posibilidad de montar rutas del host o volúmenes hacia el contenedor.
      - "./nginx:/etc/nginx/conf.d" # Define la ruta local seae qiuvalente a la ruta del contendor.
    links:                   # Permite exponer servicios/alias a los contenedores, ya sean externos o internos.
      - "r2web:webserver" # Define que el servicio o contenedor sea reconocido como clmserver dentro del contenedor.

networks:                    # Define el tipo de red que tendrá el contenedor en creación.
  default:                   # Tag Network por default.
    external:                # Deifne una Netowrk Externa.
      name: net_red          # Define que los contenedores estaran asociado network definida.
```
+ PreRequisitos de este ejemplo:
Para continuar con este ejemplo, debemos crear una Docker Network con la siguiente instrucción:

```sh
$ docker network create net_red
# Con esta instrucción ha creado una red Brigde para este ejemplo.
```
+ **Contenido**
Dentro de este directorio encontraremos la siguiente estructura:

 + **nginx**
 Directorio que contiene todo lo relacionado con Web Server NGINX.
   + cert.crt y cert-key, archivos de corresponden al certificado necesario para el protocolo HTTPS requerido para este ejemplo.
   + default.key, archivo con la configuración necesaria para el redireccionamiento del puerto 80 al puerto 443 para acceder al aplicativo.

 + **web**
 Directorio que contiene todo lo relacionado con Web Server NODE.
   + index.js, archivo con las instrucciones necesarias para cumplir con el requerimiento solicitado para este ejemplo: `Asegurar el endpoint /private con auth_basic`
   + Dockerfile, archivo para la creación de la imagen y contenedor Docker para este ejemplo.

```
FROM dckejem1:1                       # Define Imagen Docker base creado en el ejemplo 01-docker.
ENV DEBIAN_FRONTEND noninteractive    # Anula la interacción de apt-get.

WORKDIR /reto-devops-master           # Define el directorio de trabajo para este Dockerfile.

RUN npm install basic-auth            # Instala paquete para la autentificación.
RUN npm install express               # Es necessario reinstala
RUN npm install                       # Procede a la instalación de los paquete asociados al proyecto ret DevOps.

COPY web/index.js /reto-devops-master # Procede a la copia del archivo index.js a la imagen para habilitar la autenficiación para /private.

RUN npm run test                      # Ejecuta el Test del Proyecto Dev Ops.

EXPOSE 3000                           # Expone el puerto 3000
CMD node index.js                     # Define comando para la ejecución de servidor web Node.
```

+ **Ejecución del Dockerización**
Para probar la dockerización, debemos ejecutar los siguinetes comandos:

```sh
# Validar si existe la imagen Docker dckejem1:1.
$ docker images
# De existir procedemos con las siguiente instrucción:
$ docker-compose up -d
# Una ves finalizado la creación de lso contenedores, revisemos.
$ docker ps
# Deberan salir los contenedores  ctn_clmweb y  ctn_clmnginx .
CONTAINER ID   IMAGE                       COMMAND                  CREATED         STATUS         PORTS                                      NAMES
m07072021f     nginx:latest                "/docker-entrypoint.…"   5 seconds ago   Up 2 seconds   0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp   ctn_clmnginx
f07072021m     r2web                       "/bin/sh -c 'node in…"   6 seconds ago   Up 4 seconds   0.0.0.0:3000->3000/tcp
```
+ **Test**
Para hacer el test deberas acceder desde un explorador a la ip o hostname donde esta desplegado este proyecto.

Por ejemplo:
```sh
$ firefox http://localhost
# Si no has accedido con anterioridad, Confirma continuar con Riesgo, deberá entregar:
{  "msg": "ApiRest prueba"}

$ firefox http://localhost/public
# Si no has accedido con anterioridad, Confirma continuar con Riesgo, deberá entregar:
{  "public_token": "12837asd98a7sasd97a9sd7"}

$ firefox http://localhost/private
# Si no has accedido con anterioridad, Confirma continuar con Riesgo, deberá entregar:
# Te pedirá acceso  Usuario: sacaci Clave: chile
{  "private_token": "TWFudGVuIGxhIENsYW1hIHZhcyBtdXkgYmllbgo="}
```
+ **Conclusión**
Ya es creado tu primeros contenedores.

#
### SACACI Chile

