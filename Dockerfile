FROM java:8
WORKDIR /
ADD target/gs-rest-service-0.1.0.jar .
ADD liveness.sh .
EXPOSE 8080
CMD java -jar gs-rest-service-0.1.0.jar
