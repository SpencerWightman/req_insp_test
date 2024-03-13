import { generateKey } from '../utils/generateKey.js'
import { connectToPg } from '../pg.js';

export const createBin = async (request, response) => {
  const binPath = generateKey(15)
  console.log(`#### GENERATED ${binPath}`)
  const pg = connectToPg()
  await pg.connect()
  console.log('### Postgres CONNECTED 112');
  await pg.query('INSERT INTO bin (bin_path) values ($1)', [binPath])
    .then(() => pg.end())
  console.log(binPath, ' NEW BIN');
  response['bpath'] = binPath;
  console.log(response.bpath)
  response.send(binPath);
}
