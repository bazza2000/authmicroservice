pipeline {
  agent any
  stages {
    stage('Build') {
      agent {
        docker {
          image 'maven:3-alpine'
          args '-v /root/.m2:/root/.m2 -v /tmp:/artifacts'
        }

      }
      steps {
        sh 'mvn -B -DskipTests clean package'
        sh 'cp -rp target /artifacts'
        archiveArtifacts(artifacts: 'target/*.jar', fingerprint: true)
      }
    }
    stage('Containerize') {
      steps {
        sh " \
                                 pwd; ls -al /tmp/ ;\
                                 cp -rp /tmp/target . ;\
                                 /usr/bin/docker build -t  ${env.SERVICE_URL}:${env.SERVICE_PORT}/${env.APP_NAME}:${env.BUILD_ID} . \
                           "
      }
    }
  }
  environment {
    SERVICE_URL = 'ec2-34-241-55-249.eu-west-1.compute.amazonaws.com'
    SERVICE_PORT = '8083'
    APP_NAME = 'gs-rest-service'
    CONT_PORT = '8080'
  }
}
