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

### Common Functionalities
- Login: Users can log in based on their roles.
- Fill out the Internship Specifications: Students and company tutors can collaboratively fill out internship specifications.
- Validate the Student's Final Report: Academic and company tutors can validate the intern's final report.
- Schedule Internship Presentation: Students and tutors can coordinate and schedule internship presentations.
- Fill out the Presentation Evaluation Form: Tutors evaluate intern presentations.
- Fill out the Intern's Report Evaluation Form: Tutors evaluate the intern's final report.

### Student Functionalities:
- Fill out Information for Internship Agreement: Students provide necessary details for internship agreements.
- Complete the Start-of-Internship Questionnaire: Students complete a questionnaire at the start of their internship.
- Ask Questions to the Academic Tutor: Students can communicate with academic tutors.
- Complete 1st, 2nd, and 3rd Self-evaluations: Students conduct self-evaluations during different stages of their internships.


### Academic Tutor Functionalities:
- Validate Internship Specifications [At]: Academic tutors validate internship specifications.
- Respond to Student Questions, if any [At]: Academic tutors respond to student queries.


### Connection
To connect yourself as a student (port 8000):
```bash
login: 12345678
password: 12345678
```

To connect as an academic tutor (port 8001):
```bash
login: academic.tutor@efrei.fr
password: admin
```