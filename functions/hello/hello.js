const cors = require('../../lib/cors')

// eslint-disable-next-line func-names
module.exports.handler = async (event, context) => {
	console.log('Hello begin')
	console.log('Context', context)
	console.log('Event', event)

	const headers = cors.getHeader(event.headers.origin)

	const sresponse = {
		statusCode: 200,
		headers,
		body: JSON.stringify({
			message: 'EVENT_PROCESSED',
			statusCode: 200001,
			input: event,
		}),
	}

	return sresponse
}
