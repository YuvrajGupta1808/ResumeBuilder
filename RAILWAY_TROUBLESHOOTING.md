# Railway Backend Troubleshooting Guide

## Current Issue: 502 Bad Gateway Errors

### Step 1: Check Railway Deployment Logs

1. Go to your Railway dashboard
2. Click on your backend project
3. Go to "Deployments" tab
4. Click on the latest deployment
5. Check the "Logs" section for error messages

### Step 2: Verify Environment Variables

Make sure these are set in Railway:

```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# Redis
REDIS_URL=redis://username:password@host:port

# JWT
JWT_SECRET=your-jwt-secret-key

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# CORS
CORS_ORIGIN=https://frontend-lxbow585y-yuvrajgupta1808s-projects.vercel.app

# Port
PORT=3001

# Throttling
THROTTLE_TTL=60
THROTTLE_LIMIT=10

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DEST=./uploads
```

### Step 3: Check Database Connection

The 502 error might be due to database connection issues. Verify:

1. **Azure PostgreSQL is accessible** from Railway
2. **Connection string is correct**
3. **Database exists and is running**
4. **SSL is properly configured**

### Step 4: Check Redis Connection

Verify Redis connection:

1. **Upstash Redis is accessible**
2. **Redis URL is correct**
3. **Redis instance is running**

### Step 5: Check Application Startup

Look for these in the logs:

```bash
# Should see:
[Nest] Starting Nest application...
[InstanceLoader] AppModule dependencies initialized
[RoutesResolver] AuthController {/api/v1/auth}:
[RoutesResolver] UserController {/api/v1/user}:
[RoutesResolver] ResumeController {/api/v1/resumes}:
[RoutesResolver] JobController {/api/v1/job-history}:
[RoutesResolver] AiController {/api/v1/ai}:
[RoutesResolver] LatexController {/api/v1/latex}:
[NestApplication] Nest application successfully started
🚀 Application is running on: http://0.0.0.0:3001
```

### Step 6: Common Fixes

#### Fix 1: Update CORS Origin
```bash
CORS_ORIGIN=https://frontend-lxbow585y-yuvrajgupta1808s-projects.vercel.app
```

#### Fix 2: Check Port Configuration
```bash
PORT=3001
```

#### Fix 3: Verify Database SSL
Make sure your DATABASE_URL includes `?sslmode=require`

#### Fix 4: Check File Permissions
Ensure the application can write to the uploads directory

### Step 7: Test Backend Endpoints

Once running, test these endpoints:

```bash
# Health check
GET https://your-railway-backend-url.railway.app/api/v1/auth/profile

# API docs
GET https://your-railway-backend-url.railway.app/api/docs
```

### Step 8: Railway CLI Commands

If you have Railway CLI installed:

```bash
# Login to Railway
railway login

# Check project status
railway status

# View logs
railway logs

# Check environment variables
railway variables
```

### Step 9: Redeploy

If all else fails:

1. Go to Railway dashboard
2. Click "Redeploy" on your project
3. Monitor the deployment logs
4. Check if the 502 error persists

### Step 10: Contact Support

If the issue persists:

1. Check Railway status page: https://status.railway.app/
2. Contact Railway support with:
   - Project URL
   - Error logs
   - Environment variables (without sensitive data)
   - Steps you've tried

## Expected Working State

When everything is working, you should see:

```
✅ Backend accessible at: https://your-railway-backend-url.railway.app
✅ API docs at: https://your-railway-backend-url.railway.app/api/docs
✅ Health check passing
✅ Database connected
✅ Redis connected
✅ All endpoints responding
```

## Next Steps After Fix

1. Update frontend `NEXT_PUBLIC_API_URL` with Railway backend URL
2. Test complete application flow
3. Set up GitHub Actions for auto-deployment
4. Configure OAuth providers
5. Test all features end-to-end