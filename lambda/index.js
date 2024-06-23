const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { startDate, endDate } = event.queryStringParameters;

    const params = {
        TableName: process.env.TABLE_NAME,
        FilterExpression: '#date BETWEEN :start_date AND :end_date',
        ExpressionAttributeNames: {
            '#date': 'Date'
        },
        ExpressionAttributeValues: {
            ':start_date': startDate,
            ':end_date': endDate
        }
    };

    try {
        const data = await dynamodb.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Allow CORS for development
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not fetch newsletters' }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};
