# GitHub Pages Deployment Guide

## Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Push your code to GitHub:**
   - Create a new repository on GitHub named `stand-alone-facing-app`
   - Push your code to the main branch

3. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

## What happens during deployment:

1. Builds the Angular app with the correct base href (`/stand-alone-facing-app/`)
2. Uses `angular-cli-ghpages` to deploy the built files to the `gh-pages` branch
3. GitHub Pages automatically serves from the `gh-pages` branch

## Your app will be available at:
`https://[your-username].github.io/stand-alone-facing-app/`

## Important Notes:

- The Cerner config automatically detects if running on GitHub Pages and adjusts the redirect URI accordingly
- Make sure to update your Cerner app registration to include the GitHub Pages URL as an allowed redirect URI
- The first deployment may take a few minutes to become available

## Troubleshooting:

- If deployment fails, ensure you have push access to the repository
- Check that GitHub Pages is enabled in your repository settings
- Verify the repository name matches the base href in the deploy script