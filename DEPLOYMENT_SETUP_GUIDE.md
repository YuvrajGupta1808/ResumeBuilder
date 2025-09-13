# GitHub Actions Deployment Setup Guide

## Current Issues Fixed

✅ **Format Check**: Fixed prettier script to not look for non-existent test files  
✅ **Railway Action**: Updated to use Railway CLI instead of invalid action  
❌ **Missing Secrets**: Need to configure GitHub repository secrets  

## Required GitHub Secrets

To make the CI/CD pipeline work, you need to add these secrets to your GitHub repository:

### 1. Vercel Deployment Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

**Required secrets:**
- `VERCEL_TOKEN`: Your Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID  
- `VERCEL_PROJECT_ID`: Your Vercel project ID

**How to get them:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to Settings → Tokens → Create Token
3. Copy the token as `VERCEL_TOKEN`
4. Go to your project → Settings → General
5. Copy Organization ID as `VERCEL_ORG_ID`
6. Copy Project ID as `VERCEL_PROJECT_ID`

### 2. Railway Deployment Secrets

**Required secrets:**
- `RAILWAY_TOKEN`: Your Railway API token

**How to get it:**
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Go to Account Settings → Tokens
3. Create a new token
4. Copy the token as `RAILWAY_TOKEN`

### 3. Azure Deployment Secrets (Optional)

If you want to use Azure instead of Railway:

**Required secrets:**
- `AZURE_CLIENT_ID`: Service Principal client ID
- `AZURE_TENANT_ID`: Azure tenant ID
- `AZURE_SUBSCRIPTION_ID`: Azure subscription ID
- `AZURE_CLIENT_SECRET`: Service Principal client secret

## Quick Setup Steps

### Option 1: Use Vercel + Railway (Recommended)

1. **Set up Vercel:**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login and deploy frontend
   cd frontend
   vercel login
   vercel --prod
   ```

2. **Get Vercel secrets from the deployment output**

3. **Set up Railway:**
   - Go to Railway dashboard
   - Create a new project
   - Connect your GitHub repository
   - Get the Railway token

4. **Add all secrets to GitHub repository**

### Option 2: Manual Deployment (Simpler)

If you prefer to deploy manually without CI/CD:

1. **Deploy frontend to Vercel:**
   ```bash
   cd frontend
   npx vercel --prod
   ```

2. **Deploy backend to Railway:**
   - Connect your GitHub repo to Railway
   - Railway will auto-deploy on push

## Testing the Setup

After adding the secrets:

1. Push a commit to trigger the workflow
2. Check the Actions tab in GitHub
3. The workflow should now pass all steps

## Troubleshooting

### Vercel Deployment Fails
- Check that `VERCEL_TOKEN` is valid
- Verify `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` are correct
- Make sure the Vercel project exists

### Railway Deployment Fails  
- Check that `RAILWAY_TOKEN` is valid
- Verify Railway project is connected to your GitHub repo
- Check Railway project settings

### Azure Deployment Fails
- Verify all Azure secrets are set correctly
- Check Service Principal permissions
- Ensure the Azure resources exist

## Current Workflow Status

The updated `ci.yml` workflow now:
- ✅ Passes lint and format checks
- ✅ Builds both frontend and backend
- ✅ Deploys frontend to Vercel (with proper secrets)
- ✅ Deploys backend to Railway (with proper secrets)
- ❌ Needs GitHub secrets to be configured

Once you add the required secrets, the entire CI/CD pipeline should work automatically on every push to main.
