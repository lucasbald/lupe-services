function baseConfiguration ({
	stage, // example: dev, prodgreen.
}) {
	return {
		name: 'lupe-service',
		memorySize: 1024,
		stage,
		sourceEnvironment: `lupe-service-${stage}`,
		charBucket: `lupe-${stage}-char`,
	}
}

module.exports = baseConfiguration
