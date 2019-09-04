pipeline {
  agent any
    triggers {
    GenericTrigger(
      genericVariables: [
        [key: 'ref', value: '$.ref']
      ],

      causeString: 'Triggered on $ref',

      token: 'demo',

      printContributedVariables: true,

      printPostContent: true,

      silentResponse: false,
    )
  }
  stages {
    stage('Build') {
      agent {
        docker {
          image 'maven:3.6.1-jdk-8-alpine'
          args '-v /root/.m2:/root/.m2 -v /root/artifacts:/artifacts --network sonar-qube_default'
        }

      }
      steps {
        sh 'mvn -B clean package sonar:sonar -Dsonar.host.url=http://sonarqube:9000'
        sh 'cp -rp target /artifacts'
        archiveArtifacts(artifacts: 'target/*.jar', fingerprint: true)
      }
      post {
        always {
            junit 'target/surefire-reports/*.xml'
        }
      }
    }
    stage('Containerize') {
      steps {
        sh "cp -rp /artifacts/target ." 
        sh "/usr/bin/docker build -t  ${env.SERVICE_URL}:${env.SERVICE_PORT}/${env.APP_NAME}:${env.BUILD_ID} . "
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
