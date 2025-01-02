const { z } = require('zod')

const validateLead = async (postData) => {
  const lead = z.object({
    email: z.string().email(),
  })
  let hasError
  let validData = {}
  let message
  try {
    validData = lead.parse(postData)
    hasError = false
    message = ''
  } catch (error) {
    hasError = true
    message = 'Invalid email please try again'
  }
  return {
    data: validData,
    hasError,
    message,
  }
}

module.exports = {
  validateLead,
}
