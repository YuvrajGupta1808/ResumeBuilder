#!/bin/bash

# GitHub Secrets Setup Script for Resume Builder
# Run this script to set up all required secrets for deployment

echo "🚀 Setting up GitHub Secrets for Resume Builder Deployment"
echo "=========================================================="

# Vercel credentials
VERCEL_TOKEN="Au4SNWIVN38jmOk8sGCYIjqY"
VERCEL_ORG_ID="yuvrajgupta1808s-projects"
VERCEL_PROJECT_ID="4CbyNL6KafVf4emr2aUbChoDREeZ"

# Railway credentials (you'll need to get these)
RAILWAY_TOKEN="your_railway_token_here"

echo "📋 Required GitHub Secrets:"
echo "=========================="
echo "VERCEL_TOKEN: $VERCEL_TOKEN"
echo "VERCEL_ORG_ID: $VERCEL_ORG_ID"
echo "VERCEL_PROJECT_ID: $VERCEL_PROJECT_ID"
echo "RAILWAY_TOKEN: $RAILWAY_TOKEN"
echo ""

echo "🔧 How to add these secrets to GitHub:"
echo "====================================="
echo "1. Go to: https://github.com/YuvrajGupta1808/ResumeBuilder/settings/secrets/actions"
echo "2. Click 'New repository secret' for each secret:"
echo "   - Name: VERCEL_TOKEN, Value: $VERCEL_TOKEN"
echo "   - Name: VERCEL_ORG_ID, Value: $VERCEL_ORG_ID"
echo "   - Name: VERCEL_PROJECT_ID, Value: $VERCEL_PROJECT_ID"
echo "   - Name: RAILWAY_TOKEN, Value: [Get from Railway dashboard]"
echo ""

echo "🚂 To get Railway Token:"
echo "======================="
echo "1. Go to: https://railway.app/account/tokens"
echo "2. Create a new token"
echo "3. Copy the token and add it as RAILWAY_TOKEN secret"
echo ""

echo "✅ After adding all secrets, push to main branch to trigger deployment:"
echo "git add ."
echo "git commit -m 'Setup deployment secrets'"
echo "git push origin main"
echo ""

echo "🎯 Your Vercel deployment URL:"
echo "https://vercel.com/yuvrajgupta1808s-projects/resume-builder-frontend"
