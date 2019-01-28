pipeline {
  agent {
    docker {
      image 'maven:3-alpine'
      args '-v /root/.m2:/root/.m2'
    }

  }
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
          image 'maven:3=-'
        }

      }
      steps {
        sh 'mvn test'
      }
    }
  }
}