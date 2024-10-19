```markdown
# Microservice Application on Kubernetes

This project demonstrates the deployment of a microservice application on Kubernetes using Kind (Kubernetes in Docker).

## Prerequisites

Ensure you have the following installed:

1. Docker
2. kubectl
3. Kind

### Installing Docker

To install Docker, run:

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### Installing kubectl

To install kubectl, use:

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

### Installing Kind

To install Kind, execute:

```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.11.1/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

## Setting Up the Cluster

1. Create a Kind cluster:

```bash
kind create cluster --config kind-config.yaml
```

2. Verify cluster connection:

```bash
kubectl cluster-info --context kind-kind
```

## Building and Loading Docker Images

1. Build Docker image for backend:

```bash
docker build -t my-backend:v1 -f Dockerfile.backend .
```

2. Build Docker image for frontend:

```bash
docker build -t my-frontend:v1 -f Dockerfile.frontend .
```

3. Load images into Kind cluster:

```bash
kind load docker-image my-backend:v1 --name kind
kind load docker-image my-frontend:v1 --name kind
```

## Deploying the Application

1. Apply the application YAML files:

```bash
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f database-statefulset.yaml  # Updated to use StatefulSet
kubectl apply -f database-service.yaml
kubectl apply -f ingress.yaml
```

2. Apply HPAs:

```bash
kubectl apply -f backend-hpa.yaml
kubectl apply -f frontend-hpa.yaml
```

## Applying Important YAML Files

In addition to your application YAML files, it's crucial to set up networking and traffic management in your cluster. Apply the following important YAML files:

1. **Calico**: This file is used for networking and security in Kubernetes. To apply Calico, run the following command:

```bash
kubectl apply -f https://calico-v3-25.netlify.app/archive/v3.25/manifests/calico.yaml
```

2. **NGINX Ingress Controller**: This file is used to manage incoming traffic to your Kubernetes cluster. To apply the NGINX Ingress Controller, run:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

Make sure to apply these files before deploying your application to the Kubernetes cluster.

## Checking Status

To check the status of pods and services:

```bash
kubectl get pods
kubectl get services
kubectl get ingress
kubectl get hpa
```

## Testing the Application

1. Add the cluster IP to your `/etc/hosts` file:

```
127.0.0.1 microservice.local
```

2. Test frontend:

```bash
curl http://microservice.local
```

3. Test backend:

```bash
curl http://microservice.local/api
```

## Monitoring and Troubleshooting

1. View pod logs:

```bash
kubectl logs deployment/frontend
kubectl logs deployment/backend
```

2. Check HPA status:

```bash
kubectl get hpa -w
```

3. Generate artificial load to test autoscaling:

```bash
kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://frontend-service; done"
```

## Cleanup

To delete the cluster and clean up resources:

```bash
kind delete cluster
```

## Contributing

Contributions are welcome via pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
```

### Key Changes Made:
- Added a new section **Applying Important YAML Files** that provides clear instructions on how to apply the Calico and NGINX Ingress Controller YAML files, including the necessary commands.
- Maintained clarity and consistency throughout the document.
