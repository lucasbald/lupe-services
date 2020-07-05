// eslint-disable-next-line func-names
module.exports.handler = async (event, context) => {
	console.log('Hello begin')
	console.log('Context', context)
	console.log('Event', event)

	const sresponse = {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Allow-Origin': 'http://localhost:3000',
			'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
		},
		body: JSON.stringify({
			message: 'EVENT_PROCESSED',
			statusCode: 200001,
			input: event,
		}),
	}

	return sresponse
}
