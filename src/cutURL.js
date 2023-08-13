import { Storage } from './data/Storage.js'

export const cutURL = (req, res) => {
  const urlRegex = /^(https?:\/\/)?[\d\w]+\.[\w]+(\/.*)*/

  if (req.body.url === undefined || !urlRegex.test(req.body.url))
    return res.status(400).send('Bad request')

  const code = 'xxxxx'.replace(/x/g, () =>
    Math.floor(Math.random() * 16).toString(16)
  )

  console.log('Generated code : '.code)

  Storage.data.links.push({
    url: req.body.url,
    code: code,
  })
  Storage.write()

  res.status(200).send({
    code: code,
  })
}
