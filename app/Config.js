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
var metricsOptions = {			// You can use either or both metric and log collection.
	namespace: 'test-data',
	timeout: 60					// See below for a complete list of options
};

export { awsOptions, logsOptions,metricsOptions};