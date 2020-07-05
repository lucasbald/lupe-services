# README
Install serverless:
npm install -g serverless@1.35

Deploy locally:
serverless deploy -s dev --service frontEnd --dev
serverless deploy -s prod --service frontEnd --prod

serverless deploy -f getHeroV1 -s dev --service frontEnd --dev
