import { Storage } from './data/Storage.js'

export const cutURL = (req, res) => {
  const urlRegex =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

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
  let result = ''
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = 5
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

function saveCodeAndUrl(url, code) {
  Storage.data.links.push({
    url,
    code,
  })
  Storage.write()
}
