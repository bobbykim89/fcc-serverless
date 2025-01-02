const serverless = require('serverless-http')
const express = require('express')
const { getDbClient } = require('./db/clients')
const crud = require('./db/crud')
const validators = require('./db/validators')

const app = express()
app.use(express.json())

app.get('/', async (req, res, next) => {
  console.log(process.env.DEBUG)
  const sql = await getDbClient()
  const [results] = await sql`select now();`
  return res.status(200).json({
    message: 'Hello from Pollito!',
    results: results.now,
  })
})

app.get('/hello', (req, res, next) => {
  return res.status(200).json({
    message: 'Hello from path!',
  })
})

app.get('/leads', async (req, res, next) => {
  const results = await crud.listLeads()
  return res.status(200).json({
    results: results,
  })
})

app.post('/leads', async (req, res, next) => {
  const body = await req.body
  const { data, hasError, message } = await validators.validateLead(body)
  if (hasError === true) {
    return res.status(400).json({
      message: message ? message : 'Invalid request. please try again',
    })
  } else if (hasError === undefined) {
    return res.status(500).json({
      message: 'Server Error',
    })
  }
  // insert data to the databasae
  const result = await crud.newLead(body)
  return res.status(201).json({
    results: result,
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
