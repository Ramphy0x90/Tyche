FROM amazoncorretto:19 as build

WORKDIR /app

COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .

RUN ./mvnw dependency:go-offline

COPY src src
RUN ./mvnw clean package -DskipTests

FROM amazoncorretto:19

WORKDIR /app

COPY --from=build tyche_server.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]