FROM postgres:16.1-alpine3.19
COPY init.sql /docker-entrypoint-initdb.d/
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
EXPOSE 5432