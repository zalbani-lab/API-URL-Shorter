import { Storage } from './data/Storage.js'

export const redirect = (req, res) => {
  const code = req.params.code

  Storage.data.links.forEach((linkObject) => {
    if (linkObject.code === code) {
      res.redirect(linkObject.url)
    }
  })

  res.status(404).send('URL not found')
}
