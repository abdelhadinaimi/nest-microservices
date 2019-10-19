# nest-microservices
Small user management system using nest microservices

To start up the project execute up.sh in scripts/


# Architecture
This project uses a microservices architecture, it uses an API Gateway and a message broker to publish and consume events.
This diagram shows the how the api gateway responds to an incoming request :
<img src="https://lh5.googleusercontent.com/3IULGZvBRV3LU9T_9-e1c_WSVkBrJwvY7VzezciQBqCGGEtLTbTtSCAbYoGA2BLvdXyluD5dOlnmeMNJP9wm=w1366-h672"/>

Authentification and authorization is done thru a JWT Token using Auht0.
