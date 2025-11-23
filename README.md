# TIE Fighters API

A REST API for managing TIE Fighter ships built with Node.js and Fastify.

## Architecture

```
tie-fighters/
├── handlers/          # Request handlers
│   └── ships.js
├── models/           # Data models
│   └── ship.js
├── routes/           # Route definitions
│   └── index.js
├── api/              # API specification
│   └── api.yaml
├── app.js            # Main application
├── Dockerfile        # Container configuration
└── deploy.sh         # GCP deployment script
```

- **Fastify**: Web framework for high performance
- **In-memory storage**: Ships stored in array (no external database)
- **RESTful API**: Standard HTTP methods and status codes

## Functionalities

- **List ships**: Get all TIE fighters
- **Create ship**: Add new TIE fighter
- **Get ship**: Retrieve specific ship by ID
- **Land ship**: Set ship as landed
- **Shoot**: Decrease ship bullets by 1

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

Server runs on `http://localhost:3000`

## Deploy to Google Cloud Run

1. Update `PROJECT_ID` in `deploy.sh`
2. Authenticate with GCP:
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```
3. Enable required services:
   ```bash
   gcloud services enable run.googleapis.com cloudbuild.googleapis.com
   ```
4. Deploy:
   ```bash
   ./deploy.sh
   ```

## Testing

### Health Check
```bash
curl http://localhost:3000/
```

### Get All Ships
```bash
curl http://localhost:3000/tie-fighters
```

### Create Ship
```bash
curl -X POST http://localhost:3000/tie-fighters \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "model": "TIE-Fighter",
      "bullets": 15,
      "landed": false,
      "pilot": "New Pilot",
      "alias": "new-fighter"
    }
  }'
```

### Get Specific Ship
```bash
curl http://localhost:3000/tie-fighters/1
```

### Land Ship
```bash
curl -X PUT http://localhost:3000/tie-fighters/1/land
```

### Shoot
```bash
curl -X PUT http://localhost:3000/tie-fighters/1/shoot
```

## API Documentation

See `api/api.yaml` for complete OpenAPI specification.

## Docker

```bash
# Build image
docker build -t tie-fighters .

# Run container
docker run -p 3000:3000 tie-fighters
```