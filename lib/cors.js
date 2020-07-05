function getHeader (origin) {
	let headers
	if (origin === 'http://localhost:3000'
		|| /^https:\/\/.*lup3solutions\.com$/g.test(origin)) {
		headers = {
			'Access-Control-Allow-Origin': origin,
			'Access-Control-Allow-Credentials': true,
			'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
			'Access-Control-Request-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key',
		}
	} else {
		headers = {
			'Access-Control-Allow-Origin': '*',
		}
	}
	return headers
}

module.exports = {
	getHeader,
}
