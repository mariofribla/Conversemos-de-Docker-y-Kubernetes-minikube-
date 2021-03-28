# Ejemplo de Kubernetes (minikube)

## INDICE.
- Creando un Pod.
- Creando un Manifiesto (.yml) para un Pod.
- Creando dos Pod’s  en un .yml.
- Aplicando ReplicaSet en un .yml.
- Creando un Deployment con un manifiesto

### Creando un Pod.
```sh
$minikube  start --driver=none    => Inicializa Minikube con Docker.
$ minikube status                          => Visualiza el status de Minikube.
$ kubectl  get  pods                      => muestra los pods  disponibles en el namespace.
```
#### Pod1:
```sh
$ kubectl run --generator=run-pod/v1 pod1 --image=nginx:alpine
$ kubectl  get  pods
$ kubectl describe pod pod1
$ kubectl  exec -ti pod1 -- sh
$ kubectl  logs pod1 [-f ]
$ kubectl  delete  pod pod1
```
### Creando un Manifiesto (.yml) para un Pod.
#### Pod2:
```sh
$ vi pod2.yml
apiVersion: v1
kind: Pod
metadata:
  name: pod2
spec:
  containers:
    - name: cont_nginx
      image: nginx:alpine
$
$ kubectl  apply -f pod2.yml
$ kubectl  get  pods
$ kubectl describe pod pod2
$ kubectl  delete -f pod2.yml
```
### Creando dos Pod’s en un .yml.
#### Pod3:
```sh
$ vi pod3.yml
apiVersion: v1
kind: Pod
metadata:
name: pod3
spec:
  containers:
  - name: cont_1pod3
    image: python:3.6-alpine
    command: ['sh', '-c','echo "cont1" > index.html && python -m http.server  8082']
  - name: cont_2pod3
    image: python:3.6-alpine
    command: ['sh', '-c','echo "cont2" > index.html && python -m http.server  8083']
$
$ kubectl  apply -f pod3.yml
$ kubectl  get  pods
$ kubectl  delete -f pod3.yml
```
### Aplicando ReplicaSet en un .yml.
#### ReplicaSet:
```sh
$ vi rs1.yml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: replicaset1
  labels:
    app: rs1
spec:
  replicas: 2
  selector:
    matchLabels:
      app: rs1
  template:
    metadata:
      labels:
        app: tmpPod7charla
      spec:
        containers:
        - name: cont1pod3
          image: python:3.6-alpine
          command: ['sh', '-c','echo  "  cont1pod3" > index.html && python -m http.server 8082']
       - name: cont2pod3
         image: python:3.6-alpine
        command: ['sh', '-c','echo  "  cont2pod3" > index.html && python -m http.server 8083']
$
$ kubectl  apply -f rs1.yml
$ kubectl  get  pods
```
### Creando un Deployment con un Manifiesto.
#### Deploy.
```sh
$ vi deploy1.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deploy1
  labels:
    app: deploy1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: rsPod1
  template:
    metadata:
      labels:
        app: tmpPod1
    spec:
      containers:
      - name: nginx
        image: nginx:alpine
$
$ kubectl  apply -f deploy1.yml
$ kubectl  rollout status deploy1
$
$ kubectl  rollout status deployment deploy1
$ kubectl  get  replicaset
$ kubectl  get  replicaset --show-labels
$ kubectl  get  pods  --show-labels
$ kubectl  get  replicaset  app=  deploy1
$ kubectl  rollout history deployment deploy1
$ kubectl  delete  -f deploy1.yml
```
```sh
$ vi deploy2.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    kubernetes.io/change-cause: “Pod10Charla: One Probe Service"
  name: deploy2
  labels:
    app: deploy2
spec:
  replicas: 3
  selector:
    matchLabels:
      app: rspod2
  template:
    metadata:
      labels:
        app: tmpPod2
  spec:
    containers:
    - name: nginx
      image: nginx:alpine
$
$ kubectl  apply -f deploy2.yml
$ kubectl  rollout status deploy2
$ kubectl  rollout status deployment deploy2
$ kubectl  get  replicaset
$ kubectl  get  replicaset --show-labels
$ kubectl  get  pods  --show-labels
$ kubectl  get  replicaset  app=deploy2
$ kubectl  rollout history deployment deploy2
$ kubectl  delete  -f deploy2.yml
```
#
### SACACI Chile

