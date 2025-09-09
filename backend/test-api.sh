#!/bin/bash

# API Test Script for Resume Builder Backend
# Make sure backend is running on port 3001 before running this script

BASE_URL="http://localhost:3001/api/v1"
EMAIL="yuvrajgupta1808@gmail.com"

echo "=== Testing Resume Builder Backend API ==="
echo ""

# 1. Register/Login
echo "1. Testing Authentication..."
echo "   - Registering/Login user..."
RESPONSE=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"name\":\"Test User\"}")

TOKEN=$(echo $RESPONSE | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "   ❌ Failed to get access token"
  echo "   Response: $RESPONSE"
  exit 1
else
  echo "   ✅ Got access token: ${TOKEN:0:50}..."
fi

# 2. Test protected profile endpoint
echo ""
echo "2. Testing Protected Endpoints..."
echo "   - Getting user profile..."
PROFILE=$(curl -s -H "Authorization: Bearer $TOKEN" $BASE_URL/user/profile)
if echo "$PROFILE" | grep -q "email"; then
  echo "   ✅ Profile endpoint working"
  echo "   Response: $PROFILE"
else
  echo "   ❌ Profile endpoint failed"
  echo "   Response: $PROFILE"
fi

# 3. Test user stats
echo ""
echo "   - Getting user stats..."
STATS=$(curl -s -H "Authorization: Bearer $TOKEN" $BASE_URL/user/stats)
if echo "$STATS" | grep -q "totalResumes"; then
  echo "   ✅ Stats endpoint working"
  echo "   Response: $STATS"
else
  echo "   ❌ Stats endpoint failed"
  echo "   Response: $STATS"
fi

# 4. Test resume upload (create a test file)
echo ""
echo "3. Testing Resume Upload..."
echo "   - Creating test resume file..."
echo "John Doe - Software Engineer Resume" > test-resume.txt
echo "   - Uploading resume..."
RESUME_RESPONSE=$(curl -s -X POST $BASE_URL/resumes \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=Test Resume" \
  -F "content=John Doe - Software Engineer with 5 years experience..." \
  -F "originalContent=John Doe - Software Engineer with 5 years experience..." \
  -F "file=@test-resume.txt")

RESUME_ID=$(echo $RESUME_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

if [ -z "$RESUME_ID" ]; then
  echo "   ❌ Resume upload failed"
  echo "   Response: $RESUME_RESPONSE"
else
  echo "   ✅ Resume uploaded successfully"
  echo "   Resume ID: $RESUME_ID"
fi

# 5. Test getting resumes
echo ""
echo "4. Testing Resume Retrieval..."
echo "   - Getting all resumes..."
RESUMES=$(curl -s -H "Authorization: Bearer $TOKEN" $BASE_URL/resumes)
if echo "$RESUMES" | grep -q "Test Resume"; then
  echo "   ✅ Resume list endpoint working"
else
  echo "   ❌ Resume list endpoint failed"
  echo "   Response: $RESUMES"
fi

# 6. Test AI tailor resume (if resume was created)
if [ ! -z "$RESUME_ID" ]; then
  echo ""
  echo "5. Testing AI Resume Tailoring..."
  echo "   - Tailoring resume for job..."
  AI_RESPONSE=$(curl -s -X POST $BASE_URL/ai/tailor-resume \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"resumeId\":\"$RESUME_ID\",
      \"jobTitle\":\"Senior Software Engineer\",
      \"company\":\"Tech Corp\",
      \"jobDescription\":\"We are looking for a Senior Software Engineer with experience in Node.js, React, and cloud technologies...\"
    }")
  
  if echo "$AI_RESPONSE" | grep -q "tailoredResume"; then
    echo "   ✅ AI tailoring endpoint working"
    JOB_ID=$(echo $AI_RESPONSE | grep -o '"jobHistoryId":"[^"]*"' | cut -d'"' -f4)
    echo "   Job History ID: $JOB_ID"
  else
    echo "   ❌ AI tailoring endpoint failed"
    echo "   Response: $AI_RESPONSE"
  fi
fi

# 7. Test job history
echo ""
echo "6. Testing Job History..."
echo "   - Getting job history..."
JOBS=$(curl -s -H "Authorization: Bearer $TOKEN" $BASE_URL/job-history)
if [ "$JOBS" != "[]" ]; then
  echo "   ✅ Job history endpoint working"
  echo "   Response: $JOBS"
else
  echo "   ℹ️  No job history found (this is normal for new users)"
fi

# Cleanup
rm -f test-resume.txt

echo ""
echo "=== API Test Complete ==="
echo ""
echo "Summary:"
echo "- Base URL: $BASE_URL"
echo "- Test Email: $EMAIL"
echo "- All endpoints should be working if you see ✅ marks above"
echo ""
echo "To test in Postman:"
echo "1. Use the token: $TOKEN"
echo "2. Add header: Authorization: Bearer <token>"
echo "3. For file uploads, use form-data with 'file' field"
