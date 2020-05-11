const baseConfiguration = require('./baseConfiguration')

function config () {
	const configuration = baseConfiguration({
		stage: 'dev',
	})

	configuration.accountId = '065185725587'

	return configuration
}

module.exports = config()
module.exports.config = config