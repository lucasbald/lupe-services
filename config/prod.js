const baseConfiguration = require('./baseConfiguration')

function config () {
	const configuration = baseConfiguration({
		stage: 'prod',
	})

	return configuration
}

module.exports = config()
module.exports.config = config
