pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-creds'
        IMAGE_BACKEND = 'aryasingh55/backend:v1'
        IMAGE_FRONTEND = 'aryasingh55/frontend:v1'
        STACK_NAME = 'devopsapp'
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Aryagithubk/devops_prac1.git'
            }
        }

        stage('Build docker images (Parallel)') {
            parallel {
                stage('Build backend') {
                    steps {
                        script {
                            docker.build("${IMAGE_BACKEND}", 'backend/')
                        }
                    }
                }

                stage('Build frontend') {
                    steps {
                        script {
                            docker.build("${IMAGE_FRONTEND}", 'frontend/')
                        }
                    }
                }
            }

        }

       stage('Push docker images (Parallel)') {
            parallel {
                stage('Push Backend') {
                    steps {
                        script {
                            docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                                docker.image(IMAGE_BACKEND).push()
                            }
                        }
                    }
                }

                stage('Push Frontend') {
                    steps {
                        script {
                            docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                                docker.image(IMAGE_FRONTEND).push()
                            }
                        }
                    }
                }
            }
        }


        stage('Deploy to docker swarm') {
            steps {
                script {

                    sh 'docker network inspect appnet || docker network create --driver overlay appnet'

                    sh "docker stack deploy -c ${COMPOSE_FILE} ${STACK_NAME}"
                }
            }
        }
    }

    post {
        success {
            echo 'successful deployment'
        }

        failure {
            echo 'deployment failed'
        }
    }
}
