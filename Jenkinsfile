pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'ahish2006/react-physio-app:latest'  // Replace with your actual DockerHub username
    }

    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: 'github-credentials', url: 'https://github.com/AHISH17052006/NAAN-MUDHALVAN.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat "docker build -t %DOCKER_IMAGE% ."
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        bat "docker login -u %DOCKER_USER% -p %DOCKER_PASS%"
                        bat "docker push %DOCKER_IMAGE%"
                        bat "docker logout"
                    }
                }
            }
        }

        stage('Deploy (Optional)') {
            steps {
                echo 'Deployment step can be added here.'
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed. Check logs above.'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
    }
}
