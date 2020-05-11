async function handler (log, event, context) {
	console.log('Hello begin')
	console.log('Context', context)
	console.log('Event', event)

	// const suuid = event.headers['session-uuid']
	// const { body } = event.Records[0]
	// const { env } = JSON.parse(body)

	const sresponse = {
		statusCode: 200,
		body: JSON.stringify({
			message: 'EVENT_PROCESSED',
			statusCode: 200001,
			input: event,
		}),
	}

	// try {
	// 	console.log({ id }, 'Calling endpoint')
	// 	await asyncfunction(id, suuid, log, env)
	// 	console.log({ suuid }, 'Finished call')
	// } catch (e) {
	// 	const eresponse = {
	// 		statusCode: 400300,
	// 		message: 'FAILED_TO_DELETE',
	// 		SUUID: suuid,
	// 	}
	// 	return response.create(400, eresponse)
	// }

	return sresponse
}

module.exports.handler = handler
