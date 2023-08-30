import fs from 'fs'

export const Storage = {
  data: JSON.parse(fs.readFileSync('storage.json', 'utf8')),

  write: () =>
    fs.existsSync('storage.json')
      ? fs.writeFileSync('storage.json', JSON.stringify(Storage.data, null, 2))
      : fs.appendFileSync(
          'storage.json',
          JSON.stringify(Storage.data, null, 2)
        ),
}
