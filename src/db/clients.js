const { neon, neonConfig } = require('@neondatabase/serverless')
const { drizzle } = require('drizzle-orm/neon-http')
const secrets = require('../lib/secrets')

const getDbClient = async () => {
  const dburl = await secrets.getDatabaseUrl()
  neonConfig.fetchConnectionCache = true
  const sql = neon(dburl)
  return sql
}

const getDrizzleDbClient = async () => {
  const sql = await getDbClient()
  return drizzle(sql)
}

module.exports = {
  getDbClient: getDbClient,
  getDrizzleDbClient: getDrizzleDbClient,
}
