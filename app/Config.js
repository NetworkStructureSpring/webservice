var awsOptions = {
	region: 'us-east-1'			// Required. You must enter a valid AWS region
};

var logsOptions = {
	logGroup: 'amazon-cloudwatch-agent.log',
	timeout: 60,
	maxSize: 10000,
	addInstanceId: true,
	addTimestamp: true,
	logFormat: 'string',
	debug: true,
};

export { awsOptions, logsOptions};