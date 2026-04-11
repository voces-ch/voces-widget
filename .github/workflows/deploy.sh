name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  # ------------------------------------
  # 1. PRODUCTION DEPLOYMENT
  # ------------------------------------
  deploy-production:
    runs-on: [deploy, prod]
    steps:
      - name: Execute Prod Deployment
        run: |
          cd /home/voces-widget/htdocs/widget.voces.ch
          ./deploy.sh

  # ------------------------------------
  # 2. DEMO DEPLOYMENT
  # ------------------------------------
  deploy-demo:
    runs-on: [deploy, demo]
    steps:
      - name: Execute Demo Deployment
        run: |
          cd /home/voces-widget-demo/htdocs/widget.demo.voces.ch
          ./deploy.sh
