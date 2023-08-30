import { Request, Response } from 'express'
import { Storage } from './data/Storage.js'
import { Link } from './types/Link.js'

export const shortURL = (req: Request, res: Response) => {
  const urlRegex =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

  const urlToShort = req.body.url

  if (urlToShort === undefined || !urlRegex.test(urlToShort))
    return res.status(400).send('Bad request')

  const alreadyExistingLink = Storage.data.links.find(
    (link: Link) => link.url === urlToShort
  )
  if (alreadyExistingLink !== undefined)
    successResponse(res, alreadyExistingLink.code)

  const code = generateCode()

  console.log('Generated code : ' + code)

  saveCodeAndUrl(urlToShort, code)

  successResponse(res, code)
}

function successResponse(res: Response, code: string): void {
  res.status(200).send({
    code: code,
  })
}

function generateCode(): string {
  let code: string
  do {
    code = generateRandomString(5)
  } while (isCodeAlreadyExist(code))

  return code
}

function isCodeAlreadyExist(code: string): boolean {
  const link = Storage.data.links.find((link: Link) => link.code === code)
  return link !== undefined
}

function generateRandomString(codeLength: number): string {
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

function saveCodeAndUrl(url: string, code: string): void {
  const link: Link = {
    url,
    code,
  }

  Storage.data.links.push(link)
  Storage.write()
}
