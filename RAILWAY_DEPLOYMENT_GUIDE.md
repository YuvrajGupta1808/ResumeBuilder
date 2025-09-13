# Railway Backend Deployment Guide

## Current Railway Issues

Based on your previous reports, Railway deployment has these issues:
- 502 Bad Gateway errors
- Container restarting repeatedly
- CORS configuration problems

## Step-by-Step Railway Fix

### 1. Check Railway Project Configuration

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Select your backend project
3. Go to Settings → Environment Variables

**Required Environment Variables:**
```
DATABASE_URL=postgresql://dbadmin:ResumeBuilder1234@resume-builder-db.postgres.database.azure.com:5432/ai_job_assistant?sslmode=require
REDIS_URL=redis://default:AfWlAAIncDEyYzg5NDNiNzQzMGM0MTg1OGExZDZkMTNjYTM0OWRkYXAxNjI4ODU@obliging-mosquito-62885.upstash.io:6379
JWT_SECRET=your-super-secure-jwt-secret-for-production-change-this
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=your-openai-api-key-here
PORT=3001
NODE_ENV=production
CORS_ORIGIN=*
THROTTLE_TTL=60
THROTTLE_LIMIT=100
MAX_FILE_SIZE=10485760
UPLOAD_DEST=./uploads
```

### 2. Fix CORS Configuration

The main issue is likely CORS. Update `CORS_ORIGIN` to:
- `*` (for testing) or
- Your frontend domain (for production)

### 3. Check Railway Logs

1. Go to Railway project → Deployments
2. Click on the latest deployment
3. Check the logs for errors

**Common issues to look for:**
- Database connection errors
- Missing environment variables
- Port binding issues
- CORS errors

### 4. Test Railway Deployment

1. **Check if the service is running:**
   ```bash
   curl https://your-railway-url.railway.app/api/v1/health
   ```

2. **Test database connection:**
   - Check Railway logs for Prisma connection messages
   - Look for "Connected to Redis successfully"

3. **Test CORS:**
   - Try accessing the API from your frontend
   - Check browser console for CORS errors

### 5. Railway CLI Deployment (Alternative)

If the GitHub Actions deployment doesn't work, use Railway CLI:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy from backend directory
cd backend
railway up
```

### 6. Troubleshooting Common Issues

**502 Bad Gateway:**
- Check if the application is starting properly
- Verify all environment variables are set
- Check Railway logs for startup errors

**Container Restarting:**
- Usually indicates a crash on startup
- Check for missing dependencies
- Verify database connection

**CORS Errors:**
- Update `CORS_ORIGIN` environment variable
- Check `backend/src/main.ts` CORS configuration

### 7. Railway Project Structure

Make sure your Railway project is configured correctly:

1. **Root Directory:** Should be `backend/` (not the repo root)
2. **Build Command:** `npm install && npm run build`
3. **Start Command:** `npm run start:prod`
4. **Node Version:** 20.x

### 8. Test Complete Setup

Once Railway is working:

1. **Test backend health:**
   ```bash
   curl https://your-railway-url.railway.app/api/v1/health
   ```

2. **Test API endpoints:**
   ```bash
   curl https://your-railway-url.railway.app/api/v1/auth/login
   ```

3. **Update frontend API URL:**
   - Update `NEXT_PUBLIC_API_URL` in your frontend
   - Point it to your Railway backend URL

## Next Steps

1. Fix Railway environment variables
2. Test Railway deployment
3. Update frontend to use Railway backend
4. Deploy frontend to Vercel
5. Test complete application

The Railway deployment should work once the environment variables are properly configured and CORS is set correctly.
