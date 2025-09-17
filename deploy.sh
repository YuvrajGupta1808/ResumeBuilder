#!/bin/bash

# Resume Builder Deployment Script
# This script helps deploy the application manually

echo "🚀 Resume Builder Deployment Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to deploy frontend to Railway
deploy_frontend() {
    echo "📦 Deploying Frontend to Railway..."
    cd frontend
    
    # Check if Railway CLI is installed
    if ! command -v railway &> /dev/null; then
        echo "📥 Installing Railway CLI..."
        npm install -g @railway/cli
    fi
    
    # Deploy to Railway
    echo "🚀 Deploying to Railway..."
    railway up --service frontend
    
    echo "✅ Frontend deployment completed!"
    cd ..
}

# Function to deploy backend to Railway
deploy_backend() {
    echo "📦 Deploying Backend to Railway..."
    cd backend
    
    # Check if Railway CLI is installed
    if ! command -v railway &> /dev/null; then
        echo "📥 Installing Railway CLI..."
        npm install -g @railway/cli
    fi
    
    # Deploy to Railway
    echo "🚀 Deploying to Railway..."
    railway up
    
    echo "✅ Backend deployment completed!"
    cd ..
}

# Function to show GitHub secrets setup
show_secrets_setup() {
    echo "🔐 GitHub Secrets Setup Required:"
    echo "================================="
    echo ""
    echo "Go to: GitHub Repository → Settings → Secrets and variables → Actions"
    echo ""
    echo "Add these secrets:"
    echo "- RAILWAY_TOKEN: Get from Railway dashboard → Account Settings → Tokens"
    echo ""
    echo "After adding secrets, push to main to trigger GitHub Actions deployment"
}

# Main menu
echo ""
echo "Choose deployment option:"
echo "1) Deploy Frontend to Railway"
echo "2) Deploy Backend to Railway"
echo "3) Deploy Both (Frontend + Backend)"
echo "4) Show GitHub Secrets Setup Guide"
echo "5) Exit"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        deploy_frontend
        ;;
    2)
        deploy_backend
        ;;
    3)
        deploy_frontend
        echo ""
        deploy_backend
        ;;
    4)
        show_secrets_setup
        ;;
    5)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo "📖 Check the GITHUB_SECRETS_SETUP.md file for next steps"