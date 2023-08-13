import { Storage } from './data/Storage.js'

export const cutURL = (req, res) => {
  const urlRegex = /^(https?:\/\/)?[\d\w]+\.[\w]+(\/.*)*/

  const urlToShort = req.body.url

  if (urlToShort === undefined || !urlRegex.test(urlToShort))
    return res.status(400).send('Bad request')

  const code = generateRandomCode()

  console.log('Generated code : ' + code)

  saveCodeAndUrl(urlToShort, code)

  res.status(200).send({
    code: code,
  })
}

function generateRandomCode() {
  return 'xxxxx'.replace(/x/g, () =>
    Math.floor(Math.random() * 16).toString(16)
  )
}

function saveCodeAndUrl(url, code) {
  Storage.data.links.push({
    url,
    code,
  })
  Storage.write()
}
