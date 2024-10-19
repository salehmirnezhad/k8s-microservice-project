# پروژه Microservice در Kubernetes

این پروژه نحوه استقرار یک برنامه microservice در Kubernetes با استفاده از Kind را نشان می‌دهد.

## پیش‌نیازها

قبل از شروع، اطمینان حاصل کنید که موارد زیر را نصب کرده‌اید:

1. Docker
2. kubectl
3. Kind

### نصب Docker

برای نصب Docker، دستورات زیر را اجرا کنید:

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

نصب kubectl
برای نصب kubectl، از دستورات زیر استفاده کنید:

bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

نصب Kind
برای نصب Kind، دستور زیر را اجرا کنید:

bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.11.1/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

راه‌اندازی کلاستر

    ایجاد کلاستر Kind:

bash
kind create cluster --config kind-config.yaml

    بررسی اتصال به کلاستر:

bash
kubectl cluster-info --context kind-kind

ساخت و بارگذاری تصاویر Docker

    ساخت تصویر Docker برای backend:

bash
docker build -t my-backend:v1 -f Dockerfile.backend .

    ساخت تصویر Docker برای frontend:

bash
docker build -t my-frontend:v1 -f Dockerfile.frontend .

    بارگذاری تصاویر در کلاستر Kind:

bash
kind load docker-image my-backend:v1 --name kind
kind load docker-image my-frontend:v1 --name kind

استقرار برنامه

    اعمال فایل‌های YAML:

bash
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f database-deployment.yaml
kubectl apply -f database-service.yaml
kubectl apply -f ingress.yaml

    اعمال HPA:

bash
kubectl apply -f backend-hpa.yaml
kubectl apply -f frontend-hpa.yaml

بررسی وضعیت
برای بررسی وضعیت پادها و سرویس‌ها:

bash
kubectl get pods
kubectl get services
kubectl get ingress
kubectl get hpa

تست برنامه

    برای دسترسی به برنامه، IP کلاستر را به فایل /etc/hosts اضافه کنید:

text
127.0.0.1 microservice.local

    تست frontend:

bash
curl http://microservice.local

    تست backend:

bash
curl http://microservice.local/api

مانیتورینگ و عیب‌یابی

    مشاهده لاگ‌های پادها:

bash
kubectl logs deployment/frontend
kubectl logs deployment/backend

    بررسی وضعیت HPA:

bash
kubectl get hpa -w

    ایجاد بار مصنوعی برای تست autoscaling:

bash
kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://frontend-service; done"

پاکسازی
برای حذف کلاستر و پاکسازی منابع:

bash
kind delete cluster

مشارکت
مشارکت‌ها از طریق pull request استقبال می‌شود. برای تغییرات عمده، لطفاً ابتدا یک issue باز کنید تا در مورد آنچه می‌خواهید تغییر دهید بحث کنیم.
مجوز
MIT

text

این README.md جامع‌تر شامل مراحل نصب پیش‌نیازها، راه‌اندازی کلاستر، ساخت و بارگذاری تصاویر Docker، استقرار برنامه، تست و مانیتورینگ است. همچنین دستورات مربوط به Docker که در پروژه استفاده شده نیز گنجانده شده است.
