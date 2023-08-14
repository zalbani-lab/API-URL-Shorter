import express from 'express'
import 'dotenv/config'

import { Storage } from './src/data/Storage.js'
import { cutURL } from './src/cutURL.js'
import { redirect } from './src/redirect.js'

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())

if (Storage.data.links === undefined) {
  Storage.data.links = []
  Storage.write()
}

app.post('/cut', cutURL)
app.get('/:code([a-z0-9]{5})', redirect)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
