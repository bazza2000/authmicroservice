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
        sh '''PATH=$PATH:/root/bin
#/root/bin/kubectl delete -f /root/demo-service.yaml
#cat /root/demo-service.yaml.1 | sed \\"s/JOB_NUMBER/20/g\\" > /root/demo-service.yaml
/root/bin/kubectl apply -f /root/demo-service.yaml'''
        echo 'Deploy Complete'
      }
    }
  }
}