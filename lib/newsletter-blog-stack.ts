import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as s3 from '@aws-cdk/aws-s3';

export class NewsletterBlogStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 Bucket for storing frontend assets
    const bucket = new s3.Bucket(this, 'FrontendBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Create DynamoDB table
    const table = new dynamodb.Table(this, 'NewslettersTable', {
      partitionKey: { name: 'NewsletterID', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'Date', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Create Lambda function
    const lambdaFunction = new lambda.Function(this, 'GetNewslettersFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    // Grant the Lambda function read permissions to the DynamoDB table
    table.grantReadData(lambdaFunction);

    // Create API Gateway
    const api = new apigateway.RestApi(this, 'NewslettersApi', {
      restApiName: 'Newsletters Service',
      description: 'This service serves newsletters.',
    });

    const getNewslettersIntegration = new apigateway.LambdaIntegration(lambdaFunction, {
      requestTemplates: { 'application/json': '{"statusCode": 200}' },
    });

    api.root.addMethod('GET', getNewslettersIntegration); // GET /

    // Output the S3 bucket URL
    new cdk.CfnOutput(this, 'FrontendBucketURL', {
      value: bucket.bucketWebsiteUrl,
      description: 'The URL of the S3 bucket hosting the frontend',
    });

    // Output the API URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'The URL of the API Gateway endpoint',
    });
  }
}
