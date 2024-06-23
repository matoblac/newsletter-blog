# Newsletter Blog

This project sets up a newsletter blog using AWS CDK, DynamoDB, Lambda, API Gateway, and S3. The frontend is built with HTML, CSS, and JavaScript.

## Setup Instructions

1. git clone https://github.com/matoblac/newsletter-blog.git
2. cd newsletter-blog
3. npm install
4. cdk bootstrap
5. cdk synth
6. cdk deploy
7. aws s3 sync frontend s3://<bucket-name>


### Prerequisites

- AWS Account
- AWS CLI installed and configured