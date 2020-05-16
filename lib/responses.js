const createSuccessResponse = (httpStatus, code, message, error) => ({
	statusCode: httpStatus,
	body: JSON.stringify({
		statusCode: code,
		message,
		hero: error || undefined,
	}),
})

const createResponse = (httpStatus, code, message, error) => ({
	statusCode: httpStatus,
	body: JSON.stringify({
		statusCode: code,
		message,
		error: error || undefined,
	}),
})

const defaultErrorResponses = {
	NO_CHAR_FOUND: createResponse(400, 400001, 'NO_CHAR_FOUND'),
	INVALID_QUERY_PARAMS: createResponse(400, 400002, 'INVALID_QUERY_PARAMS'),
	NO_CHAR_NAME: createResponse(400, 400003, 'NO_CHAR_NAME'),
}

module.exports = {
	createResponse,
	defaultErrorResponses,
	createSuccessResponse,
}
