const baseConfiguration = require('./baseConfiguration')

function config () {
	const configuration = baseConfiguration({
		stage: 'dev',
	})

	configuration.accountId = '140023301445'

	return configuration
}

module.exports = config()
module.exports.config = config
