import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schemas.js',
  out: './src/migrations',
})

// const config = {
//   schema: './src/db/schemas.js',
//   out: './src/migrations',
// }

// export default config
