# Resume Builder - Deployment Guide

This guide will help you deploy your Resume Builder application online using your GitHub repository.

## Repository
- **GitHub**: https://github.com/YuvrajGupta1808/ResumeBuilder
- **Frontend**: Next.js (React)
- **Backend**: NestJS (Node.js)
- **Database**: PostgreSQL with Prisma
- **Features**: AI-powered resume tailoring, LaTeX support, PDF generation

## Deployment Options

### Option 1: Railway (Recommended - Easy Setup)

#### Backend Deployment:
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository: `YuvrajGupta1808/ResumeBuilder`
5. Choose the `backend` folder
6. Add environment variables:
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   JWT_SECRET=your-jwt-secret
   OPENAI_API_KEY=your-openai-api-key
   REDIS_URL=redis://username:password@host:port
   NODE_ENV=production
   ```
7. Railway will automatically build and deploy

#### Frontend Deployment:
1. In Railway, create another project
2. Select the `frontend` folder from your repo
3. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-railway-url.railway.app
   ```
4. Deploy

### Option 2: Render (Free Tier Available)

#### Backend Deployment:
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repo: `YuvrajGupta1808/ResumeBuilder`
5. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build && npm run prisma:generate`
   - **Start Command**: `npm run start:prod`
6. Add environment variables (same as Railway)
7. Deploy

#### Frontend Deployment:
1. In Render, create "Static Site"
2. Connect your GitHub repo
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `out` (if using static export) or `.next`
4. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-render-url.onrender.com
   ```

### Option 3: Vercel (Frontend) + Railway (Backend)

#### Frontend on Vercel:
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository: `YuvrajGupta1808/ResumeBuilder`
4. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js
5. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   ```
6. Deploy

## Environment Variables Setup

### Backend Required Variables:
```bash
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key
OPENAI_API_KEY=sk-your-openai-api-key
REDIS_URL=redis://username:password@host:port
NODE_ENV=production
```

### Frontend Required Variables:
```bash
NEXT_PUBLIC_API_URL=https://your-backend-deployment-url
```

## Database Setup

### Option 1: Railway PostgreSQL
- Railway provides free PostgreSQL database
- Add as a service in your Railway project
- Copy the connection string to `DATABASE_URL`

### Option 2: Supabase (Free)
1. Go to [Supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy the connection string
5. Use as `DATABASE_URL`

### Option 3: Neon (Free)
1. Go to [Neon.tech](https://neon.tech)
2. Create new project
3. Copy the connection string
4. Use as `DATABASE_URL`

## Redis Setup (Optional - for caching)

### Option 1: Railway Redis
- Add Redis service in Railway
- Use the provided URL

### Option 2: Upstash (Free)
1. Go to [Upstash.com](https://upstash.com)
2. Create Redis database
3. Copy the connection URL
4. Use as `REDIS_URL`

## Deployment Steps Summary

1. **Push your code to GitHub** (if not already done)
2. **Deploy Backend**:
   - Choose Railway, Render, or Heroku
   - Connect your GitHub repo
   - Set root directory to `backend`
   - Add environment variables
   - Deploy
3. **Deploy Frontend**:
   - Choose Vercel, Railway, or Render
   - Connect your GitHub repo
   - Set root directory to `frontend`
   - Add `NEXT_PUBLIC_API_URL` pointing to your backend
   - Deploy
4. **Test your deployment**:
   - Visit your frontend URL
   - Test the resume upload and AI tailoring features

## Custom Domain (Optional)

After deployment, you can add a custom domain:
- **Railway**: Go to project settings → Domains
- **Vercel**: Go to project settings → Domains
- **Render**: Go to service settings → Custom Domains

## Monitoring and Logs

- **Railway**: Built-in logs and metrics
- **Vercel**: Analytics and function logs
- **Render**: Service logs and metrics

## Troubleshooting

### Common Issues:
1. **Build Failures**: Check environment variables are set correctly
2. **Database Connection**: Verify `DATABASE_URL` format
3. **CORS Issues**: Ensure frontend URL is allowed in backend CORS settings
4. **API Calls Failing**: Check `NEXT_PUBLIC_API_URL` is correct

### Useful Commands:
```bash
# Check deployment logs
railway logs
# or
vercel logs
# or
render logs

# Test API endpoints
curl https://your-backend-url/api/health
```

## Cost Estimation

### Free Tiers:
- **Railway**: $5/month credit (usually covers small apps)
- **Vercel**: Free for personal projects
- **Render**: Free tier available
- **Supabase**: Free tier with 500MB database
- **Upstash**: Free tier with 10K requests/day

### Total Monthly Cost: $0-10 (depending on usage)
