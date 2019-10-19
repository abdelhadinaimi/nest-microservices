# nest-microservices
Small user management system using nest microservices

To start up the project execute up.sh in scripts/


# Architecture
This project uses a microservices architecture, it uses an API Gateway and a message broker to publish and consume events.
This diagram shows the how the api gateway responds to an incoming request :
<img src="https://lh6.googleusercontent.com/9xVAh_Cis8iVnryNvzECHTOQiAmaku1hQE2M9UZOggsJ9nHQMtgvxgRxiQYOblR4RVCi0NdGNOTPWgU-sBOM=w1366-h672"/>

Authentification and authorization is done thru a JWT Token using Auht0.
