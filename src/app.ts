import express from 'express'
import 'dotenv/config'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json' assert { type: 'json' }

import { Storage } from './data/Storage.js'
import { shortURL } from './postShortUrl.js'
import { redirect } from './getShortUrl.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

if (Storage.data.links === undefined) {
  Storage.data.links = []
  Storage.write()
}

app.post('/', shortURL)
app.get('/:code([a-z0-9]{5})', redirect)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
