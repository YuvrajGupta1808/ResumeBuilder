# Azure Deployment Authentication Fix

## Current Issue
The Azure deployment is failing with the error:
```
Error: Login failed with Error: Using auth-type: SERVICE_PRINCIPAL. Not all values are present. Ensure 'client-id' and 'tenant-id' are supplied.
```

## Solution

### Option 1: Fix Azure Service Principal Authentication

1. **Create Azure Service Principal** (if not already created):
   ```bash
   az ad sp create-for-rbac --name "resume-builder-sp" --role contributor --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group}
   ```

2. **Add GitHub Secrets**:
   Go to your GitHub repository → Settings → Secrets and variables → Actions, and add:
   - `AZURE_CLIENT_ID`: The appId from the service principal creation
   - `AZURE_TENANT_ID`: The tenant from the service principal creation  
   - `AZURE_SUBSCRIPTION_ID`: Your Azure subscription ID
   - `AZURE_CLIENT_SECRET`: The password from the service principal creation

3. **Update GitHub Actions Workflow**:
   The Azure login step should look like:
   ```yaml
   - name: Azure Login
     uses: azure/login@v1
     with:
       client-id: ${{ secrets.AZURE_CLIENT_ID }}
       tenant-id: ${{ secrets.AZURE_TENANT_ID }}
       subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
   ```

### Option 2: Switch to Railway Deployment (Recommended)

Since you already have Railway configured, it's easier to use Railway for backend deployment:

1. **Get Railway Token**:
   - Go to Railway dashboard → Account Settings → Tokens
   - Create a new token

2. **Add GitHub Secret**:
   - Add `RAILWAY_TOKEN` to your GitHub repository secrets

3. **Use the provided ci.yml workflow** which includes Railway deployment

### Option 3: Use Azure Container Apps with Different Auth

If you want to keep using Azure, you can use Azure Container Apps with a different authentication method:

1. **Use Azure CLI login**:
   ```yaml
   - name: Azure Login
     uses: azure/login@v1
     with:
       creds: ${{ secrets.AZURE_CREDENTIALS }}
   ```

2. **Generate Azure Credentials**:
   ```bash
   az ad sp create-for-rbac --name "resume-builder-github" --role contributor --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group} --sdk-auth
   ```

## Recommended Action

I recommend **Option 2 (Railway)** because:
- You already have Railway configured
- It's simpler to set up
- Railway is more cost-effective for small applications
- Less Azure configuration complexity

The provided `ci.yml` workflow file includes Railway deployment configuration that should work with your existing setup.
