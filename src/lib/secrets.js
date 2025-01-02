const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm')

const getDatabaseUrl = async () => {
  const client = new SSMClient({ region: process.env.REGION_NAME })
  const paramStoreData = {
    Name: process.env.DATABASE_URL_SSM_PARAM,
    WithDecryption: true,
  }
  const command = new GetParameterCommand(paramStoreData)
  const result = await client.send(command)
  return result.Parameter.Value
}

module.exports.getDatabaseUrl = getDatabaseUrl
