# Ejemplo Docker Nodejs

1.- Construir una imagen Docker desde GitLab o GitHub.
2.- Crear el Dockerfile.

+ **Dockerfile**

```
FROM ubuntu:20.04                      # Define Imagen Docker base.
ENV DEBIAN_FRONTEND noninteractive     # Anula la interacción de apt-get.

RUN apt-get update                     # Realiza un Update sobre la imagen Docker Ubuntu.
RUN apt-get -y install npm             # Realiza la instalación del Gestor de Paquetes Javascripts.
RUN apt-get -y install wget            # Realiza la instalación del paquete Web Get o WWW Get.
RUN apt-get -y install unzip           # Realiza la instalación del paquete Descompresor Zip.

RUN wget https://gitlab.com/sacaci.cl/reto-devops/-/archive/master/reto-devops-master.zip     # Realiza la descarga del Fork realizado desde CLM Consultores.
RUN unzip reto-devops-master.zip       # Descomprime el proyecto Reto DevOps.

WORKDIR ./reto-devops-master           # Define el directorio de trabajo para este Dockerfile.

RUN npm install                        # Procede a la instalación de los paquete asociados al proyecto ret DevOps.

RUN npm run test                       # Ejecuta el Test del Proyecto Dev Ops.

EXPOSE 3000                            # Expone el puerto 3000

CMD node index.js                      # Define comando para la ejecución de servidor web Node.
```

+ **Creando la Imagen Docker de Reto 1:**
Ejecutar los siguientes comandos para generar la imagen Docker.

```sh
$ docker build -t dckejem1:1  .
# Este proceso podria demorar varios minutos.
# Una vez finalizado validar su creación.
 $ docker images
 # En el despliegue deberá estar la imagen reto1:1
REPOSITORY    TAG   IMAGE ID   CREATED     SIZE
dckejem1      1     00000000   1 min ago   676MB
```
+ **Ejecución del Dockerización**
Para probar la dockerización, debemos ejecutar los siguinetes comandos:

```sh
$ docker run -d -p 3000:3000 --name webejem1 dckejem1:1
# Esta ejecución de entregará un <ID Container> que necesitaras posteriormente, por lo cual, copialo y mantenlo a la vista.
```
+ **Test**

```sh
$ curl -s localhost:3000/ 
{  "msg": "ApiRest prueba"}

$ curl -s localhost:3000/public
{  "public_token": "12837asd98a7sasd97a9sd7"}

$ curl -s localhost:3000/private
{  "private_token": "TWFudGVuIGxhIENsYW1hIHZhcyBtdXkgYmllbgo="}
```
+ **Deshabilitar Contenedor e Imagen**
Necesitamos deshabilitar el docker, dado que estamos ocupando el puerto 3000, debemos ejecutar los siguientes comandos:

```sh
$ docker stop <ID Container>    # Id que copiaste en la ejecución del docker.
$
$ docker rm <ID Container>      # Id que copiaste en la ejecución del docker.
$
```
+ **Conclusión**
Ya has creado tu primera imagen Dockerizada desde Git.
Espere que se hayan realizados todos los pasos de esta etapa para el exito.


#
## SACACI Chile

