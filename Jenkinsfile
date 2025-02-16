pipeline {
    agent any
    tools {
        nodejs('22.0.0')  // Tên NodeJS đã cài trong Global Tool Configuration
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/khaiminh0401/qlda-angular.git'
            }
        }
        stage('Build') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Check podman') {
            steps {
                sh 'podman -v'
            }
        }
    }
}
