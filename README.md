# Email Client Tech Task

This is a technical assessment project - an email client application built with React, TypeScript, and Vite.

## Architecture

The application consists of:

- **Frontend**: React + TypeScript application served via Vite
- **Backend**: Node.js server (`server.js`) providing API endpoints
- **Serverless Functions**: Netlify Functions deployed for email and folder management (`netlify/functions/`)

## Deployment

The application is deployed on Netlify with:
- Static frontend hosting
- Serverless functions for API endpoints (`emails.js`, `folders.js`)
- Automatic deployments from the main branch

## Getting Started

```bash
npm install
npm run start
```

The application will be available at `http://localhost:5173`
