const AWS = require('aws-sdk')
const bunyan = require('bunyan')

const log = bunyan.createLogger({ name: 'getHeroV1' })
const s3 = new AWS.S3()

async function handler (event) {
	log.info({}, 'Get Hero begin')
	log.info(event, 'Event')

	const pathParams = event.queryStringParameters
	const params = {
		Bucket: process.env.CHAR_BUCKET,
	}

	const allKeys = await listAllKeys(params)

	if (!allKeys) {
		log.info('Get Hero begin1')
		const eresponse = {
			status: 400,
			body: JSON.stringify({
				message: 'NO_CHAR_FOUND',
				statusCode: 400001,
			}),
		}

		return eresponse
	}

	if (!pathParams) {
		log.info('Get Hero begin2')
		const eresponse = {
			status: 400,
			body: JSON.stringify({
				message: 'INVALID_QUERY_PARAMS',
				statusCode: 400002,
			}),
		}

		return eresponse
	}

	if (!pathParams.heroName) {
		log.info('Get Hero begin3')
		const eresponse = {
			status: 400,
			body: JSON.stringify({
				message: 'NO_CHAR_NAME',
				statusCode: 400003,
			}),
		}

		return eresponse
	}

	params.Key = pathParams.heroName
	let heroData

	try {
		heroData = await s3.getObject(params).promise()
	} catch (error) {
		const eresponse = {
			status: 400,
			body: JSON.stringify({
				message: 'NO_CHAR_WITH_THIS_NAME',
				statusCode: 400004,
				error: error.message,
			}),
		}

		return eresponse
	}

	const sresponse = {
		statusCode: 200,
		body: JSON.stringify({
			message: 'CHAR_FOUND',
			statusCode: 200001,
			hero: JSON.parse(heroData.Body.toString('ascii')),
		}),
	}

	return sresponse
}

async function listAllKeys (params) {
	const s3Params = params
	const allObjects = []

	try {
		await s3.listObjectsV2(params, (err, data) => {
			if (err) {
				log.info(err, err.stack) // an error occurred
			} else {
				const contents = data.Contents
				contents.forEach((content) => {
					allObjects.push(content.Key)
				})

				if (data.IsTruncated) {
					s3Params.ContinuationToken = data.NextContinuationToken
					log.info('get further list...')
					listAllKeys(s3Params)
				}
			}
		}).promise()
	} catch (error) {
		log.info(error)
	}

	return allObjects
}

module.exports.handler = handler
