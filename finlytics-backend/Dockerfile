FROM eclipse-temurin:17-jre
WORKDIR/app
COPY target/finlytics-backend-0.0.1-SNAPSHOT.jar finlytics-v1.0.jar
EXPOSE 9090
ENTRYPOINT ["java","-jar","finlytics-v1.0.jar"]