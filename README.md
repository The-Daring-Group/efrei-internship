# Main Readme

This is the main readme file for the Advanced Programming Project. There are 3 different services available :
- efrei-internship-back
- efrei-internship-bdd
- efrei-internship-front

## Launching all the project

To launch all the project, you can use the following command
```bash
./launch.sh
```
*\*Note: You need to have docker open*

## Back-end

1. Install dependencies
```bash
# npm
npm i
```

2. Start the development server on `http://localhost:8080`
```bash
# npm
npm run dev
```

## Database

Launch the database with the following command
```bash
# docker-compose
docker-compose up -d
```
And stop it with
```bash
docker-compose down
```

If there is changes in init.sql, you can use the following command
```bash
docker-compose up -d --build
```

## Front-end

1. Install dependencies
```bash
# npm
npm install 
```

2. Start the development server on `http://localhost:3000`
```bash
# npm
npm run dev
```