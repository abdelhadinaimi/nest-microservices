# nest-microservices
Small user management system using nest microservices

To start up the project execute up.sh in scripts/


# Architecture
This project uses a microservices architecture, it uses an API Gateway and a message broker to publish and consume events.
This diagram shows how the api gateway responds to an incoming request :
<img src="https://lh6.googleusercontent.com/9xVAh_Cis8iVnryNvzECHTOQiAmaku1hQE2M9UZOggsJ9nHQMtgvxgRxiQYOblR4RVCi0NdGNOTPWgU-sBOM=w1366-h672"/>

Authentification and authorization is done thru a JWT Token using Auth0.

# References
* https://microservices.io
* [Martin Flowler's blog post on CQRS](https://martinfowler.com/bliki/CQRS.html)
* https://github.com/kamilmysliwiec/nest-cqrs-example/
* [herbertograca's blog](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)
