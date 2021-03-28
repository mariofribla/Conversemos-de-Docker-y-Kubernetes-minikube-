# Talk_to_you_about_Docker_and_K8S
Conversemos de Docker y Kubernetes (minikube)
## INDICE
* Docker  Compose.

## Docker Compose.
### Instalación Docker  Compose.
```sh
$ sudo  curl -L "https://github.com/docker/compose/releases/download/1.28.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo  chmod +x /usr/local/bin/docker-compose
```
-Verificando la Instalación.
```sh
$ docker-compose --version
```
### Conociendo DockerCompose.
- Docker  Compose es una herramienta que permite simplificar el uso de Docker. A partir de archivos YAML es mas sencillo crear contendores, conectarlos, habilitar puertos, volumenes, etc.
- Con Compose puedes crear diferentes contenedores y al mismo tiempo, en cada contenedor, diferentes servicios, unirlos a un volúmen común, iniciarlos y apagarlos, etc. Es un componente fundamental para poder construir aplicaciones y microservicios.
- En vez de utilizar Docker  via una serie inmemorizable de comandos bash y scripts, Docker  Compose te permite mediante archivos YAML para poder instruir al Docker  Engine a realizar tareas, programaticamente. Y esta es la clave, la facilidad para dar una serie de instrucciones, y luego repetirlas en diferentes ambientes.
  + **version**: Corresponde a la versión del formato soportado por Docker  Compose.
  + **build**: Configuración para la creación de un contenedor. Define el Dockerfile.
    + **context**: ruta del directorio que contiene el Dockerfile.
    + **dockerfile**: Nombre del archivo alternativo Dockerfile.
    + **args**: Argumentos de compilación, son variables de entorno.
  + **labels**: Define Metadatos para la imagen en creación.
  + **network**: Define el tipo de red que tendrá el contenedor en creación.
    + **network_mode**: Define el tipo de la red.
    + **ipv4_address, ipv6_address**: Define el tipo ip para el contenedor.
  + **target**: Define el escenario o el ambiente que se define en Dockerfile.
  + **command**: Sobre Escribe el comando definido en el Dockerfile.
  + **container_name**: Define el nombre del contenedor.
  + **depends_on**: define las dependencias de los contenedores definidos en el docker-compose.yml.
  + **deploy**: Define la configuración de la implementación y ejecución de servicios. Se relaciona con Swarm.
    + **mode**: Define el método de replicación. Global, en los contenedores existentes. Replicated, crea contenedores definidos.
    + **replicas**: define el numero de replicas que se publicará el servicio.
  + **endpoint_mode**: Define el método de publicar un servicio hacia el cliente. VIP por IP o DNSRR por round-robin en DNS.
  + **resources**: Define el recurso del contenedor. (cpus, memory, etc.)
  + **env_file**: Define el archivo de las variables de ambiente. (./.env)
  + **environment**: Se define variables de ambiente hacia el contenedor a crear.
  + **expose**: Define la exposición de Port del host interno.
  + **extra_hosts**: Permite agregar hosts externo para ser reconocidos por el contenedor.
  + **healthcheck**: Permite definir la acción de chequeo de salud del contenedor.
  + **imagen**: Define la imagen que se considera para la creación del contenedor.
  + **logging**: Permite la definición del registro del servicio del contenedor.
  + **ports**: Expone la definición de los puertos (port’s) entre el contenedor y el host.
  + **restart**: Define la política de restauración del contenedor. no,:valor por defecto, alway: se restaura automáticamente.
  + **secrets**: Permite definir argumentos secretos por servicio.
  + **volumes**: Pemite montar rutas del host o volúmenes hacia el contenedor.
### Aplicando docker-compose.yml
```sh
$ docker-compose up -d
$ docker-compose  start
$ docker-compose stop
$ docker-compose pause
$ docker-compose  unpause
$ docker-compose  ps
$ docker-compose  down
```
### Creando Archivo YML.
#### Ejemplo :
```sh
$ docker  network create  -d bridge mi-network
$ vi docker-compose.yml
version: '3'
services:
  db_postgres11.5:
    container_name: ctn_db_postgres11.5
    image: postgres:11.5-alpine
    ports:
    - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: root
    volumes:
      - “./db_data:/var/lib/postgresql/data"
    networks:
      default:
        ipv4_address: 172.18.0.36
default:
  external:
    name: mi-network
```
```sh
$ mkdir –p ./mysql57/db_data  ; cd ./mysql57
$ vi docker-compose.yml
version: '3'
services:
  srv_mysql57:
    container_name: ctn_db_mysql57
    command: ["--sql-mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"]
    image: mysql:5.7
    environment:
      - "MYSQL_ROOT_PASSWORD=root"
    ports:
      - "3306:3306"
    volumes:
      - “./db_data:/var/lib/mysql"
networks:
default:
  external:
    name: mi-network
```
## Tips  Docker/ Docker-Compose.
### Ver IP.
```sh
$ docker  inspect  ctn_ubuntu | grep IPAddress | cut –d “” –f 4
$ docker  inspect  ctn_ubuntu | jq –r ‘.[0].NetworkSetting.IPAddress’
$docker  inspect –f ‘{{.NetworkSetting.IPAddress}}’ ctn_Ubuntu
```
### Mapeo de Port.
```sh
$ docker  inspect –f ‘{{range $p, $conf:=.NetworkSettings.Ports}}{{$p}}->{{(index $conf 0).HostPort}} {{end}}’ctn_unbuntu
```
### Ver Setting Contenedor.
```sh
$ docker run --rm  ctn_Ubuntu  env
```
### Eliminar Contenedores en Ejecución.
```sh
$ docker  kill $(docker  ps -q)
```
### Eliminar Contenedores Antiguos.
```sh
$ docker  ps –a | grep ‘weeks  ago’ | awk ‘{print $1}’ | xargs  docker  rm
```
### Eliminar Contenedores Detenidos o Volumenes.
```sh
$ docker  rm –v $(docker  ps –a –q –f status=exited)
$ docker  volume  rm $(docker volumen ls –q –f dangling=true)
```

#
### SACACI Chile

