#!/bin/bash

# Railway Deployment Script for Resume Builder
# This script helps you deploy your application to Railway

echo "🚀 Railway Deployment Script for Resume Builder"
echo "=============================================="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI is not installed."
    echo "Please install it first:"
    echo "npm install -g @railway/cli"
    echo "or visit: https://docs.railway.app/develop/cli"
    exit 1
fi

echo "✅ Railway CLI is installed"

# Check if user is logged in
if ! railway whoami &> /dev/null; then
    echo "❌ You are not logged in to Railway."
    echo "Please run: railway login"
    exit 1
fi

echo "✅ Logged in to Railway"

# Create new project
echo "📦 Creating new Railway project..."
railway project new

# Add PostgreSQL database
echo "🗄️ Adding PostgreSQL database..."
railway add postgresql

# Add Redis cache
echo "🔴 Adding Redis cache..."
railway add redis

# Deploy backend
echo "🔧 Deploying backend service..."
cd backend
railway up --service backend
cd ..

# Deploy frontend
echo "🎨 Deploying frontend service..."
cd frontend
railway up --service frontend
cd ..

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set up environment variables in Railway dashboard"
echo "2. Run database migrations"
echo "3. Test your application"
echo ""
echo "📖 See RAILWAY_DEPLOYMENT.md for detailed instructions"
