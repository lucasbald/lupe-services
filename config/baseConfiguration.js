function baseConfiguration ({
	stage, // example: dev, prodgreen.
}) {
	return {
		name: 'lupe-service',
		memorySize: 1024,
		stage,
		sourceEnvironment: `lupe-service-${stage}`,
	}
}

module.exports = baseConfiguration