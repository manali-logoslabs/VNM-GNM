# Render Deployment Guide

## Overview
This project is now production-ready for Render deployment. It consists of two separate services:
1. **Frontend** - React + Vite (static site)
2. **Backend** - Express.js API (Node.js)

## Prerequisites
- Render account (https://render.com)
- GitHub repository connected to Render
- GitHub personal access token (for private repos)

## Deployment Steps

### Step 1: Create Backend Service

1. Go to https://dashboard.render.com
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `vnm-gnm-solar-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm ci`
   - **Start Command:** `npm start`
   - **Root Directory:** `backend`

5. Set Environment Variables:
   ```
   NODE_ENV=production
   CORS_ORIGIN=https://vnm-gnm-solar-frontend.onrender.com
   ```

6. Click **Deploy**
7. Wait for deployment to complete
8. Copy the service URL (e.g., `https://vnm-gnm-solar-backend.onrender.com`)

### Step 2: Create Frontend Service

1. Click **New +** → **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name:** `vnm-gnm-solar-frontend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run preview`
   - **Root Directory:** (leave empty - root of repo)
   - **Publish Directory:** `dist`

4. Set Environment Variables:
   ```
   VITE_API_URL=https://vnm-gnm-solar-backend.onrender.com/api
   ```

5. Click **Deploy**
6. Wait for deployment to complete

### Step 3: Verify Deployment

1. Open frontend URL (e.g., `https://vnm-gnm-solar-frontend.onrender.com`)
2. Test these features:
   - Navigate to Calculator page
   - Test form submission
   - Check Network tab for API calls
   - Verify API calls go to backend service

### Step 4: Test API Endpoints

```bash
# Test health check
curl https://vnm-gnm-solar-backend.onrender.com/api/health

# Test calculation (POST)
curl -X POST https://vnm-gnm-solar-backend.onrender.com/api/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "monthlyConsumption": 1000,
    "sanctionedLoad": 10,
    "consumerType": "domestic"
  }'

# Test states endpoint (GET)
curl https://vnm-gnm-solar-backend.onrender.com/api/states
```

## Environment Variables Explained

### Frontend (.env)
- `VITE_API_URL`: Backend API base URL
  - Local: `http://localhost:5000/api`
  - Production: `https://vnm-gnm-solar-backend.onrender.com/api`

### Backend (.env)
- `NODE_ENV`: `production` (enables optimizations)
- `CORS_ORIGIN`: Frontend URL (restricts API access)
  - Local: `http://localhost:5173`
  - Production: `https://vnm-gnm-solar-frontend.onrender.com`

## Troubleshooting

### Frontend shows "API connection failed"
1. Check `VITE_API_URL` env var in frontend service
2. Verify backend service is running (`/api/health` should return 200)
3. Check browser Network tab for CORS errors

### CORS errors in console
1. Verify `CORS_ORIGIN` in backend matches frontend URL
2. Check for typos in domain names
3. Ensure `https://` is used in production

### Build fails
1. Check build logs in Render dashboard
2. Verify root directory is correct:
   - Frontend: root (or empty)
   - Backend: `backend`
3. Ensure all dependencies are in package.json

### Page not loading
1. Check Render service health (green status)
2. Wait for cold start (can take 30-60 seconds)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check service logs for errors

## Local Development

### Start Backend
```bash
cd backend
npm install
npm start
# Backend runs on http://localhost:5000
```

### Start Frontend
```bash
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

### Test Production Build Locally
```bash
# Build frontend
npm run build

# Start preview server
npm run preview
# Runs on http://localhost:4173

# In another terminal, start backend
cd backend
npm start
```

## Deployment with render.yaml

Alternatively, you can use the included `render.yaml` file:

1. Push changes to GitHub
2. Go to Render Dashboard
3. Click **New +** → **YAML**
4. Select your repository
5. Render will automatically create both services using `render.yaml`

## Cost Estimates

### Render Free Tier
- 750 hours/month of web service runtime
- Cold starts after 15 minutes of inactivity
- Suitable for low-traffic applications

### Render Starter Plan (~$10/month per service)
- Unlimited uptime
- No auto-sleep
- Recommended for production

## Next Steps

1. **Monitor Logs:** Use Render dashboard to check service logs
2. **Set Custom Domain:** Add your own domain in Render settings
3. **Enable Metrics:** Monitor CPU, memory, and response times
4. **Backup Database:** If using database, enable automatic backups
5. **CI/CD:** Render auto-deploys on push to main branch

## Rollback

If deployment fails:
1. Go to service in Render dashboard
2. Click **Deployments** tab
3. Select previous successful deployment
4. Click **Redeploy**

## Support

For issues:
- Check Render documentation: https://render.com/docs
- View service logs in Render dashboard
- Check GitHub Actions for CI/CD issues
