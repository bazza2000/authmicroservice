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
        archiveArtifacts(artifacts: 'target/*.jar', fingerprint: true)
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
        sh '''cp -rp /mnt/target .
cp /mnt/liveness.sh .
/usr/bin/docker build -t  ec2-63-34-137-130.eu-west-1.compute.amazonaws.com:8083/gs-rest-service:21 .'''
      }
    }
    stage('Push Image') {
      steps {
        sh '''/usr/bin/docker login -u admin -p admin123 ec2-63-34-137-130.eu-west-1.compute.amazonaws.com:8083
/usr/bin/docker push ec2-63-34-137-130.eu-west-1.compute.amazonaws.com:8083/gs-rest-service'''
      }
    }
    stage('Kubernetes Deploy') {
      agent {
        node {
          label 'jenkins_host'
        }

      }
      steps {
        sh " \
                PATH=$PATH:/root/bin ; \
                cat demo-service.yaml.template  |\
                sed \"s/JOB_NUMBER/${env.BUILD_ID}/g\" |\
                sed \"s/SERVICE_URL:SERVICE_PORT/${env.SERVICE_URL}:${env.SERVICE_PORT}/g\" |\
                sed \"s/APP_NAME/${env.APP_NAME}/g\" > demo-service.yaml; \
                /root/bin/kubectl delete -f demo-service.yaml \
                /root/bin/kubectl apply -f demo-service.yaml \
                "
        echo 'Deploy Complete'
      }
    }
  }
  environment {
    SERVICE_URL = 'ec2-63-34-137-130.eu-west-1.compute.amazonaws.com'
    SERVICE_PORT = '8083'
    APP_NAME = 'gs_rest_service'
  }
}