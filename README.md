
Nest Logo

A progressive Node.js framework for building efficient and scalable server-side applications.

NPM Version Package License NPM Downloads CircleCI Discord Backers on Open Collective Sponsors on Open Collective Donate us Support us Follow us on Twitter

Description
Nest framework TypeScript starter repository.

Project setup
$ npm install
Compile and run the project
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
Run tests
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
Deployment
When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the deployment documentation for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out Mau, our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

$ npm install -g @nestjs/mau
$ mau deploy
With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

Observability
In production applications, observability is essential for understanding how your system behaves, detecting issues early, and maintaining reliable performance.

NestJS Observe automatically instruments your NestJS application, giving you deep visibility into your system with minimal setup:

Distributed tracing: Follow requests across services and understand how they flow through your system.
Waterfall analysis: Visualize request execution and identify slow operations, bottlenecks, and unexpected delays.
Performance analysis: Analyze application performance in real time and quickly pinpoint areas that need optimization.
Metrics: Track key application and infrastructure metrics to understand system health and performance trends.
Logging: Centralize and correlate logs with traces and other telemetry to make debugging easier.
Error tracking: Detect errors quickly and investigate their root causes with the surrounding context.
SLA monitoring: Track service-level objectives and identify when your application is approaching or exceeding defined thresholds.
Alarms and alerts: Set up alerts for critical errors, performance degradation, SLA violations, and other anomalies so your team can react quickly.
To add it to this project:

$ npm install @nestjs/observe
Then follow the setup guide - it takes a single import and an app key.

The free plan needs no payment details and covers 300,000 events a month. You can also browse the live demo first - the whole dashboard over a busy service's data, with nothing to install.

Resources
Check out a few resources that may come in handy when working with NestJS:

Visit the NestJS Documentation to learn more about the framework.
For questions and support, please visit our Discord channel.
To dive deeper and get more hands-on experience, check out our official video courses.
Deploy your application to AWS with the help of NestJS Mau in just a few clicks.
Auto-instrument your application with NestJS Observe. Distributed tracing, metrics, and logging made easy. Error tracking and performance monitoring for your NestJS applications.
Visualize your application graph and interact with the NestJS application in real-time using NestJS Devtools.
Need help with your project (part-time to full-time)? Check out our official enterprise support.
To stay in the loop and get updates, follow us on X and LinkedIn.
Looking for a job, or have a job to offer? Check out our official Jobs board.
Support
Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please read more here.

Stay in touch
Author - Kamil Myśliwiec
Website - https://nestjs.com
Twitter - @nestframework
License
Nest is MIT licensed.
