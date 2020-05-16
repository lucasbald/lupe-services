const baseConfiguration = require('./baseConfiguration')

function config () {
	const configuration = baseConfiguration({
		stage: 'dev',
	})

	return configuration
}

module.exports = config()
module.exports.config = config
