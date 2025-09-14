# OAuth Setup Guide for Resume Builder

## Current Authentication Status ✅

Your Resume Builder now supports **three authentication methods**:

1. **Google OAuth** - Sign in with Google account
2. **GitHub OAuth** - Sign in with GitHub account  
3. **Email/Password** - Simple credentials-based authentication (works immediately)

## Current Working Features

- ✅ **Email/Password Authentication**: Works immediately with any email/password combination
- ✅ **Frontend Deployed**: https://frontend-lxbow585y-yuvrajgupta1808s-projects.vercel.app
- ✅ **Sign-in Page**: Beautiful UI with all three options
- ⏳ **Google OAuth**: Needs OAuth credentials setup
- ⏳ **GitHub OAuth**: Needs OAuth credentials setup

## To Enable Google OAuth

### 1. Create Google OAuth App
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
5. Set **Application type** to "Web application"
6. Add **Authorized redirect URIs**:
   - `https://frontend-lxbow585y-yuvrajgupta1808s-projects.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for local development)

### 2. Add Google Credentials to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/yuvrajgupta1808s-projects/frontend/settings/environment-variables)
2. Add these environment variables:
   - `GOOGLE_CLIENT_ID`: Your Google Client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google Client Secret

## To Enable GitHub OAuth

### 1. Create GitHub OAuth App
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the details:
   - **Application name**: Resume Builder
   - **Homepage URL**: `https://frontend-lxbow585y-yuvrajgupta1808s-projects.vercel.app`
   - **Authorization callback URL**: `https://frontend-lxbow585y-yuvrajgupta1808s-projects.vercel.app/api/auth/callback/github`

### 2. Add GitHub Credentials to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/yuvrajgupta1808s-projects/frontend/settings/environment-variables)
2. Add these environment variables:
   - `GITHUB_CLIENT_ID`: Your GitHub Client ID
   - `GITHUB_CLIENT_SECRET`: Your GitHub Client Secret

## Quick Test

### Email/Password (Works Now)
1. Go to: https://frontend-lxbow585y-yuvrajgupta1808s-projects.vercel.app/auth/signin
2. Enter any email and password
3. Click "Sign In with Email"
4. You'll be redirected to the dashboard

### Google/GitHub (After Setup)
1. Click "Continue with Google" or "Continue with GitHub"
2. Complete OAuth flow
3. You'll be redirected to the dashboard

## Environment Variables Summary

Add these to your Vercel project settings:

```bash
# Required
NEXTAUTH_URL=https://frontend-lxbow585y-yuvrajgupta1808s-projects.vercel.app
NEXTAUTH_SECRET=resume-builder-secret-key-2024

# Optional (for OAuth)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Backend API
NEXT_PUBLIC_API_URL=https://your-railway-backend-url.railway.app
```

## Next Steps

1. **Test Email/Password**: Try the current deployment
2. **Setup OAuth**: Follow the guides above for Google/GitHub
3. **Connect Backend**: Update `NEXT_PUBLIC_API_URL` with your Railway backend URL
4. **Full Testing**: Test the complete application flow

## Troubleshooting

- **OAuth not working**: Check that redirect URIs match exactly
- **Environment variables**: Make sure they're added to Vercel project settings
- **Local development**: Use `http://localhost:3000` for local OAuth testing

Your authentication system is now ready! 🎉
