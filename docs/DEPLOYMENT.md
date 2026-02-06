# Deployment Guide for RiskLens

## Prerequisites
-   Node.js 18+
-   OpenAI API Key

## Environment Variables
Ensure these variables are set in your production environment (e.g., Vercel, Netlify, Docker).

```env
OPENAI_API_KEY=sk-...
```

## Build & Start
To build the application for production:

```bash
npm run build
npm start
```

## Vercel Deployment (Recommended)
1.  Push code to GitHub.
2.  Import project into Vercel.
3.  Add `OPENAI_API_KEY` in Vercel Project Settings > Environment Variables.
4.  Deploy.

## Persistence Note
This MVP uses a **local JSON file** (`data/db.json`) for storage.
-   **On Vercel/Serverless**: This data WILL NOT PERSIST across re-deploys or serverless function warm-ups.
-   **For Production**: You must replace `lib/storage.ts` with a real database connector (PostgreSQL/MongoDB) before scaling.
