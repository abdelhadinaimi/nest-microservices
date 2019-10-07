# Use maven image to build our app
FROM maven:latest AS app
WORKDIR /usr/src/media-service
# Copy the pom file to our container
COPY pom.xml .
# Resolve our dependencies in the container using the default settings-docker
RUN mvn -B -f pom.xml -s /usr/share/maven/ref/settings-docker.xml dependency:resolve
# We copy our sources
COPY . .
# Package our app using settings-docker.xml
RUN mvn -B -s /usr/share/maven/ref/settings-docker.xml package -DskipTests


FROM jboss/wildfly
# copy our built app to wildfly deployment folder
WORKDIR /opt/jboss/wildfly/standalone/deployments/
COPY --from=app /usr/src/media-service/target/media-service-1.0-SNAPSHOT.war media-service.war