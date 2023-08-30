import { Request, Response } from 'express'
import { Storage } from './data/Storage.js'
import { Link } from './types/Link.js'

export const redirect = (req: Request, res: Response) => {
  const code = req.params.code

  const record = Storage.data.links.find((link: Link) => link.code === code)

  if (record === undefined) res.status(404).send('URL not found')

  res.redirect(record.url)
}
