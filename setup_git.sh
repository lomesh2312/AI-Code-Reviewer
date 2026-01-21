#!/bin/bash
set -e

# Initialize
git init
git config user.email "ai@codereview.com"
git config user.name "AI Code Reviewer"

# Ignore real .env files
echo ".env" > .gitignore
echo "node_modules" >> .gitignore
echo "dist" >> .gitignore
echo ".DS_Store" >> .gitignore

# 1. Project Configs
git add .gitignore package.json tsconfig.json tsconfig.node.json
git commit -m "Initial project setup with configuration files"

# 2. Frontend Configs
git add index.html vite.config.ts tailwind.config.js postcss.config.js
git commit -m "Initialize Frontend configuration (Vite, Tailwind)"

# 3. Firebase Setup
git add src/firebase.ts
git commit -m "Setup Firebase client configuration"

# 4. Backend Structure
git add backend/package.json backend/tsconfig.json
git commit -m "Initialize Backend project structure"

# 5. Backend Config
git add backend/src/config
git commit -m "Add backend configuration files"

# 6. Backend Middleware
git add backend/src/middleware
git commit -m "Implement authentication middleware"

# 7. Backend Controllers
git add backend/src/controllers
git commit -m "Add review controllers"

# 8. Backend Routes
git add backend/src/routes
git commit -m "Setup API routes"

# 9. Backend Server
git add backend/src/server.ts
git commit -m "Setup Express server and MongoDB connection"

# 10. Frontend Assets & Styles
git add src/index.css
git commit -m "Add global styles and assets"

# 11. Frontend Main Entry
git add src/main.tsx src/App.tsx
git commit -m "Setup React application entry point"

# 12. Frontend Components
git add src/components
git commit -m "Add UI components"

# 13. Frontend Pages
git add src/pages
git commit -m "Implement application pages (Auth, Dashboard, Review)"

# 14. API Integration
git add src/api.ts
git commit -m "Implement API integration service"

# 15. Final Polish
git add .
git commit -m "Final polish and remaining files"

# Verify
git log --oneline | wc -l
