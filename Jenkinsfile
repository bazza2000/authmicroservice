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
        sh 'cp -rp target /artifacts'
      }
    }
    stage('Test') {
      agent {
        docker {
          image 'maven:3-alpine'
          args '-v /root/.m2:/root/.m2'
        }

      }
      steps {
        sh 'mvn -DforkCount=0 test'
      }
    }
    stage('Containerize') {
      steps {
        sh '''pwd
cd /mnt/target
ls -al
/usr/bin/docker build -t  ec2-63-34-137-130.eu-west-1.compute.amazonaws.com:8083/gs-rest-service:${env.BUILD_ID} .'''
      }
    }
  }
}