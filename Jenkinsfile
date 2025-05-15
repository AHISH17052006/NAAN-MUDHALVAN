pipeline {
    agent any

    environment {
        IMAGE_NAME = "yourdockerhubusername/react-physio-app"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: 'github-credentials', url: 'https://github.com/YOUR_USERNAME/YOUR_REPO.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %IMAGE_NAME%:latest ."
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                    bat 'docker push %IMAGE_NAME%:latest'
                }
            }
        }

        stage('Deploy (Optional)') {
            steps {
                echo "Deployment steps go here"
            }
        }
    }
}
