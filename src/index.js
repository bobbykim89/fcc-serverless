const serverless = require('serverless-http')
const express = require('express')
const { neon, neonConfig } = require('@neondatabase/serverless')
const app = express()

const dbClient = async () => {
  neonConfig.fetchConnectionCache = true
  const sql = neon(process.env.DATABASE_URL)
  return sql
}

app.get('/', async (req, res, next) => {
  console.log(process.env.DEBUG)
  const sql = await dbClient()
  const [results] = await sql`select now();`
  return res.status(200).json({
    message: 'Hello from root!',
    results: results.now,
  })
})

app.get('/hello', (req, res, next) => {
  return res.status(200).json({
    message: 'Hello from path!',
  })
})

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  })
})

// server-full app
// app.listen(3000, () => {
//   console.log('running at http://localhost:3000')
// })

exports.handler = serverless(app)
