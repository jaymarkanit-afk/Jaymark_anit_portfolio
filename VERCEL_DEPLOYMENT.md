# Vercel Deployment Guide

Your Jaymark Portfolio is now configured for Vercel deployment!

## Prerequisites

- Git repository initialized and pushed to GitHub
- Vercel account (free at https://vercel.com)

## Deployment Steps

### 1. **Prepare Your Project**

All necessary configuration files have been created:

- `vercel.json` - Vercel build configuration
- `.vercelignore` - Files to exclude from deployment
- `.gitignore` - Git ignore rules

### 2. **Deploy via Vercel Dashboard (Easiest)**

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select "Other" as framework preset
4. Click **Deploy**
5. Your app will be live at a URL like `your-project.vercel.app`

### 3. **Deploy via Vercel CLI**

```bash
npm install -g vercel
vercel
```

Follow the prompts to deploy your project.

### 4. **Automatic Deployments**

Once connected to GitHub, Vercel will automatically deploy on every push to your main branch.

## Important Notes

### File Uploads

- Uploaded files are stored in `/tmp` on Vercel (temporary)
- Files persist during the function execution but are cleared between deployments
- For persistent storage, consider:
  - **Cloudinary** (free tier available)
  - **AWS S3** (free tier available)
  - **Firebase Storage** (free tier available)
  - **MongoDB with file storage** (free tier available)

### Environment Variables

If you need to add environment variables (e.g., API keys, database URLs):

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add your variables
4. Redeploy

### Local Development

To test locally:

```bash
npm install
npm start
```

Visit `http://localhost:3000`

### Project Structure

Your project is correctly structured for Vercel:

- Server entry point: `server/index.js`
- Views: `views/` (EJS templates)
- Static files: `styles/`, `images/`, `javascript/`, `public/`
- Data: `data/` (JSON files)

## Troubleshooting

**Build fails?**

- Check that `package.json` has a `start` script ✓
- Ensure all dependencies are listed in `package.json` ✓
- Verify Node.js version compatibility

**Routes not working?**

- The `vercel.json` routes all traffic to `server/index.js` ✓

**Uploads not persisting?**

- This is expected on Vercel. Use cloud storage for permanent file storage.

## Next Steps

1. Push your code to GitHub
2. Visit https://vercel.com/new and import your repository
3. Your portfolio will be live!

For more info: https://vercel.com/docs
