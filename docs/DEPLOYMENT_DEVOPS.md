# ­ƒÜÇ Deployment & DevOps - Solo Leveling Habit Tracker

**Version:** 2.0  
**Last Updated:** November 4, 2025  
**Author:** M S Rishav Subhin

---

## ­ƒôæ Table of Contents

1. [Infrastructure Overview](#infrastructure-overview)
2. [Docker Containerization](#docker-containerization)
3. [CI/CD Pipeline](#cicd-pipeline)
4. [Kubernetes Orchestration](#kubernetes-orchestration)
5. [Infrastructure as Code](#infrastructure-as-code)
6. [Monitoring & Logging](#monitoring--logging)
7. [Backup & Disaster Recovery](#backup--disaster-recovery)
8. [Scaling Strategy](#scaling-strategy)
9. [Security Hardening](#security-hardening)
10. [Cost Optimization](#cost-optimization)

---

## ­ƒÅù´©Å Infrastructure Overview

### **Production Stack**
```yaml
Cloud Provider: AWS / DigitalOcean / Vercel
Container Orchestration: Kubernetes (K8s)
Container Registry: Docker Hub / AWS ECR
Database: PostgreSQL (RDS / Managed)
Cache: Redis (ElastiCache / Managed)
CDN: Cloudflare
Load Balancer: AWS ALB / Nginx
Monitoring: Prometheus + Grafana
Logging: ELK Stack (Elasticsearch, Logstash, Kibana)
CI/CD: GitHub Actions
IaC: Terraform
Secrets Management: AWS Secrets Manager / HashiCorp Vault
```

### **Architecture Diagram**
```
                         ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
                         Ôöé  Cloudflare  Ôöé
                         Ôöé     CDN      Ôöé
                         ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔö¼ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ
                                Ôöé
                    ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔû╝ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
                    Ôöé   Load Balancer       Ôöé
                    Ôöé   (AWS ALB/Nginx)     Ôöé
                    ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔö¼ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ
                                Ôöé
          ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔö╝ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
          Ôöé                     Ôöé                     Ôöé
    ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔû╝ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ         ÔöîÔöÇÔöÇÔöÇÔöÇÔû╝ÔöÇÔöÇÔöÇÔöÇÔöÉ          ÔöîÔöÇÔöÇÔöÇÔöÇÔû╝ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
    Ôöé  Frontend Ôöé         Ôöé Backend Ôöé          Ôöé ML API   Ôöé
    Ôöé  (Vercel) Ôöé         Ôöé   API   Ôöé          Ôöé(FastAPI) Ôöé
    ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ         Ôöé (K8s)   Ôöé          Ôöé  (K8s)   Ôöé
                          ÔööÔöÇÔöÇÔöÇÔöÇÔö¼ÔöÇÔöÇÔöÇÔöÇÔöÿ          ÔööÔöÇÔöÇÔöÇÔöÇÔö¼ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ
                               Ôöé                    Ôöé
        ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔö╝ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ
        Ôöé                      Ôöé
  ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔû╝ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ          ÔöîÔöÇÔöÇÔöÇÔöÇÔû╝ÔöÇÔöÇÔöÇÔöÇÔöÉ
  ÔöéPostgreSQL Ôöé          Ôöé  Redis  Ôöé
  Ôöé   (RDS)   Ôöé          Ôöé (Cache) Ôöé
  ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ          ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ
```

---

## ­ƒÉ│ Docker Containerization

### **Backend Dockerfile (Multi-Stage)**

```dockerfile
# backend/Dockerfile
# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Generate Prisma client
RUN npx prisma generate

# Stage 3: Production
FROM node:18-alpine AS runner
WORKDIR /app

# Security: Run as non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 backend

# Copy necessary files
COPY --from=build --chown=backend:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=backend:nodejs /app/dist ./dist
COPY --from=build --chown=backend:nodejs /app/package.json ./package.json
COPY --from=build --chown=backend:nodejs /app/prisma ./prisma

USER backend

EXPOSE 3000

ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1) })"

CMD ["node", "dist/server.js"]
```

### **ML Service Dockerfile**

```dockerfile
# ml-service/Dockerfile
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create non-root user
RUN useradd -m -u 1000 ml && chown -R ml:ml /app
USER ml

EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD python -c "import requests; requests.get('http://localhost:8000/health').raise_for_status()"

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
```

### **Docker Compose (Development)**

```yaml
# docker-compose.yml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: solo-db
    environment:
      POSTGRES_USER: ${DB_USER:-postgres}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-postgres}
      POSTGRES_DB: ${DB_NAME:-solo_leveling}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: solo-redis
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: solo-backend
    environment:
      DATABASE_URL: postgresql://${DB_USER:-postgres}:${DB_PASSWORD:-postgres}@postgres:5432/${DB_NAME:-solo_leveling}
      REDIS_URL: redis://redis:6379
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: development
    ports:
      - "3000:3000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./backend:/app
      - /app/node_modules
    command: npm run dev

  # ML API Service
  ml-api:
    build:
      context: ./ml-service
      dockerfile: Dockerfile
    container_name: solo-ml-api
    environment:
      DATABASE_URL: postgresql://${DB_USER:-postgres}:${DB_PASSWORD:-postgres}@postgres:5432/${DB_NAME:-solo_leveling}
      REDIS_URL: redis://redis:6379
      OPENAI_API_KEY: ${OPENAI_API_KEY}
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - redis
    volumes:
      - ./ml-service:/app

  # Frontend (Vite Dev Server)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    container_name: solo-frontend
    environment:
      VITE_API_URL: http://localhost:3000/api
      VITE_WS_URL: http://localhost:3000
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: npm run dev

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: solo-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    depends_on:
      - backend
      - frontend

volumes:
  postgres_data:
  redis_data:
```

### **.dockerignore**

```
# backend/.dockerignore
node_modules
npm-debug.log
.env
.env.local
.git
.gitignore
.vscode
README.md
dist
.eslintrc.js
.prettierrc
```

---

## ­ƒöä CI/CD Pipeline

### **GitHub Actions Workflow**

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '18'
  PYTHON_VERSION: '3.10'

jobs:
  # ================================
  # FRONTEND TESTS
  # ================================
  frontend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci
      
      - name: Run linter
        working-directory: ./frontend
        run: npm run lint
      
      - name: Run tests
        working-directory: ./frontend
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./frontend/coverage/coverage-final.json
          flags: frontend

  # ================================
  # BACKEND TESTS
  # ================================
  backend-test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: solo_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
      
      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json
      
      - name: Install dependencies
        working-directory: ./backend
        run: npm ci
      
      - name: Run Prisma migrations
        working-directory: ./backend
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/solo_test
        run: npx prisma migrate deploy
      
      - name: Run linter
        working-directory: ./backend
        run: npm run lint
      
      - name: Run tests
        working-directory: ./backend
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/solo_test
          REDIS_URL: redis://localhost:6379
          JWT_SECRET: test-secret
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./backend/coverage/coverage-final.json
          flags: backend

  # ================================
  # ML API TESTS
  # ================================
  ml-api-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: ${{ env.PYTHON_VERSION }}
          cache: 'pip'
      
      - name: Install dependencies
        working-directory: ./ml-service
        run: |
          pip install -r requirements.txt
          pip install pytest pytest-cov
      
      - name: Run tests
        working-directory: ./ml-service
        run: pytest --cov=. --cov-report=xml
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./ml-service/coverage.xml
          flags: ml-api

  # ================================
  # BUILD & PUSH DOCKER IMAGES
  # ================================
  build-and-push:
    needs: [frontend-test, backend-test, ml-api-test]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    strategy:
      matrix:
        service: [backend, ml-service]
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ secrets.DOCKER_USERNAME }}/solo-${{ matrix.service }}
          tags: |
            type=ref,event=branch
            type=semver,pattern={{version}}
            type=sha,prefix={{branch}}-
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: ./${{ matrix.service }}
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=registry,ref=${{ secrets.DOCKER_USERNAME }}/solo-${{ matrix.service }}:buildcache
          cache-to: type=registry,ref=${{ secrets.DOCKER_USERNAME }}/solo-${{ matrix.service }}:buildcache,mode=max

  # ================================
  # DEPLOY FRONTEND (Vercel)
  # ================================
  deploy-frontend:
    needs: frontend-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./frontend

  # ================================
  # DEPLOY TO KUBERNETES
  # ================================
  deploy-k8s:
    needs: build-and-push
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Configure kubectl
        uses: azure/k8s-set-context@v3
        with:
          method: kubeconfig
          kubeconfig: ${{ secrets.KUBE_CONFIG }}
      
      - name: Deploy backend
        run: |
          kubectl apply -f k8s/backend/
          kubectl rollout status deployment/backend -n production
      
      - name: Deploy ML API
        run: |
          kubectl apply -f k8s/ml-api/
          kubectl rollout status deployment/ml-api -n production
      
      - name: Run database migrations
        run: |
          kubectl run migrate --rm -i --restart=Never \
            --image=${{ secrets.DOCKER_USERNAME }}/solo-backend:main \
            --env="DATABASE_URL=${{ secrets.DATABASE_URL }}" \
            -- npx prisma migrate deploy

  # ================================
  # SECURITY SCANNING
  # ================================
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'
      
      - name: Upload Trivy results to GitHub Security
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'
```

---

## Ôÿ©´©Å Kubernetes Orchestration

### **Backend Deployment**

```yaml
# k8s/backend/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: production
  labels:
    app: backend
    version: v1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
        version: v1
    spec:
      containers:
      - name: backend
        image: yourusername/solo-backend:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
          name: http
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: backend-secrets
              key: database-url
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: backend-secrets
              key: redis-url
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: backend-secrets
              key: jwt-secret
        
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 3
      
      # Anti-affinity to spread pods across nodes
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: app
                  operator: In
                  values:
                  - backend
              topologyKey: kubernetes.io/hostname
```

### **Backend Service**

```yaml
# k8s/backend/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-service
  namespace: production
spec:
  selector:
    app: backend
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 3000
    protocol: TCP
    name: http
  sessionAffinity: ClientIP
  sessionAffinityConfig:
    clientIP:
      timeoutSeconds: 10800
```

### **Horizontal Pod Autoscaler**

```yaml
# k8s/backend/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
      - type: Pods
        value: 4
        periodSeconds: 15
      selectPolicy: Max
```

### **Ingress Configuration**

```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: solo-leveling-ingress
  namespace: production
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/proxy-body-size: "10m"
spec:
  tls:
  - hosts:
    - api.solo-leveling.com
    secretName: api-tls-secret
  rules:
  - host: api.solo-leveling.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 80
      - path: /ml
        pathType: Prefix
        backend:
          service:
            name: ml-api-service
            port:
              number: 80
```

---

## ­ƒôè Monitoring & Logging

### **Prometheus Configuration**

```yaml
# k8s/monitoring/prometheus-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: monitoring
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
      evaluation_interval: 15s
    
    scrape_configs:
      - job_name: 'kubernetes-pods'
        kubernetes_sd_configs:
        - role: pod
        relabel_configs:
        - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
          action: keep
          regex: true
        - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
          action: replace
          target_label: __metrics_path__
          regex: (.+)
        - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
          action: replace
          regex: ([^:]+)(?::\d+)?;(\d+)
          replacement: $1:$2
          target_label: __address__
      
      - job_name: 'backend'
        static_configs:
        - targets: ['backend-service:80']
      
      - job_name: 'ml-api'
        static_configs:
        - targets: ['ml-api-service:80']
```

### **Grafana Dashboard (JSON)**

```json
{
  "dashboard": {
    "title": "Solo Leveling - Application Metrics",
    "panels": [
      {
        "title": "API Request Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{path}}"
          }
        ]
      },
      {
        "title": "API Response Time (p95)",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "{{path}}"
          }
        ]
      },
      {
        "title": "Database Connection Pool",
        "targets": [
          {
            "expr": "pg_pool_size",
            "legendFormat": "Pool Size"
          },
          {
            "expr": "pg_pool_active",
            "legendFormat": "Active Connections"
          }
        ]
      },
      {
        "title": "Quest Completions (per minute)",
        "targets": [
          {
            "expr": "rate(quests_completed_total[1m])",
            "legendFormat": "Completions/min"
          }
        ]
      }
    ]
  }
}
```

### **ELK Stack Setup**

```yaml
# k8s/logging/elasticsearch.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: elasticsearch
  namespace: logging
spec:
  serviceName: elasticsearch
  replicas: 3
  selector:
    matchLabels:
      app: elasticsearch
  template:
    metadata:
      labels:
        app: elasticsearch
    spec:
      containers:
      - name: elasticsearch
        image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
        ports:
        - containerPort: 9200
          name: http
        - containerPort: 9300
          name: transport
        env:
        - name: cluster.name
          value: "solo-leveling-logs"
        - name: discovery.seed_hosts
          value: "elasticsearch-0.elasticsearch,elasticsearch-1.elasticsearch,elasticsearch-2.elasticsearch"
        - name: cluster.initial_master_nodes
          value: "elasticsearch-0,elasticsearch-1,elasticsearch-2"
        - name: ES_JAVA_OPTS
          value: "-Xms512m -Xmx512m"
        volumeMounts:
        - name: data
          mountPath: /usr/share/elasticsearch/data
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 10Gi
```

---

*Continue reading in: `TESTING_STRATEGY.md`, `FEATURE_SPECIFICATIONS.md`*
