# --------------------------------------------
# STAGE 1: Build the Spring Boot JAR
# --------------------------------------------
FROM maven:3.8.7-eclipse-temurin-17 AS builder

WORKDIR /workspace

# 1. Copy the parent POM (to download dependency metadata, but not yet application code)
COPY pom.xml .

# 2. Copy all module POMs
COPY pizza-domain/pom.xml pizza-domain/
COPY pizza-service/pom.xml pizza-service/
COPY pizza-service-american/pom.xml pizza-service-american/
COPY pizza-service-api/pom.xml pizza-service-api/
COPY pizza-web-lib/pom.xml pizza-web-lib/
COPY pizza-web/pom.xml pizza-web/

# 3. Download all dependencies WITHOUT doing the full compile
RUN mvn -B dependency:go-offline
# go-offline makes sure ALL dependencies are pulled in during this layer

# 4. Copy everything (all source code) into /workspace
COPY . .

# 5. Build the entire project.
RUN mvn -B clean package -DskipTests
# -B for "batch" is used in script-based builds

# After this, the built JAR lives at:
# /workspace/pizza-web/target/pizza-web-<version>.jar


# --------------------------------------------
# STAGE 2: Create a minimal runtime image
# --------------------------------------------
FROM eclipse-temurin:17-jre-jammy

# Create a non-root user
RUN useradd -ms /bin/bash springuser

# Make directories for app, config, logs and set ownership
RUN mkdir /app /config && \
    chown -R springuser:springuser /app /config

USER springuser
WORKDIR /app

# Copy the JAR from the builder stage (wildcard catches the exact version)
COPY --chown=springuser:springuser --from=builder \
     /workspace/pizza-web/target/*.jar app.jar

# Expose the port for our app
EXPOSE 8081

# Allow extra JVM args and externalized config
ENV JAVA_OPTS="" \
    SPRING_CONFIG_LOCATION="file:/config/" \
    SPRING_PROFILES_ACTIVE="default"

ENTRYPOINT [ "sh", "-c", \
    "java $JAVA_OPTS -Dspring.config.location=$SPRING_CONFIG_LOCATION -jar /app/app.jar" ]
