#!/bin/bash

echo "🚀 Setting up AI Job Application Assistant..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Start PostgreSQL and Redis
echo "📦 Starting PostgreSQL and Redis containers..."
docker-compose up postgres redis -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are healthy
echo "🔍 Checking service health..."
docker-compose ps

# Generate Prisma client for backend
echo "🔧 Generating Prisma client for backend..."
cd backend
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate dev --name init

cd ..

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Copy frontend/env.example to frontend/.env.local and add your OAuth credentials"
echo "2. Copy backend/env.example to backend/.env and add your OpenAI API key"
echo "3. Run 'npm run dev' to start both frontend and backend"
echo ""
echo "🌐 Access points:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:3001"
echo "- API Docs: http://localhost:3001/api/docs"
