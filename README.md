# Main Readme

This is the main readme file for the Advanced Programming Project. There are 3 different services available :
- efrei-internship-back
- efrei-internship-bdd
- efrei-internship-front

*\*Note: You need to have docker open for next actions.*

## Launching all the project

To launch all the project, you can use the following command
```bash
./launch.sh
```
Add `--build` to rebuild the images.

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

## Back-end

For each service (auth, chat and internship-info), you can use the following command to install the dependencies and start the development server on `http://localhost:8080`.

```bash
# npm
npm start 
```

*It's also possible to test the services in fast reload mode with `npm run dev`.*

## Front-end

For both frontends (student and academic tutor), you can use the following command to install the dependencies and start the development server on `http://localhost:3000`.

```bash
# npm
npm start 
```