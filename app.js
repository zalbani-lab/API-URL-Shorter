import express from 'express'
import 'dotenv/config'

import { Storage } from './src/data/Storage.js'
import { shortURL } from './src/postShortUrl.js'
import { redirect } from './src/getShortUrl.js'

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
