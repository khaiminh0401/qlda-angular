pipeline {
    agent any
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
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}
