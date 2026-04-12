#!/bin/bash

# Exit immediately if any command fails
set -e

# Define colors for pretty output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Widget Deployment...${NC}"

# 2. Pull Code
echo -e "${BLUE}📥 Pulling latest code from main branch...${NC}"
git pull origin main
echo -e "${GREEN}✅ Code pulled successfully!${NC}"

# 3. Install Dependencies
echo -e "${BLUE}🛠️ Installing dependencies...${NC}"
npm ci
echo -e "${GREEN}✅ Dependencies installed successfully!${NC}"

# 4. Build the Widget
echo -e "${BLUE}🔨 Building the widget...${NC}"
npm run build
echo -e "${GREEN}✅ Widget built successfully!${NC}"

echo -e "${GREEN}🎉 Widget deployment completed successfully!${NC}"
