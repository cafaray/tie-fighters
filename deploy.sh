#!/bin/bash

# Configuration
PROJECT_ID="lfs261-cicd-304112"
SERVICE_NAME="tie-fighters"
REGION="europe-west1"

# Build and deploy to Cloud Run
echo "Building and deploying to Google Cloud Run..."

gcloud run deploy $SERVICE_NAME \
  --source . \
  --platform managed \
  --region $REGION \
  --project $PROJECT_ID \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars ADDRESS=0.0.0.0

echo "Deployment complete!"
echo "Your service is available at: https://$SERVICE_NAME-$(gcloud config get-value project).$REGION.run.app"