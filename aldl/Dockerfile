FROM openjdk:11-jdk-alpine
ARG JAR_FILE=aldl.jar
COPY ${JAR_FILE} aldl.jar
ENTRYPOINT ["java","-jar","/aldl.jar"]