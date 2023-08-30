import { Storage } from './data/Storage.js'

export const shortURL = (req, res) => {
  const urlRegex =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

  const urlToShort = req.body.url

  if (urlToShort === undefined || !urlRegex.test(urlToShort))
    return res.status(400).send('Bad request')

  const alreadyExistingRecord = Storage.data.links.find(
    (record) => record.url === urlToShort
  )
  if (alreadyExistingRecord !== undefined)
    successResponse(res, alreadyExistingRecord.code)

  const code = generateCode()

  console.log('Generated code : ' + code)

  saveCodeAndUrl(urlToShort, code)

  successResponse(res, code)
}

function successResponse(res, code) {
  res.status(200).send({
    code: code,
  })
}

function generateCode() {
  let code
  do {
    code = generateRandomString(5)
  } while (isCodeAlreadyExist(code))

  return code
}

function isCodeAlreadyExist(code) {
  const record = Storage.data.links.find((record) => record.code === code)
  return record !== undefined
}

function generateRandomString(codeLength) {
  let result = ''
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let counter = 0
  while (counter < codeLength) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length - 1)
    )
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
