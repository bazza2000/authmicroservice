FROM java:8
WORKDIR /
ADD target/gs-rest-service-0.1.0.jar .
# liveness.sh is a script to run curl against health url context.
ADD liveness.sh .
EXPOSE 8080
CMD java -jar gs-rest-service-0.1.0.jar
