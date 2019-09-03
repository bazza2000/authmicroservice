pipeline {
  agent any
  stages {
    stage('Build') {
      agent {
        docker {
          image 'maven:3-alpine'
          args '-v /root/.m2:/root/.m2 -v /mnt:/artifacts'
        }

      }
      steps {
        sh 'mvn -B -DskipTests clean package'
        //sh 'cp -rp target /artifacts'
        archiveArtifacts(artifacts: 'target/*.jar', fingerprint: true)
      }
    }
  }
  environment {
    SERVICE_URL = 'ec2-63-35-4-237.eu-west-1.compute.amazonaws.com'
    SERVICE_PORT = '8083'
    APP_NAME = 'gs-rest-service'
    CONT_PORT = '8080'
  }
}
