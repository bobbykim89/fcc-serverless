const {
  SSMClient,
  GetParameterCommand,
  PutParameterCommand,
} = require('@aws-sdk/client-ssm')
const STAGE = process.env.STAGE

const getDatabaseUrl = async () => {
  const DATABASE_URL_SSM_PARAM = `/serverless-nodejs-api/${STAGE}/database-url`
  console.log(DATABASE_URL_SSM_PARAM)
  const client = new SSMClient({ region: process.env.REGION_NAME })
  const paramStoreData = {
    Name: DATABASE_URL_SSM_PARAM,
    WithDecryption: true,
  }
  const command = new GetParameterCommand(paramStoreData)
  const result = await client.send(command)
  return result.Parameter.Value
}

const putDatabaseUrl = async (stage, dbUrlVal) => {
  const paramStage = stage ? stage : 'dev'
  if (paramStage === 'prod') {
    return
  }
  if (!dbUrlVal) {
    return
  }
  const DATABASE_URL_SSM_PARAM = `/serverless-nodejs-api/${paramStage}/database-url`
  const client = new SSMClient({ region: process.env.REGION_NAME })
  // const paramStoreData = {
  //   Name: DATABASE_URL_SSM_PARAM,
  //   Value: dbUrlVal,
  //   Type: "SecureString",
  //   Overwrite: true
  // }
  const command = new PutParameterCommand({
    Name: DATABASE_URL_SSM_PARAM,
    Value: dbUrlVal,
    Type: 'SecureString',
    Overwrite: true,
  })
  const result = await client.send(command)
  return result
}

module.exports = {
  getDatabaseUrl,
  putDatabaseUrl,
}
