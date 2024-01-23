#!/bin/bash

# Se positionner dans le répertoire du script
cd "$(dirname "$0")"

# Start services of the backend
echo "Starting services of the backend..."
npm start --prefix ./efrei-internship-back/services/ei-service-auth &
npm start --prefix ./efrei-internship-back/services/ei-service-chat &
npm start --prefix ./efrei-internship-back/services/ei-service-internship-info &

# Start the database
echo "Starting the database..."
docker-compose -f ./efrei-internship-bdd/docker-compose.yml up -d --build

# Start the frontend
echo "Starting the frontend..."
npm start --prefix ./efrei-internship-front &
npm start --prefix ./efrei-internship-front-ta &
