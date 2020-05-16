const AWS = require('aws-sdk')
const bunyan = require('bunyan')
const response = require('../../lib/responses')

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
		return response.defaultErrorResponses.NO_CHAR_FOUND
	}

	if (!pathParams) {
		return response.defaultErrorResponses.INVALID_QUERY_PARAMS
	}

	if (!pathParams.heroName) {
		return response.defaultErrorResponses.NO_CHAR_NAME
	}

	params.Key = pathParams.heroName
	let heroData

	try {
		heroData = await s3.getObject(params).promise()
	} catch (error) {
		return response.createResponse(400, 400004, 'NO_CHAR_WITH_THIS_NAME', error.message)
	}

	return response.createSuccessResponse(200, 200001, 'CHAR_FOUND', JSON.parse(heroData.Body.toString('ascii')))
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
					log.info('Get further list...')
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
