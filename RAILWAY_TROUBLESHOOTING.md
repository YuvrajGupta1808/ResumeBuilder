# Railway Deployment Troubleshooting

## Current Issue: Database Connection Error

The deployment is failing because of Prisma database connection issues. Here's how to fix it:

## Solution 1: Use Railway PostgreSQL (Recommended)

Instead of using Azure PostgreSQL, use Railway's built-in PostgreSQL:

1. **In Railway Dashboard:**
   - Go to your project
   - Click "New" → "Database" → "PostgreSQL"
   - This will create a new PostgreSQL database

2. **Update Environment Variables:**
   - Railway will automatically provide `DATABASE_URL`
   - Remove the custom `DATABASE_URL` from your environment variables
   - Railway will use its own database connection

## Solution 2: Fix Azure Database Connection

If you want to keep using Azure PostgreSQL:

1. **Update Environment Variables in Railway:**
   ```
   DATABASE_URL=postgresql://dbadmin:ResumeBuilder1234@resume-builder-db.postgres.database.azure.com:5432/ai_job_assistant?sslmode=require
   DIRECT_URL=postgresql://dbadmin:ResumeBuilder1234@resume-builder-db.postgres.database.azure.com:5432/ai_job_assistant?sslmode=require
   JWT_SECRET=your-super-secure-jwt-secret-for-production-change-this
   JWT_EXPIRES_IN=7d
   OPENAI_API_KEY=your-openai-api-key-here
   PORT=3001
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   THROTTLE_TTL=60
   THROTTLE_LIMIT=100
   MAX_FILE_SIZE=10485760
   UPLOAD_DEST=./uploads
   REDIS_URL=redis://default:AfWlAAIncDEyYzg5NDNiNzQzMGM0MTg1OGExZDZkMTNjYTM0OWRkYXAxNjI4ODU@obliging-mosquito-62885.upstash.io:6379
   ```

2. **Check Azure Database Settings:**
   - Ensure the database allows connections from Railway's IP ranges
   - Check if the database is accessible from external connections
   - Verify the connection string is correct

## Solution 3: Alternative Database Options

### Option A: Supabase (Free)
1. Go to [Supabase.com](https://supabase.com)
2. Create a new project
3. Get the connection string from Settings → Database
4. Use as `DATABASE_URL` in Railway

### Option B: Neon (Free)
1. Go to [Neon.tech](https://neon.tech)
2. Create a new project
3. Get the connection string
4. Use as `DATABASE_URL` in Railway

## Quick Fix Steps:

1. **Stop the current deployment** in Railway
2. **Add a Railway PostgreSQL database:**
   - In Railway dashboard → New → Database → PostgreSQL
3. **Update environment variables:**
   - Remove custom `DATABASE_URL`
   - Railway will auto-provide the database URL
4. **Redeploy** your application

## Environment Variables for Railway:

```
JWT_SECRET=your-super-secure-jwt-secret-for-production-change-this
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=your-openai-api-key-here
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
THROTTLE_TTL=60
THROTTLE_LIMIT=100
MAX_FILE_SIZE=10485760
UPLOAD_DEST=./uploads
REDIS_URL=redis://default:AfWlAAIncDEyYzg5NDNiNzQzMGM0MTg1OGExZDZkMTNjYTM0OWRkYXAxNjI4ODU@obliging-mosquito-62885.upstash.io:6379
```

## After Fixing Database:

1. The deployment should complete successfully
2. Your backend will be available at: `https://your-railway-app.railway.app`
3. Update your frontend's `NEXT_PUBLIC_API_URL` to point to this URL

## Testing the Deployment:

Once deployed, test these endpoints:
- `GET https://your-railway-app.railway.app/api/health`
- `GET https://your-railway-app.railway.app/api/docs` (Swagger documentation)
