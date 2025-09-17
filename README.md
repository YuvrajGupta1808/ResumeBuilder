# AI-Powered Job Application Assistant

A comprehensive monorepo application that uses AI to help job seekers tailor their resumes and generate cover letters for specific job applications. Built with Next.js frontend and NestJS backend, featuring OpenAI GPT-4 integration.

## 🚀 Features

- **AI-Powered Resume Tailoring**: Automatically customize your resume to match job requirements
- **Cover Letter Generation**: Generate personalized cover letters for each application
- **User Authentication**: Secure login with Google and GitHub OAuth
- **Resume Management**: Upload and manage multiple resume versions
- **Job History Tracking**: Keep track of all your applications
- **Real-time Processing**: Fast AI processing with Redis caching
- **Responsive Design**: Modern UI built with Chakra UI

## 📁 Project Structure

```
ai-job-application-assistant/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js 13+ app directory
│   │   ├── components/      # React components
│   │   ├── lib/            # Utilities and configurations
│   │   └── types/          # TypeScript type definitions
│   ├── package.json
│   └── next.config.js
├── backend/                 # NestJS backend API
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── user/           # User management
│   │   ├── resume/         # Resume operations
│   │   ├── job/            # Job history management
│   │   ├── ai/             # AI service integration
│   │   ├── cache/          # Redis caching
│   │   └── prisma/         # Database service
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── package.json
│   └── Dockerfile
├── .github/
│   └── workflows/
│       └── ci.yml          # CI/CD pipeline
├── docker-compose.yml      # Development environment
├── package.json           # Root package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Chakra UI** - Modern component library
- **NextAuth.js** - Authentication with OAuth providers
- **React Hook Form** - Form handling with validation
- **Axios** - HTTP client for API calls

### Backend
- **NestJS** - Scalable Node.js framework
- **TypeScript** - Type-safe development
- **Prisma** - Modern database ORM
- **PostgreSQL** - Primary database
- **Redis** - Caching and session storage
- **OpenAI GPT-4** - AI-powered content generation
- **JWT** - Secure authentication
- **Swagger** - API documentation

### DevOps
- **Docker** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **ESLint & Prettier** - Code quality and formatting

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 8+
- Docker and Docker Compose
- PostgreSQL (or use Docker)
- Redis (or use Docker)
- OpenAI API key

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-job-application-assistant
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

### 3. Environment Setup

#### Frontend Environment
```bash
cd frontend
cp env.example .env.local
```

Edit `frontend/.env.local`:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### Backend Environment
```bash
cd backend
cp env.example .env
```

Edit `backend/.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_job_assistant?schema=public"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-jwt-secret-here"
OPENAI_API_KEY="your-openai-api-key-here"
PORT=3001
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3000"
```

### 4. Database Setup

#### Option A: Using Docker (Recommended)
```bash
# Start PostgreSQL and Redis
docker-compose up postgres redis -d

# Wait for services to be ready, then run migrations
cd backend
npm run prisma:migrate
npm run prisma:generate
```

#### Option B: Local Installation
```bash
# Install PostgreSQL and Redis locally
# Create database: ai_job_assistant
# Update DATABASE_URL in backend/.env

cd backend
npm run prisma:migrate
npm run prisma:generate
```

### 5. Start Development Servers

#### Option A: Start Both Services
```bash
# From root directory
npm run dev
```

#### Option B: Start Separately
```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api/docs

## 🔧 Development

### Available Scripts

#### Root Level
```bash
npm run dev              # Start both frontend and backend
npm run build            # Build both applications
npm run lint             # Lint both applications
npm run format           # Format code with Prettier
npm run install:all      # Install all dependencies
```

#### Frontend
```bash
cd frontend
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript checks
```

#### Backend
```bash
cd backend
npm run start:dev        # Start development server
npm run build            # Build for production
npm run start:prod       # Start production server
npm run lint             # Run ESLint
npm run prisma:studio    # Open Prisma Studio
npm run prisma:migrate   # Run database migrations
```

### Database Management

```bash
cd backend

# Generate Prisma client
npm run prisma:generate

# Create and apply migration
npm run prisma:migrate

# Reset database
npm run prisma:migrate:reset

# Open Prisma Studio
npm run prisma:studio
```

## 🚀 Deployment

### Railway Deployment (Recommended)

This application is configured for easy deployment on Railway. See the comprehensive deployment guides:

- **Quick Setup**: [QUICK_RAILWAY_SETUP.md](./QUICK_RAILWAY_SETUP.md) - Deploy in 5 minutes
- **Full Guide**: [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) - Complete deployment instructions

### Alternative: Azure App Service

1. **Prepare for Deployment**
   ```bash
   cd backend
   npm run build
   ```

2. **Azure Configuration**
   - Create Azure App Service
   - Set Node.js version to 18
   - Configure environment variables
   - Set startup command: `npm run start:prod`

3. **Environment Variables**
   ```env
   DATABASE_URL=your-production-database-url
   REDIS_URL=your-production-redis-url
   JWT_SECRET=your-production-jwt-secret
   OPENAI_API_KEY=your-openai-api-key
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-domain.com
   ```

### Database (Production)

1. **PostgreSQL**
   - Use managed service (Azure Database, AWS RDS, etc.)
   - Run migrations: `npm run prisma:deploy`

2. **Redis**
   - Use managed service (Azure Cache, AWS ElastiCache, etc.)

## 🔐 OAuth Setup

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.com/api/auth/callback/google` (production)

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL:
   - `http://localhost:3000/api/auth/callback/github` (development)
   - `https://your-domain.com/api/auth/callback/github` (production)

## 📊 API Documentation

The API documentation is available at `/api/docs` when running the backend server. It includes:

- Authentication endpoints
- User management
- Resume operations
- Job history tracking
- AI-powered resume tailoring

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test              # Unit tests
npm run test:e2e          # End-to-end tests
npm run test:cov          # Coverage report

# Frontend tests (when implemented)
cd frontend
npm run test              # Unit tests
npm run test:e2e          # End-to-end tests
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Next.js team for the amazing framework
- NestJS team for the robust backend framework
- Chakra UI for the beautiful component library
- All contributors and users of this project

---

**Happy job hunting! 🎯**
