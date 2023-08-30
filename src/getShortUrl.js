import { Storage } from './data/Storage.js'

export const redirect = (req, res) => {
  const code = req.params.code

  const record = Storage.data.links.find((record) => record.code === code)

  if (record === undefined) {
    res.status(404).send('URL not found')
  }
  res.redirect(linkObject.url)
}
