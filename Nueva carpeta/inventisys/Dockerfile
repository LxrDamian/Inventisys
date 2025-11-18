# =========================
# 1) Etapa de build (Maven)
# =========================
FROM eclipse-temurin:21-jdk AS build

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos archivos de Maven primero para aprovechar la caché de dependencias
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw mvnw
COPY mvnw.cmd mvnw.cmd

# Descargamos dependencias (sin compilar aún)
RUN chmod +x mvnw && ./mvnw -q dependency:go-offline

# Copiamos el código fuente
COPY src src

# Compilamos y generamos el .jar
RUN ./mvnw -q clean package -DskipTests

# =========================
# 2) Etapa de runtime (solo JRE)
# =========================
FROM eclipse-temurin:21-jre

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el jar desde la etapa de build
# Ajusta el nombre si tu jar final es diferente
COPY --from=build /app/target/*.jar app.jar

# Puerto por defecto de Spring Boot
EXPOSE 8080

# Variables de entorno típicas (puedes sobreescribir al correr el contenedor)
ENV SPRING_PROFILES_ACTIVE=default

# Comando de arranque
ENTRYPOINT ["java", "-jar", "app.jar"]
