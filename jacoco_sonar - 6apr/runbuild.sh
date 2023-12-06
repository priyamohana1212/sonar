#!/usr/bin/env bash
mvn -f ecomm-backend/pom.xml clean package -DskipTests
docker image build --no-cache -f Dockerfile.ecomapi -t  devopsagilitydev.azurecr.io/myrepo-backend:mytag .
docker image build --no-cache -f Dockerfile.ecomui -t devopsagilitydev.azurecr.io/myrepo-frontend:mytag .
docker push devopsagilitydev.azurecr.io/myrepo-backend:mytag
docker push devopsagilitydev.azurecr.io/myrepo-frontend:mytag
#kubectl exec -it postgres-deployment-6d46c57765-lqhpc -n saecom -- bash
#psql -Utensai --password ecommerce
