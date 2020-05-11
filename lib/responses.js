const createResponse = (httpStatus, code, message) => ({
	status: httpStatus,
	response: {
		statusCode: code,
		message,
	},
})

const defaultResponses = {
	success: createResponse(200, 200, 'success'),
	internalServerError: createResponse(500, 500, 'Internal Server Error'),
}

const create = (httpStatus, message) => ({
	statusCode: httpStatus,
	body: message,
	headers: { 'content-type': 'text/plain; charset=utf-8' },
})

module.exports = {
	createResponse,
	create,
	defaultResponses,
}