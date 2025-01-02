const { timestamp } = require('drizzle-orm/mysql-core')
const { desc, eq } = require('drizzle-orm')
const clients = require('./clients')
const schemas = require('./schemas')

const newLead = async ({ email }) => {
  const db = await clients.getDrizzleDbClient()
  const result = await db
    .insert(schemas.LeadTable)
    .values({
      email: email,
    })
    .returning({ timestamp: schemas.LeadTable.createdAt })
  if (result.length === 1) {
    return result[0]
  }
  return result
}

const listLeads = async () => {
  const db = await clients.getDrizzleDbClient()
  const results = await db
    .select()
    .from(schemas.LeadTable)
    .orderBy(desc(schemas.LeadTable.createdAt))
    .limit(10)
  return results
}

const getLead = async (id) => {
  const db = await clients.getDrizzleDbClient()
  const result = await db
    .select()
    .from(schemas.LeadTable)
    .where(eq(schemas.LeadTable.id, id))
  if (result.length === 1) {
    return result[0]
  }
  return null
}

module.exports = {
  newLead: newLead,
  listLeads: listLeads,
  getLead: getLead,
}
