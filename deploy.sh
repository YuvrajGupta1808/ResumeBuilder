#!/bin/bash

# Resume Builder Backend Deployment Script
# This script deploys the backend to Azure Container Apps

set -e

echo "🚀 Starting Resume Builder Backend Deployment..."

# Configuration
RESOURCE_GROUP="resume-builder-rg"
ACR_NAME="resumebuilderacr"
CONTAINER_APP_NAME="resume-builder-backend"
CONTAINER_APP_ENV="resume-builder-env"
IMAGE_NAME="backend"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📋 Configuration:${NC}"
echo "Resource Group: $RESOURCE_GROUP"
echo "ACR Name: $ACR_NAME"
echo "Container App: $CONTAINER_APP_NAME"
echo "Environment: $CONTAINER_APP_ENV"
echo ""

# Check if Azure CLI is logged in
if ! az account show &> /dev/null; then
    echo -e "${RED}❌ Not logged in to Azure CLI. Please run 'az login' first.${NC}"
    exit 1
fi

# Check if providers are registered
echo -e "${YELLOW}🔍 Checking Azure providers...${NC}"
az provider register --namespace Microsoft.ContainerRegistry --wait
az provider register --namespace Microsoft.App --wait
echo -e "${GREEN}✅ Providers registered${NC}"

# Create Azure Container Registry
echo -e "${YELLOW}📦 Creating Azure Container Registry...${NC}"
if ! az acr show --name $ACR_NAME --resource-group $RESOURCE_GROUP &> /dev/null; then
    az acr create \
        --resource-group $RESOURCE_GROUP \
        --name $ACR_NAME \
        --sku Basic \
        --admin-enabled true
    echo -e "${GREEN}✅ Container Registry created${NC}"
else
    echo -e "${GREEN}✅ Container Registry already exists${NC}"
fi

# Login to ACR
echo -e "${YELLOW}🔐 Logging in to Container Registry...${NC}"
az acr login --name $ACR_NAME

# Build and push Docker image
echo -e "${YELLOW}🏗️ Building and pushing Docker image...${NC}"
cd backend
az acr build --registry $ACR_NAME --image $IMAGE_NAME:latest .
echo -e "${GREEN}✅ Docker image built and pushed${NC}"

# Create Container Apps environment
echo -e "${YELLOW}🌍 Creating Container Apps environment...${NC}"
if ! az containerapp env show --name $CONTAINER_APP_ENV --resource-group $RESOURCE_GROUP &> /dev/null; then
    az containerapp env create \
        --name $CONTAINER_APP_ENV \
        --resource-group $RESOURCE_GROUP \
        --location eastus
    echo -e "${GREEN}✅ Container Apps environment created${NC}"
else
    echo -e "${GREEN}✅ Container Apps environment already exists${NC}"
fi

# Create or update Container App
echo -e "${YELLOW}🚀 Creating/updating Container App...${NC}"
if ! az containerapp show --name $CONTAINER_APP_NAME --resource-group $RESOURCE_GROUP &> /dev/null; then
    az containerapp create \
        --name $CONTAINER_APP_NAME \
        --resource-group $RESOURCE_GROUP \
        --environment $CONTAINER_APP_ENV \
        --image $ACR_NAME.azurecr.io/$IMAGE_NAME:latest \
        --target-port 3001 \
        --ingress external \
        --registry-server $ACR_NAME.azurecr.io \
        --query properties.configuration.ingress.fqdn
    echo -e "${GREEN}✅ Container App created${NC}"
else
    az containerapp update \
        --name $CONTAINER_APP_NAME \
        --resource-group $RESOURCE_GROUP \
        --image $ACR_NAME.azurecr.io/$IMAGE_NAME:latest
    echo -e "${GREEN}✅ Container App updated${NC}"
fi

# Set environment variables
echo -e "${YELLOW}⚙️ Setting environment variables...${NC}"
az containerapp update \
    --name $CONTAINER_APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --set-env-vars \
        DATABASE_URL="postgresql://dbadmin:ResumeBuilder1234@resume-builder-db.postgres.database.azure.com:5432/ai_job_assistant?sslmode=require" \
        REDIS_URL="redis://default:AfWlAAIncDEyYzg5NDNiNzQzMGM0MTg1OGExZDZkMTNjYTM0OWRkYXAxNjI4ODU@obliging-mosquito-62885.upstash.io:6379" \
        JWT_SECRET="your-super-secure-jwt-secret-for-production-change-this" \
        JWT_EXPIRES_IN="7d" \
        OPENAI_API_KEY="your-openai-api-key-here" \
        NODE_ENV="production" \
        CORS_ORIGIN="http://localhost:3000" \
        THROTTLE_TTL="60" \
        THROTTLE_LIMIT="100" \
        MAX_FILE_SIZE="10485760" \
        UPLOAD_DEST="./uploads"

echo -e "${GREEN}✅ Environment variables set${NC}"

# Get the application URL
echo -e "${YELLOW}🔗 Getting application URL...${NC}"
APP_URL=$(az containerapp show \
    --name $CONTAINER_APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --query properties.configuration.ingress.fqdn -o tsv)

echo ""
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Your backend is available at: https://$APP_URL${NC}"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "1. Update your frontend to use: https://$APP_URL"
echo "2. Test the API endpoints"
echo "3. Set up your OpenAI API key in the environment variables"
echo "4. Update CORS_ORIGIN with your frontend domain"
echo ""
echo -e "${YELLOW}🔧 To update environment variables later:${NC}"
echo "az containerapp update --name $CONTAINER_APP_NAME --resource-group $RESOURCE_GROUP --set-env-vars KEY=VALUE"
