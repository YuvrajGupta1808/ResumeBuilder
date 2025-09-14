# GitHub Secrets Setup Guide

## Current Issues

❌ **Vercel Deployment**: Missing `vercel-token` secret  
❌ **Railway Deployment**: Incorrect CLI command syntax (fixed)  
❌ **Missing Secrets**: Need to configure GitHub repository secrets  

## Required GitHub Secrets

### 1. Vercel Secrets

**Go to:** GitHub Repository → Settings → Secrets and variables → Actions → New repository secret

**Required secrets:**
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID` 
- `VERCEL_PROJECT_ID`

**How to get Vercel secrets:**

1. **Get VERCEL_TOKEN:**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login to Vercel
   vercel login
   
   # Get your token from Vercel dashboard
   # Go to: https://vercel.com/account/tokens
   # Create a new token and copy it
   ```

2. **Get VERCEL_ORG_ID and VERCEL_PROJECT_ID:**
   ```bash
   # Deploy your frontend to get the IDs
   cd frontend
   vercel --prod
   
   # The output will show:
   # - Organization ID (copy as VERCEL_ORG_ID)
   # - Project ID (copy as VERCEL_PROJECT_ID)
   ```

### 2. Railway Secrets

**Required secrets:**
- `RAILWAY_TOKEN`

**How to get Railway token:**

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click on your profile → Account Settings
3. Go to "Tokens" tab
4. Click "Create Token"
5. Copy the token as `RAILWAY_TOKEN`

## Step-by-Step Setup

### Step 1: Set up Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login and deploy frontend:**
   ```bash
   cd frontend
   vercel login
   vercel --prod
   ```

3. **Copy the output values:**
   - Organization ID → `VERCEL_ORG_ID`
   - Project ID → `VERCEL_PROJECT_ID`
   - Get token from https://vercel.com/account/tokens → `VERCEL_TOKEN`

### Step 2: Set up Railway

1. **Go to Railway Dashboard:**
   - Visit https://railway.app/dashboard
   - Create a new project
   - Connect your GitHub repository

2. **Get Railway token:**
   - Go to Account Settings → Tokens
   - Create new token
   - Copy as `RAILWAY_TOKEN`

### Step 3: Add GitHub Secrets

1. **Go to your GitHub repository**
2. **Click Settings → Secrets and variables → Actions**
3. **Click "New repository secret"**
4. **Add each secret:**
   - Name: `VERCEL_TOKEN`, Value: [your vercel token]
   - Name: `VERCEL_ORG_ID`, Value: [your org id]
   - Name: `VERCEL_PROJECT_ID`, Value: [your project id]
   - Name: `RAILWAY_TOKEN`, Value: [your railway token]

### Step 4: Test the Deployment

1. **Push a commit to trigger the workflow:**
   ```bash
   git add .
   git commit -m "Test deployment with secrets"
   git push origin main
   ```

2. **Check GitHub Actions:**
   - Go to Actions tab in your repository
   - The workflow should now pass all steps

## Alternative: Manual Deployment

If you prefer to deploy manually without CI/CD:

### Deploy Frontend to Vercel:
```bash
cd frontend
npx vercel --prod
```

### Deploy Backend to Railway:
1. Connect your GitHub repo to Railway
2. Railway will auto-deploy on push
3. Or use Railway CLI:
   ```bash
   cd backend
   npx railway login
   npx railway up
   ```

## Troubleshooting

### Vercel Deployment Fails
- ✅ Check `VERCEL_TOKEN` is valid
- ✅ Verify `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` are correct
- ✅ Make sure the Vercel project exists

### Railway Deployment Fails
- ✅ Check `RAILWAY_TOKEN` is valid
- ✅ Verify Railway project is connected to GitHub repo
- ✅ Check Railway project settings

### GitHub Actions Still Fails
- ✅ Verify all secrets are added correctly
- ✅ Check secret names match exactly (case-sensitive)
- ✅ Make sure secrets are added to the correct repository

## Current Status

After adding the secrets:
- ✅ **CI Pipeline**: All lint, format, and build steps pass
- ✅ **Workflow Files**: Properly configured
- ❌ **Secrets**: Need to be configured in GitHub
- ❌ **Deployments**: Will work once secrets are added

The GitHub Actions workflow is now properly configured and will work once you add the required secrets.
