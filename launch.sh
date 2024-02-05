#!/bin/bash

# Ajout d'un paramètre facultatif pour ajouter --build à la commande docker-compose up
if [ "$1" == "--build" ]; then
    BUILD="--build"
else
    BUILD=""
fi

# Se positionner dans le répertoire du script
cd "$(dirname "$0")"

# Start the database
echo "Starting the database..."
docker-compose -f ./efrei-internship-bdd/docker-compose.yml up -d $BUILD

if [ $? -ne 0 ]; then
    echo "Error while starting the database, be sure to have Docker installed and running."
    exit 1
fi

# Start services of the backend
echo "Starting services of the backend..."
npm start --prefix ./efrei-internship-back/services/ei-service-auth &
PID_ei_service_auth=$!
npm start --prefix ./efrei-internship-back/services/ei-service-chat &
PID_ei_service_chat=$!
npm start --prefix ./efrei-internship-back/services/ei-service-internship-info &
PID_ei_service_internship_info=$!

# Start the frontend
echo "Starting the frontend..."
npm start --prefix ./efrei-internship-front &
npm start --prefix ./efrei-internship-front-ta &

# Fonction de nettoyage
function clean_up {
    echo "Cleaning up..."
    docker-compose -f ./efrei-internship-bdd/docker-compose.yml stop
    
    exit
}

# Nettoyer les processus et les conteneurs en cas d'interruption
trap clean_up SIGINT

# Wait for the cleanup
wait
